# Clickwise — Test and Evidence Log

**Student Investigator:** Mariama Kanu  
**Role:** Project Developer, Tester, and Presenter  
**Audit Period:** Lab Phase (Days 6–7)  
**Overall Status:** Tests Structured — Awaiting Student Lab Execution  

*Notice: All AWS cloud checks and final browser screenshots remain marked **[PENDING - Awaiting Student Evidence]** until the student executes the runbook commands in their designated AWS environment.*

---

## 1. Cloud Infrastructure & Security Access Verification

| Test ID | Target Service | Procedure / Command | Expected Result | Actual Result | Status | Execution Date | Evidence Artifact (Screenshot / Log) |
|---|---|---|---|---|---|---|---|
| **AWS-01** | CloudFront Edge Delivery | `curl.exe -I "https://<CLOUDFRONT_DOMAIN>/index.html"` | `HTTP/2 200 OK`, `server: CloudFront`, page renders in browser with valid TLS certificate lock. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/aws-01-https-curl.png` |
| **AWS-02** | HTTP to HTTPS Redirection | `curl.exe -I "http://<CLOUDFRONT_DOMAIN>/index.html"` | `HTTP/1.1 301 Moved Permanently`, `Location: https://<CLOUDFRONT_DOMAIN>/index.html`. First redirect response captured. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/aws-02-http-redirect-curl.png` |
| **AWS-03** | Direct S3 Origin Protection | `curl.exe -I "<UNSIGNED_S3_OBJECT_URL>"` | `HTTP/1.1 403 Forbidden`, `x-amz-error-code: AccessDenied`. Direct unsigned access blocked at S3 boundary. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/aws-03-s3-blocked-curl.png` |
| **AWS-04** | Direct S3 Browser Check | Paste `<UNSIGNED_S3_OBJECT_URL>` in a private/incognito browser window. | Browser displays XML Access Denied error: `<Error><Code>AccessDenied</Code></Error>`. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/aws-04-s3-incognito-denied.png` |
| **AWS-05** | Root Default Document | Browse to root `https://<CLOUDFRONT_DOMAIN>/` (without typing `index.html`). | Homepage loads cleanly via CloudFront Default Root Object configuration without 403 error. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/aws-05-root-domain.png` |

---

## 2. Front-End Responsiveness & Reflow Verification

| Test ID | Viewport Width | Testing Goal & Requirement | Expected Behavior | Actual Result | Status | Date | Evidence Artifact |
|---|---|---|---|---|---|---|---|
| **FE-01** | **320 px** (Narrow Mobile) | Reflow & horizontal scroll prevention (WCAG 1.4.10). | Single column stack. Envelope illustration and text fit within 320px with zero horizontal scrollbar. Navigation links wrap cleanly. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/fe-01-viewport-320px.png` |
| **FE-02** | **390 px** (Standard Mobile) | Mobile reading comfort & tap targets. | Typography scale readable. Touch targets (buttons, summary disclosure) meet minimum 44×44px hit area. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/fe-02-viewport-390px.png` |
| **FE-03** | **768 px** (Tablet / Small Screen) | Grid reflow & layout transition. | Topic cards break into a 2-column grid. Navigation expands into a horizontal row. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/fe-03-viewport-768px.png` |
| **FE-04** | **1440 px** (Desktop Widescreen) | Desktop split-hero & balanced cards. | Split-hero layout: narrative text on left, envelope illustration on right. Four topic cards displayed in a single 4-column row. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/fe-04-viewport-1440px.png` |
| **FE-05** | **200% Zoom** at 1280px Desktop | Low-vision zoom testing (WCAG 1.4.4). | All content scales gracefully up to 200% without overlapping text or clipped containers. No loss of functionality. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/fe-05-zoom-200.png` |

---

## 3. Accessibility & Keyboard Navigation Verification

