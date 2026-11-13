# Clickwise — Contributions, Authorship & AI Collaboration Log

**Project Title:** Cybersecurity Awareness Website on AWS  
**Confirmed Code Author:** `[CONFIRMED CODE AUTHOR]` (Mariama Kanu)  
**Role:** Project Developer, Tester, and Presenter  
**Team Structure:** Solo Project by Mariama Kanu (as proposed in Project Proposal)  

---

## 1. Primary Authorship Statement

> *"I wrote the website’s HTML and CSS. During coding, I used AI to help debug [specific issue] and understand [specific concept]. All final implementation decisions, testing routines, cloud configurations, and presentation remarks were verified and performed by me."*  
> — **Mariama Kanu**, Project Developer

---

## 2. Project Roles & Responsibility Allocation

| Member Name | Documented Role | Concrete Contributions & Tasks | Verification Status |
|---|---|---|---|
| **Mariama Kanu** | Project Developer, Tester & Presenter | • Researched cybersecurity guidance (FTC, NIST, CISA).<br>• Wrote and maintained all HTML and CSS source code.<br>• Designed the field guide visual aesthetic and typography.<br>• Configured AWS S3 bucket, Block Public Access, and CloudFront OAC.<br>• Executed local accessibility testing and cloud curl commands.<br>• Prepared final report, presentation slides, and delivered demonstration. | Primary Author & Lead |
| *[Teammate 2]* | *N/A (Solo proposal)* | *If additional team members are assigned by instructor, record their specific research, testing, or presentation tasks here.* | *Approved Solo Project* |
| *[Teammate 3]* | *N/A (Solo proposal)* | *If additional team members are assigned by instructor, record their specific research, testing, or presentation tasks here.* | *Approved Solo Project* |

---

## 3. Log of AI Assistance (Categorized by Domain)

In accordance with academic integrity guidelines, AI assistance is logged separately between **Website Code Support** and **Documentation / Technical Editing Support**.

### Category A: Website Code & Front-End Implementation Support
*Note: The website HTML and CSS were authored by Mariama Kanu. AI was consulted as a review and accessibility diagnostic partner.*

| Date | Interaction Type | Specific Problem / Concept Investigated | Prompt / Query Summary | Nature of AI Advice Provided | Student Verification & Final Code Decision |
|---|---|---|---|---|---|
| `[Date]` | Technical Concept | Understanding CSS `reflow` at 320px | How to prevent horizontal scroll on preformatted email headers at 320px | Explained `overflow-wrap: break-word` and max-width constraints. | Student wrote the CSS rule in `website/style.css` and verified at 320px. |
| `[Date]` | Accessibility Review | Keyboard disclosure behavior for clues | How `<details>` and `<summary>` interact with screen readers and focus states | Advised using native semantic elements over custom JavaScript tabs. | Student adopted `<details>` and `<summary>` in `website/index.html`. |
| `[Date]` | CSS Animation | Reduced motion compliance | How to suppress CSS transitions when `prefers-reduced-motion` is active | Provided `@media (prefers-reduced-motion: reduce)` pattern. | Student incorporated media query into `style.css` and tested in browser. |

---

### Category B: Documentation & Technical Editing Support
*Note: AI was used to format markdown templates, verify AWS policy schemas against current AWS documentation, and organize presentation timing.*

| Date | Document / Deliverable | Assistance Provided by AI Assistant | Student Direction & Review |
|---|---|---|---|
| 2026-11-10 | `docs/AWS-Runbook.md` | Formatted S3 bucket policy JSON schema with OAC `AWS:SourceArn` condition; structured curl verification commands. | Directed the assistant to follow AWS CloudFront OAC documentation [1] and include Windows PowerShell syntax. |
| 2026-11-10 | `docs/Design-and-Architecture.md` | Generated ASCII request flow diagram and organized WCAG contrast tables based on student's color palette. | Confirmed color tokens (`#FAF9F6`, `#242130`, `#634397`) and field guide theme. |
| 2026-11-10 | `docs/Test-and-Evidence-Log.md` | Created structured markdown table with status tags initialized to Pending. | Verified that all tests reflect student's proposal criteria and require actual lab execution. |
| 2026-11-10 | `docs/Presentation.md` | Structured 12-minute slide-by-slide timing script and live-demo transition cues. | Verified speech notes match student's own voice and proposal commitments. |
| 2026-11-10 | `docs/Final-Report.md` | Assembled academic report framework mapping proposal criteria to evidence logs. | Reviewed and validated against class project grading rubric. |

---

## 4. Third-Party Assets, Libraries & Licenses

Clickwise is built with zero runtime JavaScript libraries or external CSS frameworks to ensure rapid, build-free loading from Amazon S3 and CloudFront.

| Asset / Component | Source / Origin | License | Attribution & Usage Notes |
|---|---|---|---|
| **Inter Font Family** | Rasmus Andersson / Google Fonts | SIL Open Font License 1.1 | Included via system-fallback font stack or Google Fonts CDN. |
| **Icons & Illustrations** | Custom SVG / Local assets | Original work / Public Domain | Native inline SVGs created for envelope, padlock, and warning indicators. |
| **Educational Advice** | FTC, CISA, NIST | Public Domain (U.S. Federal Government Works) | Adapted into student-friendly language with citations on `sources.html`. |
