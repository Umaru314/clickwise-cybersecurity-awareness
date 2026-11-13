# Clickwise: Cybersecurity Awareness Website on AWS
## Final Presentation & Demonstration Script (10–15 Minutes)

**Presenter:** Mariama Kanu  
**Role:** Project Developer, Tester, and Presenter  
**Total Target Duration:** 12 Minutes (Presentation + Live Terminal Demonstration + Q&A)  
**Required Tools:** PowerPoint/Slides, Windows PowerShell terminal, Web Browser (Google Chrome / Edge in normal and incognito modes).

---

## Slide 1: Title & Project Overview
- **Visuals on Slide:**
  - Project Title: **Clickwise: Accessible Cybersecurity Awareness on AWS**
  - Subtitle: *Demonstrating Secure Cloud Delivery with Amazon S3 and CloudFront Origin Access Control*
  - Presenter: Mariama Kanu
  - Visual: Screenshot of the Clickwise homepage hero with the ivory/plum field guide theme.
- **Speaker Notes (1:00 min):**
  > "Hello everyone, and welcome. My name is Mariama Kanu, and today I am excited to present my project: **Clickwise**, a cybersecurity awareness website deployed securely on Amazon Web Services. 
  > 
  > In today's academic environment, students are bombarded with emails about tuition, financial aid, and class schedules. Too often, scammers take advantage of that urgency with deceptive links and fake login portals. My goal for Clickwise was twofold: first, to build an approachable, highly accessible educational field guide that teaches students how to think critically before clicking; and second, to demonstrate modern cloud engineering by hosting the site on private AWS cloud storage delivered globally and securely over HTTPS through Amazon CloudFront."

---

## Slide 2: The Problem & The Learner Experience
- **Visuals on Slide:**
  - Headline: *Why Students? Why a Field Guide Approach?*
  - Three Pain Points:
    1. **Urgency Fatigue:** "Your mailbox closes in 2 hours" triggers panic rather than inspection.
    2. **Technical Jargon Overload:** Complex terms alienate beginner users who just want to study safely.
    3. **Abstract Advice:** Telling students "don't click bad links" doesn't teach them what clues to look for.
  - Callout: *Clickwise Design Philosophy: Plain language, realistic campus scenarios, and immediate interactive practice.*
- **Speaker Notes (1:30 min):**
  > "When we look at student cyber incidents, the root cause is rarely a sophisticated zero-day exploit. It's almost always a convincing email that creates false panic—like telling a student their account will be closed before exams if they don't click a link immediately.
  > 
  > Instead of intimidating students with dark hacker aesthetics and impenetrable jargon, Clickwise adopts the feel of a student field guide. We use a warm, readable ivory and plum palette, clear typography, and four bite-sized topics: Spotting Phishing, Strong Passwords and Managers, Multi-Factor Authentication, and Safe Browsing."

---

## Slide 3: Interactive Walkthrough: Inspecting the Campus Email
- **Visuals on Slide:**
  - Image: Simulated email component showing the envelope illustration and the subject: *"Urgent: Your campus mailbox will be deactivated today."*
  - Callouts pointing to the 3 hidden clues:
    - Clue 1: Lookalike sender domain (`@it-support-portal.net` instead of official university domain).
    - Clue 2: Artificial urgency and deadline pressure.
    - Clue 3: Inert link pointing to an unverified external destination.
  - Accessibility Badge: *100% Keyboard Accessible `<details>/<summary>` element.*
- **Speaker Notes (1:30 min):**
  > "Right on the homepage, students are presented with a relatable scenario: a simulated campus email warning that their mailbox will close today. 
  > 
  > Rather than just reading passive text, the learner can select 'Inspect this example.' Using native, keyboard-accessible HTML disclosure controls, the card expands to reveal three specific red flags. Students learn how to look past the official-looking logo, inspect the actual sender address, and recognize that legitimate campus IT departments never demand instant password entry under threat of immediate account deletion."

---

## Slide 4: Cloud Architecture: Private S3 + CloudFront with OAC
- **Visuals on Slide:**
  - Request Flow Diagram showing:
    1. Viewer connects via HTTPS to Amazon CloudFront edge.
    2. CloudFront signs request using AWS Signature Version 4 (SigV4) via Origin Access Control (OAC).
    3. Amazon S3 verifies signature and bucket policy scoped to the distribution ARN.
    4. Blocked Route: Red X showing public direct requests to S3 hitting a 403 Forbidden wall.
- **Speaker Notes (2:00 min):**
  > "Now let's examine the cloud architecture powering this site. When building static sites, a common mistake is enabling S3 Static Website Hosting and making the entire bucket publicly readable. That approach exposes your storage objects directly to the internet and bypasses edge security.
  > 
  > For Clickwise, I implemented the AWS-recommended best practice:
  > - First, the Amazon S3 bucket has **Block All Public Access** completely enabled. Static website hosting is disabled.
  > - Second, content is fronted by **Amazon CloudFront**, which acts as our Content Delivery Network and SSL/TLS termination point.
  > - Third, CloudFront communicates with S3 using **Origin Access Control (OAC)**. When CloudFront needs an object, it signs the request using AWS Signature Version 4.
  > - Finally, an explicit S3 bucket policy grants `s3:GetObject` solely to the CloudFront service principal, strictly restricted to my specific CloudFront distribution ARN via the `AWS:SourceArn` condition."

