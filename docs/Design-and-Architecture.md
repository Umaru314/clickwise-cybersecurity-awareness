# Clickwise — Design and Architecture Specification

**Author:** Mariama Kanu  
**Project:** Cybersecurity Awareness Website on AWS  
**Document Status:** Complete Architecture & Design Specification  

---

## 1. Information Architecture & Page Relationships

Clickwise consists of seven static HTML pages connected by relative hyperlinks. The architecture follows a hub-and-spoke model centered on the home field guide (`index.html`), with immediate paths to the four core topic guides, a hands-on decision lab, and an authoritative sources page.

```
                    ┌──────────────────────────────┐
                    │      website/index.html      │
                    │   "Think before you click"   │
                    │  (Hero & Campus Email Clues) │
                    └──────────────┬───────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  phishing.html   │      │  passwords.html  │      │     mfa.html     │
│  - Sender clues  │      │  - Passphrases   │      │  - Second factor │
│  - Urgent claims │      │  - Reuse dangers │      │  - Push fatigue  │
│  - IT reporting  │      │  - Password mgrs │      │  - Backup codes  │
└────────┬─────────┘      └────────┬─────────┘      └────────┬─────────┘
         │                         │                         │
         │                         │                         │
         │                         ▼                         │
         │                ┌──────────────────┐               │
         │                │  browsing.html   │               │
         │                │  - Fake domains  │               │
         │                │  - HTTPS limits  │               │
         │                │  - SSL warnings  │               │
         │                └────────┬─────────┘               │
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
┌──────────────────────────────┐            ┌──────────────────────────────┐
│     website/practice.html    │            │     website/sources.html     │
│   Campus Decision Scenarios  │            │    Authoritative Citations   │
│   (4 interactive scenarios)  │            │     (FTC, CISA, NIST, W3C)   │
└──────────────────────────────┘            └──────────────────────────────┘
```

### Page Summary & Learner Actions

| File | Page Title | Primary Learner Goal | Matching Practice Challenge |
|---|---|---|---|
| `index.html` | Home: Think Before You Click | Inspect a realistic campus phishing email, review four field topics, navigate to guides. | Gateway to all guides |
| `phishing.html` | Spotting Phishing Scams | Learn to decode deceptive sender names, inspect hover destinations, spot artificial urgency. | Scenario 1: Tuition Payment Notice |
| `passwords.html` | Strong Passwords & Managers | Understand credential stuffing from password reuse; learn how password managers generate unique keys. | Scenario 2: Dorm Wi-Fi vs. Portal Password |
| `mfa.html` | Multi-Factor Authentication | Understand the role of authenticators and what to do when receiving an unexpected login push notification. | Scenario 3: Midnight Phone Approval Prompt |
| `browsing.html` | Safe Browsing & HTTPS | Understand that HTTPS encrypts transit but does not guarantee the honesty of the website author. | Scenario 4: Lookalike Campus Bookstore URL |
| `practice.html` | Interactive Practice Lab | Test knowledge on four realistic campus situations with immediate explanatory feedback. | Retest & alternate choice paths |
| `sources.html` | Official References & Notes | Verify citations from FTC, NIST, CISA, and AWS, with clear notice that campus names are fictional. | Reference index |

---

## 2. Visual Design & Responsive System

### Design Concept: "The Student Field Guide"
Clickwise avoids the cliché "hacker-in-a-hoodie" aesthetic (glowing neon greens on black backgrounds) in favor of an approachable, authoritative field guide. The tone is encouraging, clear, and grounded in everyday student routines.

### Color Tokens & Accessibility

| Token Name | Hex Value | Role | Minimum Contrast Ratio | WCAG Compliance |
|---|---|---|---|---|
| `--color-bg` | `#FAF9F6` | Page background (warm ivory) | N/A | Base Canvas |
| `--color-ink` | `#242130` | Primary text and headings (dark ink) | **13.5:1** against `#FAF9F6` | Exceeds AAA (7:1) |
| `--color-ink-muted` | `#534F63` | Secondary text, captions, metadata | **6.4:1** against `#FAF9F6` | Exceeds AA (4.5:1) |
| `--color-plum` | `#634397` | Primary accent, interactive buttons, links | **5.7:1** against `#FAF9F6` | Exceeds AA (4.5:1) |
| `--color-plum-hover` | `#4B2F77` | Hover & focus states for plum elements | **8.2:1** against `#FAF9F6` | Exceeds AAA (7:1) |
| `--color-surface` | `#FFFFFF` | Card & simulated email container | N/A | High-contrast card base |
| `--color-surface-subtle` | `#F1EFE9` | Code blocks, callouts, clue panels | **12.4:1** against `#242130` | Base for dark ink |
| `--color-danger-border` | `#B91C1C` | Visual clue callout border (red flag) | **4.6:1** against `#FAF9F6` | Exceeds AA (3:1) for graphics |
| `--color-danger-bg` | `#FEF2F2` | Background for suspicious clue callout | N/A | Non-text container |
| `--color-focus-ring` | `#242130` | Visible focus outline (3px solid + offset) | **3:1** minimum against neighbors | WCAG 2.4.7 / 2.4.11 |

