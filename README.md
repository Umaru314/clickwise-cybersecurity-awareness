# Clickwise — Cybersecurity Awareness Website on AWS

A lightweight, accessible cybersecurity field guide designed for students and beginner computer users, backed by a secure AWS cloud infrastructure (Amazon S3 + Amazon CloudFront with Origin Access Control).

- **Project Developer & Presenter:** Mariama Kanu  
- **Code Author:** `[CONFIRMED CODE AUTHOR]` (Mariama Kanu)  
- **Architecture:** Static HTML5/CSS3 hosted on private AWS S3, delivered globally via AWS CloudFront with Origin Access Control (OAC), HTTPS redirection, and S3 Block Public Access enabled.


---

## 1. Project Purpose & Audience

### Purpose
Clickwise demonstrates how cloud storage, content delivery, and access controls work together to safely deliver educational material online. It teaches learners how to recognize common social engineering threats (such as phishing emails and urgent credential harvesting) and how to adopt strong security hygiene (password managers, multi-factor authentication, safe browsing) without jargon or intimidation.

### Audience
Undergraduate students, high school students, and beginner computer users who need practical, immediate guidance on daily digital safety.

---

## 2. Repository File Map

```text
├── README.md                           # This guide: overview, testing, and packaging
├── index.html                          # Root app entry point (Vite preview & workbench)
├── website/                            # Production website root (uploaded to S3)
│   ├── index.html                      # Homepage: "Think before you click" & campus email hero
│   ├── phishing.html                   # Phishing guide: sender clues, urgent deadlines, IT reporting
│   ├── passwords.html                  # Password guide: reuse risks, passphrases, password managers
│   ├── mfa.html                        # Multi-Factor Authentication: second factors & push fatigue
│   ├── browsing.html                   # Safe browsing: fake hostnames, HTTPS limits, browser warnings
│   ├── practice.html                   # Interactive Practice Lab: 4 realistic campus decision scenarios
│   ├── sources.html                    # Authoritative citations (FTC, CISA, NIST) & fictional disclaimers
│   ├── style.css                       # Single shared stylesheet (CSS Grid, Flexbox, accessible themes)
│   └── assets/                         # Local icons, illustrations, and media
│       └── images/
├── docs/                               # Coursework submission & deployment documentation
│   ├── AWS-Runbook.md                  # Complete step-by-step AWS provisioning and verification
│   ├── Design-and-Architecture.md      # Information architecture, color tokens, and request flow
│   ├── Test-and-Evidence-Log.md        # Comprehensive test matrix (status pending student lab runs)
│   ├── Final-Report.md                 # Complete formal academic project report
│   ├── Presentation.md                 # 12-minute slide-by-slide script with live demo cues
│   ├── Contributions-and-AI-Use.md     # Attribution log, code authorship, and AI assistance records
│   └── Draft-1-Abstract.md             # One-paragraph class project abstract
└── src/                                # Local preview workbench & verification tooling
```
   
---

## 3. Local Preview & Development Steps

### Prerequisites
- A modern web browser (Google Chrome, Mozilla Firefox, or Microsoft Edge).
- Visual Studio Code (VS Code) or any plain text editor.
- Optional: Python 3 (`python -m http.server 8000`) or the VS Code "Live Server" extension.

### Running with the Local Development Server
1. In the project root, start the local development server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:3000` in your web browser.
3. The interactive workbench allows you to:
   - Preview the `website/` files directly.
   - Toggle viewports: **320px** (small mobile), **390px** (standard mobile), **768px** (tablet), and **1440px** (desktop).
   - Test accessibility toggles such as `prefers-reduced-motion` and keyboard navigation tab stops.
   - Browse the complete project documentation and runbook.

### Direct File Preview (No Build Step Required)
Clickwise is engineered to work without any bundler or build step:
- On Windows: Navigate to the `website/` folder and double-click `index.html`. It will open in your default browser using relative file paths (`./style.css`, `./phishing.html`, etc.).

---

## 4. How to Edit a Guide Page

Each of the topic guide pages (`phishing.html`, `passwords.html`, `mfa.html`, `browsing.html`) follows a consistent four-part pedagogical structure:
1. **Plain-Language Explanation:** A 2–3 sentence overview of the risk without technical jargon.
2. **Realistic Example:** A relatable campus situation (e.g., student financial aid notification, library Wi-Fi prompt). All domains must use reserved example domains (e.g., `example.edu`, `example.com`).
3. **Three Practical Actions:** Clear, concrete steps the student can take immediately.
4. **Practice Lab Bridge:** A direct hyperlink to the corresponding challenge on `practice.html`.

### Editorial Guidelines
- **No data collection:** Do not include input forms that collect student information or credentials.
- **Inert simulated links:** Any simulated phishing links must use `href="#clues"` or `href="javascript:void(0)"` with clear instructional annotations; never link to live external threat domains.
- **Color independence:** Ensure warning messages, hints, and correct/incorrect feedback are distinguishable by iconography or text labels, not color alone (WCAG 1.4.1).

---

## 5. Packaging the Site for AWS S3 Deployment 

When the website source files are finalized and validated locally, package them for upload into Amazon S3:

1. Confirm all seven HTML files, `style.css`, and the `assets/` folder are located directly inside `website/`.
2. Do **not** include the parent directory or the `docs/` folder in the root of the ZIP.
3. Create the deployment ZIP archive named `Clickwise_AWS_Upload.zip`:
   - On Windows (PowerShell):
     ```powershell
     Compress-Archive -Path website\* -DestinationPath Clickwise_AWS_Upload.zip -Force
     ```
4. Verify the archive root structure:
   ```text
   Clickwise_AWS_Upload.zip
   ├── index.html
   ├── phishing.html
   ├── passwords.html
   ├── mfa.html
   ├── browsing.html
   ├── practice.html
   ├── sources.html
   ├── style.css
   └── assets/
   ```
5. Follow the deployment procedures in [`docs/AWS-Runbook.md`](docs/AWS-Runbook.md) to upload and configure the private S3 bucket and CloudFront distribution.