---

## Slide 5: Live Demonstration Cue: The Two Access Paths
- **Visuals on Slide:**
  - Terminal Command Reference:
    - Command 1: `curl.exe -I "https://<CLOUDFRONT_DOMAIN>/index.html"` → `HTTP/2 200 OK`
    - Command 2: `curl.exe -I "http://<CLOUDFRONT_DOMAIN>/index.html"` → `HTTP/1.1 301 Moved Permanently`
    - Command 3: `curl.exe -I "<UNSIGNED_S3_OBJECT_URL>"` → `HTTP/1.1 403 Forbidden`
- **Speaker Notes (2:30 min - Live Demonstration):**
  > *"Now I will transition to my live terminal to demonstrate the three core verification checks."*
  > 
  > [DEMO STEP 1: Execute HTTPS check]
  > *"First, let's curl our CloudFront domain over HTTPS. As you can see, we immediately receive an `HTTP/2 200 OK` response. CloudFront validates our TLS certificate and delivers our rendered page."*
  > 
  > [DEMO STEP 2: Execute HTTP redirect check]
  > *"Second, what happens if a visitor attempts to connect over unencrypted HTTP? When I run curl against the HTTP address, we receive an `HTTP/1.1 301 Moved Permanently` with a Location header redirecting straight to the secure HTTPS URL. The edge enforces encryption before any data is transferred."*
  > 
  > [DEMO STEP 3: Execute Direct S3 check]
  > *"Third, what happens if an unauthorized user or malicious actor attempts to bypass CloudFront and request the file directly from our underlying S3 bucket URL? When I curl the raw S3 object endpoint, we get an immediate `HTTP/1.1 403 Forbidden` with an AccessDenied header. Even if we paste that URL into a private browser tab, Amazon S3 refuses to serve the file. The origin is completely shielded."*

---

## Slide 6: Front-End Quality & Accessibility Verification
- **Visuals on Slide:**
  - Grid of Test Evidence:
    - Mobile reflow at **320px** without horizontal scrolling (WCAG 1.4.10).
    - 200% browser zoom verification.
    - High-contrast color audit: Body text contrast ratio of **13.5:1** (exceeds AAA).
    - Keyboard focus rings and `prefers-reduced-motion` compliance.
- **Speaker Notes (1:30 min):**
  > "Front-end accessibility was a primary design requirement throughout this project. 
  > 
  > Clickwise is tested against WCAG 2.2 AA standards:
  > - At 320 pixels wide—the width of a small smartphone—the entire layout reflows into a clean single column with zero horizontal scrolling.
  > - Text contrast was measured rigorously: our ink-to-ivory contrast is 13.5:1, nearly double the WCAG AAA threshold of 7:1.
  > - For users with vestibular motion sensitivities, we implemented `prefers-reduced-motion`. When enabled, all decorative animations—including the envelope lift—are suppressed immediately."

---

## Slide 7: Challenges, Costs & Resource Teardown
- **Visuals on Slide:**
  - Key Challenge: Configuring the CloudFront Default Root Object to eliminate 403 root errors.
  - Cost Summary Table:
    - S3 Storage: < 2 MB used → **$0.00**
    - CloudFront Data Transfer: < 10 MB used → **$0.00**
    - Total Project Incurred Spend: **$0.00**
  - Teardown Checklist: Disabling distribution, deleting distribution, emptying S3 bucket.
- **Speaker Notes (1:30 min):**
  > "Every cloud project teaches practical troubleshooting lessons. One challenge I encountered early on was that visiting the bare CloudFront domain returned an Access Denied error, even though `index.html` worked fine when explicitly typed. Diagnosing this revealed that CloudFront requires an explicit 'Default Root Object' setting so that requests to the root slash map internally to `index.html`.
  > 
  > In terms of project finances, Clickwise was engineered to operate entirely within the AWS Free Tier. S3 storage and CloudFront bandwidth remained well within the free allowances, resulting in a total cost of zero dollars. Furthermore, as documented in my runbook, all resources will be completely torn down following presentation grading to prevent any orphaned cloud spend."

---

## Slide 8: Conclusion, Acknowledgments & Q&A
- **Visuals on Slide:**
  - Key Takeaway: *Security in depth combines accessible user education with rigorous cloud permissions.*
  - Reference Links: FTC, CISA, NIST, AWS Documentation.
  - Text: *Thank you! Questions and Discussion.*
- **Speaker Notes (1:00 min):**
  > "In conclusion, Clickwise proves that cybersecurity education and cloud security engineering go hand-in-hand. By empowering students with clear, accessible knowledge, and by backing that content with modern AWS access controls, we can build a safer digital community.
  > 
  > Thank you for your time, and I would now be happy to answer any questions."