| Test ID | Feature Under Test | Testing Procedure | Expected Behavior | Actual Result | Status | Date | Evidence Artifact |
|---|---|---|---|---|---|---|---|
| **A11Y-01** | Skip Navigation Link | Press `Tab` on first page load before touching mouse. | Visible "Skip to main content" banner appears in high contrast. Pressing `Enter` shifts focus directly to `<main id="main">`. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/a11y-01-skip-link.png` |
| **A11Y-02** | Keyboard Focus Ring | Navigate entire page using only `Tab` and `Shift+Tab`. | Every interactive element (links, buttons, summary disclosure) has an unobstructed, high-contrast 3px focus outline. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/a11y-02-keyboard-focus.png` |
| **A11Y-03** | Clue Inspection Disclosure | Tab to "Inspect this example" summary, press `Space` or `Enter`. | The `<details>` opens cleanly; the arrow indicator rotates 90°; the clue breakdown displays below without page jump. Pressing `Space` again closes it. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/a11y-03-clues-disclosure.png` |
| **A11Y-04** | Reduced Motion Mode | Enable "Reduce motion" in OS/browser, reload page. | The envelope does NOT animate upward; it renders immediately at rest. Card hover transitions and disclosure transitions are instantaneous. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/a11y-04-reduced-motion.png` |
| **A11Y-05** | Color Contrast (WCAG 1.4.3) | Sample colors with browser DevTools contrast checker. | Body text (`#242130` on `#FAF9F6`) achieves 13.5:1 (passes AAA). Accent plum (`#634397` on `#FAF9F6`) achieves 5.7:1 (passes AA). | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/a11y-05-contrast-audit.png` |
| **A11Y-06** | Color Independence | Inspect error clues and scenario results. | Every alert or flag uses an icon or descriptive text label (e.g., "[Suspicious Link]", "[Urgent Deadline]") in addition to red/plum accents. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` | `screenshots/a11y-06-color-independence.png` |

---

## 4. Practice Lab & Multi-Page Journey Verification

| Test ID | Page / Scenario | User Action | Expected Feedback & Consequence | Actual Result | Status | Date |
|---|---|---|---|---|---|---|
| **PR-01** | Phishing Guide (`phishing.html`) | Select "Practice this topic" link. | Smoothly navigates to `practice.html#scenario-1` (Tuition email scenario). | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` |
| **PR-02** | Scenario 1 Choice A | Select "Click payment link in email". | Immediate warning feedback explains that the URL points to a lookalike domain and harvesting page. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` |
| **PR-03** | Scenario 1 Choice B | Select "Open student portal from saved bookmark". | Immediate positive feedback confirms this is safe, verifiable habit. Option to try other choice remains available. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` |
| **PR-04** | Scenario 2: Passwords | Test both choices on dorm Wi-Fi password reuse. | Immediate explanatory feedback detailing credential stuffing attacks and password manager benefits. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` |
| **PR-05** | Scenario 3: MFA | Test unexpected push approval scenario. | Explains push fatigue and why denying unprompted requests prevents account takeover. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` |
| **PR-06** | Scenario 4: Browsing | Test fake bookstore domain vs browser padlock. | Clarifies that padlock only indicates encryption in transit, not vendor authenticity. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` |
| **PR-07** | Sources Page (`sources.html`) | Follow outbound external links to FTC, NIST, CISA. | Links contain descriptive text, open in new tab with `rel="noopener noreferrer"`, and label campus examples as fictional. | *Awaiting student run* | `PENDING` | `[YYYY-MM-DD]` |

---

## 5. Defect, Diagnosis, and Resolution Log

Use this section to record any real issues encountered during development, the diagnostic steps taken, the code or configuration fix, and the retest result.

### Defect Entry 1: [Issue Title / Short Description]
- **Date Discovered:** `[YYYY-MM-DD]`
- **Found During Test ID:** `[e.g., FE-01 or AWS-01]`
- **Symptom & Reproduction Steps:**
  `[Describe what happened: e.g., "When viewing the simulated email at 320px width, the example address overflowed the container horizontally..."]`
- **Root Cause Diagnosis:**
  `[Explain why the bug occurred: e.g., "The email header used a preformatted string without CSS word-break or overflow-wrap rules..."]`
- **Corrective Action & File Modified:**
  `[Specify the exact file, element, and CSS/HTML change applied: e.g., "Added overflow-wrap: break-word and max-width: 100% to .email-meta in style.css..."]`
- **Retest Result & Verification Evidence:**
  `[Document retest confirmation: e.g., "Re-tested in Chrome DevTools at 320px and 200% zoom. The address wrapped cleanly to a second line. Captured screenshot-defect-1-resolved.png."]`
- **Final Status:** `[RESOLVED / PENDING]`
