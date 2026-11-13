# Clickwise | AI app-builder prompt

Act as a senior front-end engineer, accessibility reviewer, AWS instructor, and technical editor. Help me deliver my submitted class project, **Cybersecurity Awareness Website on AWS**. The site is called **Clickwise**. It teaches students and beginning computer users how to make safer online decisions. The cloud demonstration must show how visitors can read a page over HTTPS while the underlying S3 object stays private.

## How we will work

I intend to be the sole author of the website code. Use review or discussion mode for implementation. I write the HTML, CSS, and any fixes. Preview the files I supply, reproduce bugs, identify the relevant file and element, explain the cause, and give me a way to verify my correction. When source is missing, give me a small implementation task with acceptance criteria. Keep automatic code generation and auto-apply turned off. Treat the earlier Clickwise preview and ZIP as design references. Identify the origin of any reused code or assets before attributing them.

Generate the documentation files and presentation structure described below. Assemble submission prose, speaker notes, and captions from my own words and verified evidence. Track any AI help with documentation separately from help with coding. Use `[CONFIRMED CODE AUTHOR]` until I confirm the name. Record teammates’ actual research, testing, or presentation roles separately. The class handout specifies two or three members unless the instructor approves another arrangement.

## Pages and learning experience

Use seven real HTML pages with relative links, one shared stylesheet, and local assets. Prefer CSS Grid for the topic cards and Flexbox for navigation. The site must open from `website/index.html` on Windows and work from a CloudFront URL without a build step. Keep the experience anonymous and static, with no database, data-collection forms, analytics, or payments.

| Page | What the visitor should be able to do |
|---|---|
| `index.html` | See the headline “Think before you click.” Inspect a fictional campus email, then choose a guide or enter the practice lab. |
| `phishing.html` | Examine a sender address, a deadline, and a request to sign in. Reveal the clues and identify an independent way to contact campus IT. |
| `passwords.html` | Work through a password-reuse scenario and learn how a password manager can create a unique password for each account. |
| `mfa.html` | Understand a second sign-in factor and decide what to do when an approval request arrives for a login the student did not start. |
| `browsing.html` | Compare two fictional hostnames, explain what HTTPS protects, and respond to a browser warning. |
| `practice.html` | Try four campus scenarios, one per topic. Each offers two plausible choices, immediate explanatory feedback, and a way to try the other choice. |
| `sources.html` | Follow descriptive links to the original guidance. Identify the organization and topic, and label the campus examples as fictional. |

Each guide should contain a plain-language explanation, one realistic example, three practical actions, and a link to its matching scenario. Use reserved example domains for simulated messages. Keep simulated sign-in links inert. For the tuition-email exercise, let the learner compare following the message’s payment link with opening the school portal from a trusted bookmark. Explain the consequence of each choice. Check security advice against authoritative sources such as the FTC, CISA, and NIST.

## Responsive design and motion

