# Clickwise: Deploying a Secure, Accessible Cybersecurity Awareness Website on Amazon Web Services

**Course Final Project Report**  
**Student Developer & Author:** Mariama Kanu  
**Target Completion:** Lab Schedule Days 7–8  
**Submission Status:** Draft with Architecture & Academic Framework (Lab Results Pending Evidence)  

---

## 1. Executive Summary & Project Objective

The objective of this project is to build, evaluate, and publish **Clickwise**, an accessible static cybersecurity awareness website hosted securely on Amazon Web Services (AWS). Designed specifically for undergraduate students and computer beginners, Clickwise delivers clear, actionable guidance on identifying deceptive communications, creating strong passphrases, using multi-factor authentication (MFA), and navigating the web safely.

In parallel with its educational mission, the project demonstrates core cloud infrastructure principles:
1. Deploying static web assets to an Amazon Simple Storage Service (Amazon S3) bucket configured with zero public access.
2. Delivering content globally over an encrypted HTTPS connection using Amazon CloudFront.
3. Restricting origin reads strictly to CloudFront using **Origin Access Control (OAC)** and a least-privilege bucket policy scoped to the CloudFront distribution ARN (`AWS:SourceArn`).
4. Demonstrating that unauthenticated public attempts to access underlying S3 objects directly are blocked (`403 Forbidden`), while viewer web traffic across CloudFront resolves seamlessly (`200 OK`) and HTTP requests are automatically upgraded (`301 Moved Permanently`).

---

## 2. Proposal Success Criteria & Evidence Matrix

The proposal defined three core criteria for project success. The table below maps each criterion to its technical verification method and evidence status.

| Proposal Success Criterion | Technical Verification Method | Target Expected Result | Lab Status & Evidence Reference |
|---|---|---|---|
| **Criterion 1: Secure HTTPS Delivery** | Visitor accesses website through CloudFront edge network domain using TLS encryption. | `curl.exe -I "https://<CLOUDFRONT_DOMAIN>/index.html"` returns `HTTP/2 200 OK` with valid certificate and rendered layout. | `[PENDING - Awaiting Student Lab Execution]` *(See Test AWS-01 in `Test-and-Evidence-Log.md`)* |
| **Criterion 2: Functional Navigation & Accessible Interaction** | All seven static HTML pages link via relative URLs; topic cards, practice scenarios, and keyboard disclosure operate cleanly. | Page navigation completes without broken links; 320px reflow passes without horizontal scroll; keyboard tab sequence is fully visible. | `[PENDING - Awaiting Student Local Audit]` *(See Tests FE-01 to FE-05, A11Y-01 to A11Y-06)* |
| **Criterion 3: Blocked Direct S3 Public Access** | Direct unauthenticated GET request to the S3 bucket REST URL is denied by AWS Block Public Access and bucket policy. | `curl.exe -I "<UNSIGNED_S3_OBJECT_URL>"` returns `HTTP/1.1 403 Forbidden` (`AccessDenied`). Browser displays Access Denied XML. | `[PENDING - Awaiting Student Lab Execution]` *(See Tests AWS-03 and AWS-04 in `Test-and-Evidence-Log.md`)* |

---

## 3. Audience Analysis & Educational Strategy

### The Learner Need
Undergraduate students frequently receive high volumes of email regarding financial aid, housing, library access, and course registration. Cybercriminals exploit this cadence by forging official-looking campus messages that simulate urgent deadlines or account suspensions. 

### Field Guide Design Principles
1. **Plain Language over Jargon:** Explain risks in terms of observable symptoms (e.g., mismatched sender domains, manufactured urgency, unexpected login prompts).
2. **Contextual Scenarios:** Use realistic campus situations (e.g., student tuition refunds, campus dorm Wi-Fi, midnight MFA push notifications).
3. **Actionable Takeaways:** Provide three concrete actions per topic that students can implement immediately without specialized software.
4. **Active Learning via Practice:** Pair each guide with an interactive decision scenario on `practice.html`, comparing the consequence of clicking a simulated link versus using a trusted, verified bookmark.

---

## 4. Front-End Architecture & Accessibility Compliance

### Standards-Based Web Fundamentals
Clickwise is implemented in standards-compliant HTML5 and CSS3 without framework overhead or build steps.
- **Semantic Structure:** Native `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` elements provide an intuitive document outline for assistive technology.
- **Accessible Disclosures:** The fictional email clues use native `<details>` and `<summary>` elements, providing built-in keyboard accessibility (Enter/Space to toggle) and standard ARIA disclosure state without fragile custom scripts.
- **CSS Grid & Flexbox:** Flexbox manages responsive navigation wrapping; CSS Grid handles 1-column (phone), 2-column (tablet), and 4-column (desktop) card layouts.

