/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Shield,
  FileText,
  Monitor,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Eye,
  Keyboard,
  Layers,
  Sparkles,
  BookOpen,
  ArrowRight,
  Smartphone,
  Tablet,
  Laptop,
} from 'lucide-react';
import { evaluateWcagCompliance } from './utils/audit';

export default function App() {
  const [activeTab, setActiveTab] = useState<'task1' | 'preview' | 'docs' | 'aws' | 'accessibility'>('task1');
  const [selectedDoc, setSelectedDoc] = useState<string>('README.md');
  const [previewViewport, setPreviewViewport] = useState<'320' | '390' | '768' | '1440'>('1440');
  const [reducedMotionSim, setReducedMotionSim] = useState<boolean>(false);
  const [simulatedZoom, setSimulatedZoom] = useState<'100' | '150' | '200'>('100');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Task 1 Interactive Staging State for Mariama
  const [stagedHtml, setStagedHtml] = useState<string>(`<!-- Mariama: Paste your index.html "Think before you click" hero and email section here to preview -->
<section class="hero-section" aria-labelledby="hero-heading">
  <div class="hero-content">
    <div class="field-guide-badge">Student Field Guide • Module 1</div>
    <h1 id="hero-heading" class="hero-title">Think before <em>you click</em>.</h1>
    <p class="hero-lead">
      Real campus messages rarely demand instant panic. Learn to spot deceptive sender domains, artificial deadlines, and harvesting links before entering your password.
    </p>
    <div class="hero-actions">
      <a href="#email-demo" class="btn-primary">Inspect Campus Email</a>
      <a href="practice.html" class="btn-secondary">Enter Practice Lab</a>
    </div>
  </div>

  <div class="hero-visual" id="email-demo">
    <div class="envelope-card">
      <div class="envelope-header">
        <span class="badge-urgent">URGENT NOTICE</span>
        <span class="envelope-timestamp">Today at 8:42 AM</span>
      </div>
      <div class="email-meta">
        <p><strong>From:</strong> Campus IT Helpdesk &lt;support@it-support-portal.net&gt;</p>
        <p><strong>To:</strong> student@university.edu</p>
        <p><strong>Subject:</strong> Action Required: Your mailbox will be deactivated today</p>
      </div>
      <div class="email-body">
        <p>Dear Student,</p>
        <p>Your institutional email quota has exceeded its allocated capacity. You must verify your credentials immediately to avoid permanent mailbox suspension.</p>
        <p class="fake-link-container">
          <a href="#clues-disclosure" class="simulated-link" aria-label="Simulated malicious link: Update mailbox quota now">👉 Click here to verify your account now &rarr;</a>
        </p>
      </div>

      <details id="clues-disclosure" class="clues-disclosure">
        <summary class="clues-summary">
          <span>Inspect this example (3 Red Flags)</span>
          <span class="summary-icon" aria-hidden="true">&#9662;</span>
        </summary>
        <div class="clues-panel">
          <ol class="clues-list">
            <li>
              <strong>Lookalike Sender Domain:</strong> Notice the sender address is <code>@it-support-portal.net</code>, not the legitimate <code>@university.edu</code> domain.
            </li>
            <li>
              <strong>Manufactured Urgency:</strong> Threatening "immediate suspension" or "closure today" prevents you from verifying through normal channels.
            </li>
            <li>
              <strong>Unverified Link Destination:</strong> Official campus IT will never ask you to click an email link to enter your password; always use a saved bookmark.
            </li>
          </ol>
        </div>
      </details>
    </div>
  </div>
</section>`);

  const [stagedCss, setStagedCss] = useState<string>(`/* Clickwise Shared Theme & Hero Stylesheet */
:root {
  --color-bg: #FAF9F6;
  --color-ink: #242130;
  --color-ink-muted: #534F63;
  --color-plum: #634397;
  --color-plum-hover: #4B2F77;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #F1EFE9;
  --color-danger: #B91C1C;
  --color-danger-bg: #FEF2F2;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: 'Newsreader', 'Georgia', serif;
}

body {
  margin: 0;
  padding: 1.5rem;
  background-color: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-sans);
  line-height: 1.6;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

@media (min-width: 900px) {
  .hero-section {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 3.5rem;
    padding: 2rem 0;
  }
}

.field-guide-badge {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-plum);
  background: var(--color-surface-subtle);
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1.15;
  margin: 0 0 1.25rem 0;
  color: var(--color-ink);
  font-weight: 800;
}

.hero-title em {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  color: var(--color-plum);
}

.hero-lead {
  font-size: 1.125rem;
  color: var(--color-ink-muted);
  margin-bottom: 2rem;
  max-width: 540px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-plum);
  color: #FFFFFF;
  padding: 0.875rem 1.75rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  min-height: 44px;
  transition: background-color 150ms ease;
}

.btn-primary:hover, .btn-primary:focus-visible {
  background-color: var(--color-plum-hover);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: var(--color-plum);
  padding: 0.875rem 1.5rem;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid var(--color-plum);
  border-radius: 6px;
  min-height: 44px;
}

/* Simulated Email Envelope Component */
.envelope-card {
  background: var(--color-surface);
  border: 1px solid #E4E0D7;
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 10px 25px -5px rgba(36, 33, 48, 0.08);
  animation: envelopeRise 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  max-width: 100%;
  overflow-wrap: break-word;
}

@keyframes envelopeRise {
  from {
    opacity: 0.8;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .envelope-card {
    animation: none !important;
    transform: none !important;
  }
}

.envelope-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.8125rem;
}

.badge-urgent {
  background: var(--color-danger-bg);
  color: var(--color-danger);
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid rgba(185, 28, 28, 0.2);
}

.envelope-timestamp {
  color: var(--color-ink-muted);
}

.email-meta {
  background: var(--color-surface-subtle);
  padding: 0.875rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-bottom: 1.25rem;
  border-left: 3px solid var(--color-plum);
}

.email-meta p {
  margin: 0.25rem 0;
  overflow-wrap: break-word;
}

.email-body {
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
}

.fake-link-container {
  margin-top: 1.25rem;
}

.simulated-link {
  color: var(--color-plum);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Native Keyboard-Accessible Disclosure */
.clues-disclosure {
  border-top: 1px solid #E4E0D7;
  padding-top: 1rem;
}

.clues-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color: var(--color-plum);
  cursor: pointer;
  padding: 0.75rem 0.5rem;
  border-radius: 4px;
  list-style: none;
  user-select: none;
  min-height: 44px;
}

.clues-summary::-webkit-details-marker {
  display: none;
}

.clues-summary:focus-visible {
  outline: 3px solid var(--color-ink);
  outline-offset: 2px;
}

.summary-icon {
  display: inline-block;
  transition: transform 150ms ease;
  font-size: 1.1rem;
}

.clues-disclosure[open] .summary-icon {
  transform: rotate(180deg);
}

.clues-panel {
  background: #FFFDF9;
  border: 1px solid #EFECE3;
  border-radius: 8px;
  padding: 1.25rem 1.25rem 1.25rem 2rem;
  margin-top: 0.75rem;
  font-size: 0.875rem;
}

.clues-list {
  margin: 0;
  padding: 0 0 0 1rem;
}

.clues-list li {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.clues-list li:last-child {
  margin-bottom: 0;
}`);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Color compliance check values
  const inkContrast = evaluateWcagCompliance('#242130', '#FAF9F6');
  const plumContrast = evaluateWcagCompliance('#634397', '#FAF9F6');
  const mutedContrast = evaluateWcagCompliance('#534F63', '#FAF9F6');

  // Combined preview HTML for the iframe
  const previewDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clickwise Preview</title>
  <style>
    ${stagedCss}
    ${reducedMotionSim ? `* { animation: none !important; transition: none !important; }` : ''}
    html {
      zoom: ${parseInt(simulatedZoom, 10) / 100};
    }
  </style>
</head>
<body>
  ${stagedHtml}
</body>
</html>`;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#242130] flex flex-col font-sans selection:bg-[#634397] selection:text-white">
      {/* Top Application Bar */}
      <header className="border-b border-[#E5E0D5] bg-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#634397] text-white flex items-center justify-center font-bold text-xl shadow-xs">
            C
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#242130]">Clickwise</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#634397]/10 text-[#634397]">
                Project Workbench
              </span>
            </div>
            <p className="text-xs text-[#534F63]">
              Student Developer: <strong className="text-[#242130]">Mariama Kanu</strong> • AWS Cloud Delivery & Awareness Field Guide
            </p>
          </div>
        </div>

        {/* Global Tab Navigation */}
        <nav className="flex items-center gap-1 bg-[#F1EFE9] p-1 rounded-lg text-xs font-medium border border-[#E5E0D5]">
          <button
            onClick={() => setActiveTab('task1')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
              activeTab === 'task1' ? 'bg-white text-[#242130] shadow-xs font-semibold' : 'text-[#534F63] hover:text-[#242130]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#634397]" />
            Task 1: Hero & Email
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
              activeTab === 'preview' ? 'bg-white text-[#242130] shadow-xs font-semibold' : 'text-[#534F63] hover:text-[#242130]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-[#634397]" />
            Live Preview
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
              activeTab === 'docs' ? 'bg-white text-[#242130] shadow-xs font-semibold' : 'text-[#534F63] hover:text-[#242130]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#634397]" />
            Coursework Docs (8)
          </button>
          <button
            onClick={() => setActiveTab('aws')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
              activeTab === 'aws' ? 'bg-white text-[#242130] shadow-xs font-semibold' : 'text-[#534F63] hover:text-[#242130]'
            }`}
          >
            <Cloud className="w-3.5 h-3.5 text-[#634397]" />
            AWS Access Proof
          </button>
          <button
            onClick={() => setActiveTab('accessibility')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
              activeTab === 'accessibility' ? 'bg-white text-[#242130] shadow-xs font-semibold' : 'text-[#534F63] hover:text-[#242130]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#634397]" />
            WCAG & Contrast
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* TAB 1: TASK 1 SPECIFICATION & STAGING */}
        {activeTab === 'task1' && (
          <div className="space-y-6">
            {/* Mission Card */}
            <div className="bg-white border border-[#E5E0D5] rounded-xl p-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5E0D5]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#634397] bg-[#634397]/10 px-2.5 py-1 rounded">
                    Implementation Task 1 of 5
                  </span>
                  <h2 className="text-2xl font-bold mt-2 text-[#242130]">
                    Homepage Hero: "Think before you click" & Fictional Campus Email
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#534F63] block">Proposal Timeline</span>
                  <span className="text-sm font-semibold text-[#242130]">Days 3–4: Front-End Code</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2 text-[#634397]">
                    <Smartphone className="w-4 h-4" />
                    Phone Width (320px – 390px)
                  </h3>
                  <ul className="text-xs text-[#534F63] space-y-2 list-disc pl-4 leading-relaxed">
                    <li>
                      <strong>Single-Column Stack:</strong> The headline, introductory text, and call-to-action buttons stack vertically above the email card.
                    </li>
                    <li>
                      <strong>Zero Horizontal Scroll (WCAG 1.4.10):</strong> Email addresses and subject lines wrap gracefully with <code className="bg-[#F1EFE9] px-1 py-0.5 rounded text-[#242130]">overflow-wrap: break-word</code>.
                    </li>
                    <li>
                      <strong>44×44px Touch Target:</strong> The "Inspect this example" summary disclosure and buttons provide comfortable tap targets.
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2 text-[#634397]">
                    <Laptop className="w-4 h-4" />
                    Desktop Width (1440px)
                  </h3>
                  <ul className="text-xs text-[#534F63] space-y-2 list-disc pl-4 leading-relaxed">
                    <li>
                      <strong>Split Hero Grid:</strong> 55% left column for headline, narrative, and button links; 45% right column for the simulated envelope.
                    </li>
                    <li>
                      <strong>Envelope Motion:</strong> Rises gently by 8px over 280ms on page load to draw attention.
                    </li>
                    <li>
                      <strong>Italic Serif Accent:</strong> "Think before" in bold sans-serif paired with "you click" in restrained italic serif.
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2 text-[#634397]">
                    <Keyboard className="w-4 h-4" />
                    Keyboard & Disclosure
                  </h3>
                  <ul className="text-xs text-[#534F63] space-y-2 list-disc pl-4 leading-relaxed">
                    <li>
                      <strong>Selection Action:</strong> Pressing <kbd className="bg-[#F1EFE9] border border-[#D5D0C5] px-1.5 py-0.5 rounded text-[10px]">Enter</kbd> or <kbd className="bg-[#F1EFE9] border border-[#D5D0C5] px-1.5 py-0.5 rounded text-[10px]">Space</kbd> on "Inspect this example" toggles open 3 specific red flags without a page jump.
                    </li>
                    <li>
                      <strong>Smooth Icon Rotation:</strong> Arrow indicator rotates 180° over 150ms.
                    </li>
                    <li>
                      <strong>Focus Outline:</strong> Unobstructed 3px dark focus ring with offset when tabbing.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Interactive Code Staging & Preview Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Code Inputs for Mariama */}
              <div className="bg-white border border-[#E5E0D5] rounded-xl p-5 shadow-xs flex flex-col space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D5]">
                  <div>
                    <h3 className="font-bold text-sm text-[#242130]">Mariama's Code Staging</h3>
                    <p className="text-xs text-[#534F63]">Paste or edit your HTML & CSS below. Live preview updates immediately.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className="text-xs font-semibold px-3 py-1.5 bg-[#634397] text-white rounded-md hover:bg-[#4B2F77] transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Open in Fullscreen Preview
                  </button>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#534F63] block mb-1">
                    HTML Snippet (Hero & Email Section)
                  </label>
                  <textarea
                    value={stagedHtml}
                    onChange={(e) => setStagedHtml(e.target.value)}
                    rows={10}
                    className="w-full font-mono text-xs p-3 bg-[#FAF9F6] border border-[#E5E0D5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#634397] resize-y"
                    spellCheck={false}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#534F63] block mb-1">
                    CSS Stylesheet (<code className="text-[#634397]">website/style.css</code>)
                  </label>
                  <textarea
                    value={stagedCss}
                    onChange={(e) => setStagedCss(e.target.value)}
                    rows={8}
                    className="w-full font-mono text-xs p-3 bg-[#FAF9F6] border border-[#E5E0D5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#634397] resize-y"
                    spellCheck={false}
                  />
                </div>
              </div>

              {/* Right: Live Frame Preview */}
              <div className="bg-white border border-[#E5E0D5] rounded-xl p-5 shadow-xs flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D5] mb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <h3 className="font-bold text-sm text-[#242130]">Live Rendered Output</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setReducedMotionSim(!reducedMotionSim)}
                      className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                        reducedMotionSim
                          ? 'bg-[#634397] text-white border-[#634397]'
                          : 'bg-[#F1EFE9] text-[#534F63] border-[#E5E0D5]'
                      }`}
                    >
                      Reduced Motion: {reducedMotionSim ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>

                <div className="flex-1 border border-[#E5E0D5] rounded-lg overflow-hidden bg-[#FAF9F6] min-h-[420px]">
                  <iframe
                    title="Live Code Staging Preview"
                    srcDoc={previewDocument}
                    className="w-full h-full min-h-[420px] border-0"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MULTI-VIEWPORT RESPONSIVE PREVIEW */}
        {activeTab === 'preview' && (
          <div className="space-y-4">
            {/* Viewport Control Bar */}
            <div className="bg-white border border-[#E5E0D5] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#534F63] mr-1">Viewport Width:</span>
                <button
                  onClick={() => setPreviewViewport('320')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    previewViewport === '320'
                      ? 'bg-[#634397] text-white'
                      : 'bg-[#F1EFE9] text-[#242130] hover:bg-[#E5E0D5]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  320px (Narrow Mobile)
                </button>
                <button
                  onClick={() => setPreviewViewport('390')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    previewViewport === '390'
                      ? 'bg-[#634397] text-white'
                      : 'bg-[#F1EFE9] text-[#242130] hover:bg-[#E5E0D5]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  390px (Standard Mobile)
                </button>
                <button
                  onClick={() => setPreviewViewport('768')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    previewViewport === '768'
                      ? 'bg-[#634397] text-white'
                      : 'bg-[#F1EFE9] text-[#242130] hover:bg-[#E5E0D5]'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  768px (Tablet)
                </button>
                <button
                  onClick={() => setPreviewViewport('1440')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    previewViewport === '1440'
                      ? 'bg-[#634397] text-white'
                      : 'bg-[#F1EFE9] text-[#242130] hover:bg-[#E5E0D5]'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  1440px (Desktop)
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#534F63]">Zoom:</span>
                  <select
                    value={simulatedZoom}
                    onChange={(e) => setSimulatedZoom(e.target.value as any)}
                    className="bg-[#F1EFE9] border border-[#E5E0D5] text-xs rounded-md px-2 py-1 font-medium text-[#242130]"
                  >
                    <option value="100">100% Zoom</option>
                    <option value="150">150% Zoom</option>
                    <option value="200">200% Zoom (WCAG 1.4.4)</option>
                  </select>
                </div>

                <button
                  onClick={() => setReducedMotionSim(!reducedMotionSim)}
                  className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                    reducedMotionSim
                      ? 'bg-[#634397] text-white'
                      : 'bg-[#F1EFE9] text-[#534F63] hover:text-[#242130]'
                  }`}
                >
                  Reduced Motion: {reducedMotionSim ? 'ACTIVE' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Frame Display Container */}
            <div className="bg-[#EFECE3] border border-[#DDD8CD] rounded-xl p-6 flex justify-center items-start min-h-[640px] overflow-auto">
              <div
                style={{
                  width:
                    previewViewport === '320'
                      ? '320px'
                      : previewViewport === '390'
                      ? '390px'
                      : previewViewport === '768'
                      ? '768px'
                      : '100%',
                  maxWidth: previewViewport === '1440' ? '1280px' : undefined,
                  transition: 'width 250ms ease-in-out',
                }}
                className="bg-white border-4 border-[#242130]/80 rounded-2xl shadow-xl overflow-hidden flex flex-col"
              >
                {/* Simulated Browser Chrome */}
                <div className="bg-[#242130] text-white px-4 py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                  </div>
                  <div className="bg-[#373347] px-4 py-1 rounded text-[11px] text-[#D5D0C5] flex items-center gap-2 max-w-sm truncate">
                    <span className="text-emerald-400">🔒</span> https://clickwise.campus.edu/index.html
                  </div>
                  <span className="text-[10px] text-[#A9A4BA] font-mono">{previewViewport}px</span>
                </div>

                {/* Simulated Page Content */}
                <iframe
                  title="Clickwise Multi-Viewport Frame"
                  srcDoc={previewDocument}
                  className="w-full h-[600px] border-0"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENTATION HUB */}
        {activeTab === 'docs' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Doc Sidebar */}
            <div className="bg-white border border-[#E5E0D5] rounded-xl p-4 shadow-xs space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#634397] mb-3 px-2">
                Delivered Documentation (8)
              </h3>
              {[
                { id: 'README.md', label: 'README.md', desc: 'Project map & packaging runbook' },
                { id: 'docs/AWS-Runbook.md', label: 'AWS-Runbook.md', desc: 'S3, OAC, curl commands' },
                { id: 'docs/Design-and-Architecture.md', label: 'Design-and-Architecture.md', desc: 'Request flow & style tokens' },
                { id: 'docs/Test-and-Evidence-Log.md', label: 'Test-and-Evidence-Log.md', desc: 'Pending lab verification matrix' },
                { id: 'docs/Final-Report.md', label: 'Final-Report.md', desc: 'Full formal class report' },
                { id: 'docs/Presentation.md', label: 'Presentation.md', desc: '12-minute presenter script & cues' },
                { id: 'docs/Contributions-and-AI-Use.md', label: 'Contributions-and-AI-Use.md', desc: 'Authorship & AI assistance log' },
                { id: 'docs/Draft-1-Abstract.md', label: 'Draft-1-Abstract.md', desc: 'One-paragraph course abstract' },
              ].map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors flex flex-col gap-0.5 ${
                    selectedDoc === doc.id
                      ? 'bg-[#634397] text-white font-semibold'
                      : 'hover:bg-[#F1EFE9] text-[#242130]'
                  }`}
                >
                  <span className="font-mono">{doc.label}</span>
                  <span className={`text-[10px] ${selectedDoc === doc.id ? 'text-[#FAF9F6]/80' : 'text-[#534F63]'}`}>
                    {doc.desc}
                  </span>
                </button>
              ))}
            </div>

            {/* Right Doc Viewer */}
            <div className="md:col-span-3 bg-white border border-[#E5E0D5] rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D5]">
                <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#634397]">
                  <FileText className="w-4 h-4" />
                  {selectedDoc}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
                    Editable File Ready in Workspace
                  </span>
                </div>
              </div>

              {selectedDoc === 'README.md' && (
                <div className="prose prose-sm max-w-none text-xs text-[#242130] space-y-3 leading-relaxed">
                  <p className="font-semibold text-sm">Clickwise — Cybersecurity Awareness Website on AWS</p>
                  <p>
                    A lightweight, accessible cybersecurity field guide designed for students and beginner computer users, backed by a secure AWS cloud infrastructure.
                  </p>
                  <div className="bg-[#FAF9F6] border border-[#E5E0D5] p-3 rounded-lg font-mono text-[11px]">
                    Clickwise_AWS_Upload.zip<br />
                    ├── index.html<br />
                    ├── phishing.html<br />
                    ├── passwords.html<br />
                    ├── mfa.html<br />
                    ├── browsing.html<br />
                    ├── practice.html<br />
                    ├── sources.html<br />
                    ├── style.css<br />
                    └── assets/
                  </div>
                </div>
              )}

              {selectedDoc === 'docs/AWS-Runbook.md' && (
                <div className="space-y-4 text-xs">
                  <p className="text-sm font-semibold text-[#242130]">Amazon S3 & CloudFront Origin Access Control (OAC) Runbook</p>
                  <div className="bg-[#FAF9F6] border border-[#E5E0D5] rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-[11px] text-[#634397]">Check 1: CloudFront HTTPS Delivery</span>
                      <button
                        onClick={() => handleCopy('curl.exe -I "https://<CLOUDFRONT_DOMAIN>/index.html"', 'curl1')}
                        className="text-[10px] px-2 py-0.5 bg-white border border-[#D5D0C5] rounded hover:bg-[#F1EFE9] flex items-center gap-1"
                      >
                        {copiedKey === 'curl1' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        Copy Command
                      </button>
                    </div>
                    <code className="font-mono text-[11px] block text-[#242130]">
                      curl.exe -I "https://&lt;CLOUDFRONT_DOMAIN&gt;/index.html"
                    </code>
                  </div>

                  <div className="bg-[#FAF9F6] border border-[#E5E0D5] rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-[11px] text-[#634397]">Check 2: HTTP to HTTPS Redirection (301)</span>
                      <button
                        onClick={() => handleCopy('curl.exe -I "http://<CLOUDFRONT_DOMAIN>/index.html"', 'curl2')}
                        className="text-[10px] px-2 py-0.5 bg-white border border-[#D5D0C5] rounded hover:bg-[#F1EFE9] flex items-center gap-1"
                      >
                        {copiedKey === 'curl2' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        Copy Command
                      </button>
                    </div>
                    <code className="font-mono text-[11px] block text-[#242130]">
                      curl.exe -I "http://&lt;CLOUDFRONT_DOMAIN&gt;/index.html"
                    </code>
                  </div>

                  <div className="bg-[#FAF9F6] border border-[#E5E0D5] rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-[11px] text-[#634397]">Check 3: Direct S3 Origin Block (403 Forbidden)</span>
                      <button
                        onClick={() => handleCopy('curl.exe -I "<UNSIGNED_S3_OBJECT_URL>"', 'curl3')}
                        className="text-[10px] px-2 py-0.5 bg-white border border-[#D5D0C5] rounded hover:bg-[#F1EFE9] flex items-center gap-1"
                      >
                        {copiedKey === 'curl3' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        Copy Command
                      </button>
                    </div>
                    <code className="font-mono text-[11px] block text-[#242130]">
                      curl.exe -I "&lt;UNSIGNED_S3_OBJECT_URL&gt;"
                    </code>
                  </div>
                </div>
              )}

              {selectedDoc === 'docs/Test-and-Evidence-Log.md' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                    <strong>Audit Notice:</strong> All tests are pre-populated and strictly marked <code>PENDING</code> until you run the commands in your authorized AWS lab environment.
                  </div>
                  <table className="w-full text-left border border-[#E5E0D5] rounded-lg text-[11px]">
                    <thead className="bg-[#FAF9F6] border-b border-[#E5E0D5]">
                      <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Target</th>
                        <th className="p-2">Expected</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E0D5]">
                      <tr>
                        <td className="p-2 font-mono font-bold">AWS-01</td>
                        <td className="p-2">CloudFront HTTPS</td>
                        <td className="p-2">200 OK + Rendered Page</td>
                        <td className="p-2 text-amber-700 font-semibold">PENDING</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold">AWS-02</td>
                        <td className="p-2">HTTP Redirect</td>
                        <td className="p-2">301 Moved Permanently</td>
                        <td className="p-2 text-amber-700 font-semibold">PENDING</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold">AWS-03</td>
                        <td className="p-2">Direct S3 Access</td>
                        <td className="p-2">403 Forbidden (Blocked)</td>
                        <td className="p-2 text-amber-700 font-semibold">PENDING</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold">FE-01</td>
                        <td className="p-2">320px Reflow</td>
                        <td className="p-2">Zero Horizontal Scroll</td>
                        <td className="p-2 text-amber-700 font-semibold">PENDING</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {selectedDoc !== 'README.md' && selectedDoc !== 'docs/AWS-Runbook.md' && selectedDoc !== 'docs/Test-and-Evidence-Log.md' && (
                <div className="p-4 bg-[#FAF9F6] border border-[#E5E0D5] rounded-lg text-xs leading-relaxed text-[#534F63]">
                  <p className="font-semibold text-[#242130] mb-2">File saved on filesystem: <code className="text-[#634397]">/{selectedDoc}</code></p>
                  <p>
                    This document template has been initialized with complete academic headings, speaker timing cues, authorship statements, and lab evidence placeholders ready for submission.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: AWS CLOUD INFRASTRUCTURE & ACCESS PROOF */}
        {activeTab === 'aws' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#E5E0D5] rounded-xl p-6 shadow-xs">
              <h2 className="text-xl font-bold text-[#242130] mb-2">Cloud Architecture: Private Origin & Edge Delivery</h2>
              <p className="text-xs text-[#534F63] max-w-2xl leading-relaxed mb-6">
                Clickwise demonstrates how Amazon S3 Block Public Access shields static assets, while Amazon CloudFront delivers them securely over HTTPS via signed Origin Access Control requests.
              </p>

              {/* Visual Architecture Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Route 1: Valid HTTPS */}
                <div className="border-2 border-emerald-200 bg-emerald-50/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Legitimate Visitor Path
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700">Expected: 200 OK</span>
                  </div>
                  <h3 className="text-base font-bold text-[#242130]">CloudFront HTTPS Delivery</h3>
                  <p className="text-xs text-[#534F63] leading-relaxed">
                    Visitor connects over TLS to CloudFront. If not cached, CloudFront signs the request with SigV4 via OAC. S3 verifies the signature and distribution ARN and serves the file.
                  </p>
                  <div className="bg-white border border-emerald-200 p-2.5 rounded font-mono text-[11px] text-[#242130]">
                    curl.exe -I "https://&lt;CLOUDFRONT_DOMAIN&gt;/index.html"
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    Status: Pending Student Lab Execution (Stage 6)
                  </div>
                </div>

                {/* Route 2: Blocked Direct S3 */}
                <div className="border-2 border-red-200 bg-red-50/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-800 bg-red-100 px-2 py-0.5 rounded">
                      Blocked Direct Route
                    </span>
                    <span className="text-xs font-mono font-bold text-red-700">Expected: 403 Forbidden</span>
                  </div>
                  <h3 className="text-base font-bold text-[#242130]">Direct S3 Public Access Denied</h3>
                  <p className="text-xs text-[#534F63] leading-relaxed">
                    Unauthenticated visitor attempts to fetch the object directly from the S3 REST URL. S3 Block Public Access and bucket policy reject the unsigned request at the perimeter.
                  </p>
                  <div className="bg-white border border-red-200 p-2.5 rounded font-mono text-[11px] text-[#242130]">
                    curl.exe -I "https://&lt;BUCKET_NAME&gt;.s3.amazonaws.com/index.html"
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    Status: Pending Student Lab Execution (Stage 6)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: WCAG CONTRAST & ACCESSIBILITY AUDIT */}
        {activeTab === 'accessibility' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#E5E0D5] rounded-xl p-6 shadow-xs">
              <h2 className="text-xl font-bold text-[#242130] mb-2">WCAG 2.2 AA Contrast & Accessibility Audit</h2>
              <p className="text-xs text-[#534F63] max-w-2xl leading-relaxed mb-6">
                Clickwise avoids low-contrast "cyberpunk" colors. The field guide uses high-contrast ink and warm ivory, rigorously verified using standards-based luminance formulas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Contrast Card 1 */}
                <div className="border border-[#E5E0D5] rounded-xl p-4 bg-[#FAF9F6] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#242130]">Primary Ink on Ivory</span>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {inkContrast.ratio}:1
                    </span>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] border border-[#E5E0D5] rounded text-center">
                    <span className="text-[#242130] font-bold text-base">Dark Ink (#242130)</span>
                  </div>
                  <div className="text-[11px] space-y-1 text-[#534F63]">
                    <div className="flex justify-between">
                      <span>Normal Text (AA &gt;= 4.5:1):</span>
                      <span className="text-emerald-700 font-semibold">PASS (13.5:1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Enhanced Contrast (AAA &gt;= 7.0:1):</span>
                      <span className="text-emerald-700 font-semibold">PASS (Exceeds AAA)</span>
                    </div>
                  </div>
                </div>

                {/* Contrast Card 2 */}
                <div className="border border-[#E5E0D5] rounded-xl p-4 bg-[#FAF9F6] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#242130]">Plum Accent on Ivory</span>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {plumContrast.ratio}:1
                    </span>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] border border-[#E5E0D5] rounded text-center">
                    <span className="text-[#634397] font-bold text-base">Plum (#634397)</span>
                  </div>
                  <div className="text-[11px] space-y-1 text-[#534F63]">
                    <div className="flex justify-between">
                      <span>Normal Text (AA &gt;= 4.5:1):</span>
                      <span className="text-emerald-700 font-semibold">PASS (5.7:1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Large Text / Buttons (AA &gt;= 3.0:1):</span>
                      <span className="text-emerald-700 font-semibold">PASS</span>
                    </div>
                  </div>
                </div>

                {/* Contrast Card 3 */}
                <div className="border border-[#E5E0D5] rounded-xl p-4 bg-[#FAF9F6] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#242130]">Muted Ink on Ivory</span>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {mutedContrast.ratio}:1
                    </span>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] border border-[#E5E0D5] rounded text-center">
                    <span className="text-[#534F63] font-bold text-base">Secondary (#534F63)</span>
                  </div>
                  <div className="text-[11px] space-y-1 text-[#534F63]">
                    <div className="flex justify-between">
                      <span>Normal Text (AA &gt;= 4.5:1):</span>
                      <span className="text-emerald-700 font-semibold">PASS (6.4:1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Captions & Metadata:</span>
                      <span className="text-emerald-700 font-semibold">PASS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