### Typography Hierarchy
- **Body & Controls:** Inter, `-apple-system`, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif (clean, highly legible sans-serif with tall x-height).
- **Featured Headline Accent:** Restrained italic serif (e.g., 'Newsreader', 'Georgia', or 'Times New Roman' italic) applied specifically to *"you click"* in the hero headline:
  ```html
  <h1 class="hero-title">Think before <em>you click</em>.</h1>
  ```
- **Type Scale:**
  - `h1`: `2.25rem` (36px) mobile / `3.25rem` (52px) desktop, line-height 1.15
  - `h2`: `1.5rem` (24px) mobile / `2.0rem` (32px) desktop, line-height 1.25
  - `h3`: `1.2rem` (19.2px), line-height 1.3
  - Body: `1.0rem` (16px), line-height 1.6
  - Small / metadata: `0.875rem` (14px), line-height 1.5

### Responsive Breakpoints & Viewport Behavior

| Viewport | Target Device | Layout Strategy |
|---|---|---|
| **320px** | Small phones (e.g., iPhone SE 1st gen, narrow windows) | Single-column linear stack. Navigation links wrap naturally with ample touch spacing (min 44×44px tap targets). No horizontal scrollbar at 320px or 200% zoom. |
| **390px** | Modern standard smartphones | Single-column stack. Envelope illustration sits beneath headline text; hero action button is full-width. |
| **768px** | Tablets & small laptops | Two-column grid for topic cards. Navigation displays horizontally in a flex row. |
| **1440px** | Desktop monitors | Split hero (55% narrative & call to action / 45% interactive envelope illustration). Four topic cards displayed in a balanced 4-column single row. |

---

## 3. Motion & Micro-Interactions

Clickwise uses motion strictly to communicate state changes, never for distraction.

1. **Envelope Illustration Entrance:**
   - On page load, the simulated envelope rises once by **8px** over **280ms** with a gentle ease-out curve (`cubic-bezier(0.16, 1, 0.3, 1)`), drawing the user's eye to the example.
2. **Interactive Clue Disclosure (`details` / `summary`):**
   - When the student triggers "Inspect this example" (`<details><summary>`), the chevron marker smoothly rotates 90 degrees over **150ms** (`transition: transform 150ms ease`).
   - The clue contents reveal instantly without delayed animation, keeping reading immediate.
3. **Topic Card Hover & Focus:**
   - Hovering or tabbing to a card applies a visible 2px border color shift to `--color-plum` and a slight 2px vertical lift over 180ms.
4. **Reduced Motion Accessibility (`prefers-reduced-motion`):**
   - When `prefers-reduced-motion: reduce` is active in the operating system or browser, all transforms, transitions, and hover lifts are disabled (`animation: none !important; transition: none !important;`). The envelope rests in its final position immediately.

---

## 4. Cloud Architecture & Request Flow

Clickwise is deployed on Amazon Web Services using a secure, zero-public-access S3 origin model fronted by Amazon CloudFront with Origin Access Control (OAC).

### Request Flow Diagram

```text
                                [ VISITOR BROWSER ]
                                         │
                    ┌────────────────────┴────────────────────┐
                    │                                         │
                    ▼                                         ▼
            [ Legitimate Route ]                      [ Blocked Direct Route ]
         https://d123456.cloudfront.net             http://my-bucket.s3.amazonaws.com
                    │                                         │
                    │                                         │
                    ▼                                         ▼
        ┌───────────────────────┐                 ┌───────────────────────┐
        │   Amazon CloudFront   │                 │     Amazon S3 REST    │
        │      Edge Network     │                 │        Endpoint       │
        └───────────┬───────────┘                 └───────────┬───────────┘
                    │                                         │
             Viewer Protocol Policy:                          │ Direct public access
             Redirect HTTP -> HTTPS                           │ attempted without SigV4
                    │                                         │
          Cache hit?│                                         ▼
         ┌──────────┴──────────┐                      [ S3 Block Public Access ]
        YES                    NO                             +
         │                      │                     [ Bucket Policy Check ]
         ▼                      ▼                             │
    Serve from            CloudFront signs                    ▼
    Edge Cache            request with SigV4           403 FORBIDDEN
    (200 OK)              using OAC Credential        (ACCESS DENIED)
                                │                             │
                                ▼                             ▼
                    ┌───────────────────────┐       [ Attacker / Public ]
                    │   Amazon S3 Bucket    │          Blocked at S3!
                    │ (Block Public Access) │
                    └───────────┬───────────┘
                                │
                    Bucket Policy validates:
                    - Principal: cloudfront.amazonaws.com
                    - Action: s3:GetObject
                    - Condition: AWS:SourceArn matches Distribution ARN
                                │
                                ▼
                       200 OK to CloudFront
                     (Cached for future users)
```

### Key Security Controls
1. **S3 Block Public Access:** All 4 settings enabled. The S3 bucket has zero public endpoints and cannot be read anonymously through S3 URLs.
2. **Origin Access Control (OAC):** CloudFront automatically generates AWS Signature Version 4 (SigV4) headers on requests forwarded to S3.
3. **Scoping via `AWS:SourceArn`:** The S3 bucket policy ensures that *only* the specific CloudFront distribution ARN created for this project can retrieve objects, preventing cross-distribution or cross-account access.
4. **Enforced HTTPS:** Viewer Protocol Policy is configured to `redirect-to-https`. Plain HTTP requests receive an immediate `301 Moved Permanently` redirect to the secure TLS endpoint.