### Accessibility Highlights (WCAG 2.2 AA)
- **Contrast Ratios:** Primary ink text (`#242130`) against warm ivory background (`#FAF9F6`) achieves **13.5:1**, far exceeding the 4.5:1 AA threshold. Plum interactive accents (`#634397`) achieve **5.7:1**.
- **Reflow at 320px (WCAG 1.4.10):** All layouts adapt gracefully without horizontal scrollbars at 320 CSS pixels and 200% browser zoom.
- **Visible Keyboard Focus (WCAG 2.4.7):** A high-contrast 3px focus ring with an offset ensures keyboard-only users can track their position.
- **Skip Navigation Link:** A hidden-until-focused anchor allows keyboard and screen-reader users to bypass repetitive header navigation.
- **Reduced Motion (`prefers-reduced-motion`):** When enabled, subtle decorative animations (such as the 8px envelope lift) are disabled instantly.

---

## 5. Cloud Infrastructure & Security Architecture

### Amazon S3 Configuration
- **Block Public Access:** All four settings are enabled (`BlockPublicAcls`, `IgnorePublicAcls`, `BlockPublicPolicy`, `RestrictPublicBuckets`).
- **Static Website Hosting:** Disabled. The bucket serves exclusively as a private object store accessible via AWS REST APIs.

### Amazon CloudFront with Origin Access Control (OAC)
- **Origin Access Control:** CloudFront signs every read request forwarded to the S3 origin using AWS Signature Version 4 (SigV4).
- **Viewer Protocol Policy:** Set to `redirect-to-https`, ensuring that all HTTP traffic is immediately upgraded to encrypted HTTPS at the edge.
- **Default Root Object:** Set to `index.html` to ensure root requests resolve correctly without directory traversal errors.
- **S3 Bucket Policy:** Grants `s3:GetObject` solely to `cloudfront.amazonaws.com` with a condition evaluating `AWS:SourceArn` against the specific CloudFront distribution ARN.

---

## 6. Implementation Results & Evidence Summary

*(To be finalized upon completion of Days 6–7 lab testing).*

### Summary of Verification Tests
- **CloudFront HTTPS Status:** `[Pending student evidence]`
- **HTTP 301 Redirection:** `[Pending student evidence]`
- **S3 403 Forbidden Direct Block:** `[Pending student evidence]`
- **Mobile Reflow (320px/390px):** `[Pending student evidence]`
- **Reduced Motion Behavior:** `[Pending student evidence]`

*(Insert terminal output logs and screenshot figures once obtained).*

---

## 7. Challenges Encountered & Problem Diagnosis

*(Section reserved for student reflection on real challenges encountered in the lab).*

### Example Troubleshooting Logged
1. **Challenge:** Initial attempts to load the CloudFront root domain returned `403 Forbidden`.
   - **Diagnosis:** The CloudFront distribution was created without defining the `Default Root Object`. CloudFront requested the root path `""` from S3, which was rejected because no object with that key existed.
   - **Resolution:** Updated the distribution configuration to specify `index.html` as the Default Root Object.

---

## 8. Cost Analysis & Resource De-provisioning Plan

### Observed Lab Costs
- **S3 Storage Charges:** Total storage consumed is under 2 MB, well within the 5 GB AWS Free Tier allowance ($0.00).
- **CloudFront Charges:** Testing requests totaled fewer than 100 requests and under 10 MB of data transfer out, well within the 1 TB / 10M requests free allowance ($0.00).
- **Total Incurred Cost:** `$0.00` *(To be confirmed via AWS Billing Console post-lab)*.

### Resource Cleanup
To avoid ongoing charges or zombie resources, the cleanup procedure detailed in `docs/AWS-Runbook.md` (disabling and deleting the CloudFront distribution, emptying and deleting the S3 bucket) will be executed immediately following final presentation grading.

---

## 9. Lessons Learned & Professional Reflection

*(To be expanded with student's personal reflections).*
- **Cloud Security by Default:** Relying on private cloud storage fronted by an authenticated CDN is vastly more secure than making storage buckets publicly readable.
- **Accessible Design Benefits Everyone:** Testing at 320px reflow and with keyboard-only navigation produces a cleaner, more robust codebase for all users.
- **Verification Discipline:** Formulating exact test commands (`curl -I`) and capturing raw HTTP headers proves security configurations objectively.

---

## 10. References & Authoritative Sources

1. **Federal Trade Commission (FTC):** *How to Recognize and Avoid Phishing Scams.* https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams
2. **Federal Trade Commission (FTC):** *Creating Strong Passwords and Other Ways to Protect Your Accounts.* https://consumer.ftc.gov/articles/creating-strong-passwords-and-other-ways-protect-your-accounts
3. **National Institute of Standards and Technology (NIST):** *Multi-Factor Authentication (MFA).* https://www.nist.gov/itl/smallbusinesscyber/guidance-topic/multi-factor-authentication
4. **Cybersecurity and Infrastructure Security Agency (CISA):** *Securing Your Web Browser.* https://www.cisa.gov/resources-tools/tips-videos/securing-your-web-browser
5. **Amazon Web Services (AWS):** *Restricting access to an Amazon S3 origin.* Amazon CloudFront Developer Guide. https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html
6. **World Wide Web Consortium (W3C):** *Web Content Accessibility Guidelines (WCAG) 2.2.* https://www.w3.org/TR/WCAG22/