Give Clickwise the character of a student field guide. Use a warm ivory background (#FAF9F6), dark ink (#242130), and plum accents (#634397). Pair a readable sans serif such as Inter with a restrained italic serif for “you click.” Make the featured illustration an envelope containing a fictional “Your mailbox closes today” message. The “Inspect this example” link should lead directly to the clues. Keep AWS instructions in the project documentation so the homepage serves the learner.

On a phone, stack the headline, illustration, and topic cards. On a tablet, use two card columns. On a wide screen, use a split hero and four cards in one row. Let the navigation wrap at narrow widths. Check 320, 390, 768, and 1440 CSS pixels and 200% zoom. Long headings and example addresses must remain readable without horizontal scrolling.

Use motion to explain a change. Let the envelope rise once, about 8 px over 280 ms. Give a focused or hovered topic card a visible border change. When a learner opens a native `details`/`summary` control, rotate its indicator over roughly 150 ms and reveal the answer immediately. With `prefers-reduced-motion` enabled, show the final states immediately. Support keyboard and touch, visible focus, a skip link, descriptive headings, and feedback that makes sense without color. Measure text contrast against the actual backgrounds. Target at least 4.5:1 for normal text and 3:1 for large text.

## AWS deployment and proof

Prepare a runbook I can follow in my authorized AWS lab. Check permissions, the selected pricing plan, credits, and budget alerts first. Upload the contents of website/ to a regular private S3 bucket with index.html at the root. Keep Block Public Access enabled and static website hosting disabled. Use the bucket’s REST origin, a CloudFront-provided domain, Origin Access Control (OAC) with requests always signed, and a bucket policy granting `cloudfront.amazonaws.com` only `s3:GetObject` on this bucket’s objects, scoped to this distribution via `AWS:SourceArn`. Set the default root object to `index.html` and redirect viewer HTTP to HTTPS. Explain how CloudFront can serve a cached page and how it signs a request to S3 when it needs the original.

Demonstrate the same known, uploaded index.html in all three checks. Include these Windows PowerShell commands in the runbook. Replace the placeholders with my real lab values when running them.

| Check | Command | Expected evidence |
|---|---|---|
| HTTPS delivery | `curl.exe -I "https://<CLOUDFRONT_DOMAIN>/index.html"` | 200 OK, plus the rendered page in a browser. |
| HTTP redirect | `curl.exe -I "http://<CLOUDFRONT_DOMAIN>/index.html"` | 301 with an HTTPS Location header. Capture the first response. |
| Direct origin access | `curl.exe -I "<UNSIGNED_S3_OBJECT_URL>"` | 403. Open the same plain object URL in a private window to capture Access Denied. |

Mark these as expected results until the lab produces evidence. Record actual outputs, dates, and screenshot filenames. Check navigation, direct links to inner pages, all eight practice choices, phone layout, keyboard focus, and reduced motion. Explain how to diagnose a CloudFront 403, a direct S3 request that unexpectedly succeeds, and a stale cached page. Keep credentials, signed URLs, and identifying account details out of screenshots and deliverables.

## Files to deliver

Generate editable files, and export the report and slides when the builder supports those formats. When my source is ready, package it into `Clickwise_AWS_Upload.zip` with `index.html`, the other pages, and `assets/` at the archive root. Keep coursework and evidence in a separate folder. Provide the working local preview and editable handoff files.

| Deliverable | Required contents |
|---|---|
| `README.md` | Purpose, audience, file map, Windows/VS Code preview steps, how to edit a guide, and how to package the site for S3. |
| `docs/Design-and-Architecture.md` | Page relationships, responsive and motion decisions, and a labeled request-flow diagram showing visitor, CloudFront, signed origin request, private S3, and the blocked direct route. |
| `docs/AWS-Runbook.md` | Deployment instructions, annotated read-only policy example with placeholders, the three verification commands, troubleshooting, cost observations, and cleanup after grading. |
| `docs/Test-and-Evidence-Log.md` | Test, expected result, actual result, status, date, and screenshot. Leave unrun tests marked Pending. Include a place for a real issue, its diagnosis, my fix, and the retest. |
| `docs/Final-Report.md` | Assemble my objective, architecture, implementation steps, results, challenges, costs, contributions, lessons learned, and references. Map each proposal success criterion to evidence. Export to DOCX or PDF if supported. |
| `docs/Presentation.md` | Prepare a roughly 12-minute walkthrough with slide titles, visuals, speaker notes, and live-demo cues. Cover the problem, one learner scenario, architecture, the two access paths, test results, one lesson, costs, and contributions. Export to PowerPoint if supported. |
| `docs/Contributions-and-AI-Use.md` | Record who wrote the code, external asset licenses, actual debugging or concept questions, and any document assistance. Only include a sole-code-author statement when the final source supports it. |
| `docs/Draft-1-Abstract.md` | If Draft 1 is still outstanding, assemble one brief paragraph from my notes covering the project, problem, technologies, and expected benefit. |

A contribution statement I may use, if accurate, is “I wrote the website’s HTML and CSS. During coding, I used AI to help debug [specific issue] and understand [specific concept].” Record any design, writing, or document-formatting assistance in its own entry.

Use “Awaiting student evidence” wherever a result, charge, screenshot, or personal reflection is missing. Keep sample results clearly labeled. Follow the proposal’s ten-working-day sequence. Reserve days 1–2 for scope and lab access, days 3–4 for the front end, days 5–6 for AWS, day 7 for testing, day 8 for reporting, and days 9–10 for the presentation.

## Start here

First return the page map, a short file checklist, and the first task I should implement. Start with the homepage’s fictional email and one keyboard-accessible “Inspect this example” interaction. Give me a test I can run at 320 px and with reduced motion enabled. If I have already supplied my own source files, inspect them first and identify the smallest change needed to make that interaction work. At handoff, list what was verified locally, what was verified on AWS, and what still needs evidence.

## Official references

- [Recognizing phishing (FTC)](https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams)
- [Password and account protection (FTC)](https://consumer.ftc.gov/articles/creating-strong-passwords-and-other-ways-protect-your-accounts)
- [Multifactor authentication (NIST)](https://www.nist.gov/itl/smallbusinesscyber/guidance-topic/multi-factor-authentication)
- [Checking a site’s connection (Google Chrome Help)](https://support.google.com/chrome/answer/95617)
- [Restrict access to an Amazon S3 origin (AWS)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
- [Require HTTPS for CloudFront viewers (AWS)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html)
- [Reflow (W3C)](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [Animation from Interactions (W3C)](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [Contrast (Minimum) (W3C)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

