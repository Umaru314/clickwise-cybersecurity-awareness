/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Clickwise Accessibility, WCAG Contrast, and AWS Policy Logic Utilities
 */

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): ColorRGB | null {
  const cleanHex = hex.replace(/^#/, '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

export function relativeLuminance(rgb: ColorRGB): number {
  const sRGB = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  const linear = sRGB.map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

export function calculateContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1;

  const lum1 = relativeLuminance(rgb1);
  const lum2 = relativeLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

export interface WcagEvaluation {
  ratio: number;
  passesNormalAA: boolean;
  passesNormalAAA: boolean;
  passesLargeAA: boolean;
  passesLargeAAA: boolean;
}

export function evaluateWcagCompliance(foregroundHex: string, backgroundHex: string): WcagEvaluation {
  const ratio = calculateContrastRatio(foregroundHex, backgroundHex);
  return {
    ratio,
    passesNormalAA: ratio >= 4.5,
    passesNormalAAA: ratio >= 7.0,
    passesLargeAA: ratio >= 3.0,
    passesLargeAAA: ratio >= 4.5,
  };
}

/**
 * Validate that an AWS S3 Bucket policy contains required OAC security constraints
 */
export function validateOacBucketPolicy(policyJsonString: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  try {
    const parsed = JSON.parse(policyJsonString);
    if (!parsed.Statement || !Array.isArray(parsed.Statement) || parsed.Statement.length === 0) {
      errors.push('Policy must contain at least one Statement element.');
      return { isValid: false, errors };
    }

    const stmt = parsed.Statement[0];
    if (stmt.Effect !== 'Allow') {
      errors.push("Statement Effect must be 'Allow'.");
    }

    const principal = stmt.Principal?.Service;
    if (principal !== 'cloudfront.amazonaws.com') {
      errors.push("Statement Principal.Service must be 'cloudfront.amazonaws.com'.");
    }

    const action = stmt.Action;
    const isGetObject = action === 's3:GetObject' || (Array.isArray(action) && action.includes('s3:GetObject'));
    if (!isGetObject) {
      errors.push("Statement Action must specify 's3:GetObject'.");
    }

    const condition = stmt.Condition?.StringEquals?.['AWS:SourceArn'];
    if (!condition) {
      errors.push("Statement must enforce 'Condition.StringEquals.AWS:SourceArn' to scope access to the CloudFront distribution.");
    }
  } catch (err: unknown) {
    errors.push(`Invalid JSON format: ${(err as Error).message}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Practice Lab Scenario Scoring Logic
 */
export interface PracticeChoiceResult {
  isSafeChoice: boolean;
  feedbackTitle: string;
  feedbackExplanation: string;
}

export function evaluatePracticeChoice(
  scenarioId: 'phishing' | 'passwords' | 'mfa' | 'browsing',
  choice: 'A' | 'B'
): PracticeChoiceResult {
  switch (scenarioId) {
    case 'phishing':
      if (choice === 'A') {
        return {
          isSafeChoice: false,
          feedbackTitle: 'High Risk: Clicked the Email Link',
          feedbackExplanation:
            'Following links directly from unverified urgency emails bypasses sender inspection. Lookalike domains frequently harvest credentials on fake login screens.',
        };
      }
      return {
        isSafeChoice: true,
        feedbackTitle: 'Safe Choice: Used Verified Bookmark',
        feedbackExplanation:
          'Navigating to your student portal via an existing trusted bookmark or by typing the verified university URL ensures you land on official campus servers.',
      };

    case 'passwords':
      if (choice === 'A') {
        return {
          isSafeChoice: false,
          feedbackTitle: 'High Risk: Reused Campus Password',
          feedbackExplanation:
            'Reusing your primary campus password on secondary sites or unencrypted dorm gaming portals exposes your main account to credential stuffing attacks.',
        };
      }
      return {
        isSafeChoice: true,
        feedbackTitle: 'Safe Choice: Generated Unique Passphrase',
        feedbackExplanation:
          'Using a password manager to generate distinct, complex passwords for every service restricts a breach of one service from compromising others.',
      };

    case 'mfa':
      if (choice === 'A') {
        return {
          isSafeChoice: false,
          feedbackTitle: 'High Risk: Approved Unprompted Push',
          feedbackExplanation:
            'Approving an unexpected push notification allows an attacker who already holds your password to complete multi-factor authentication (MFA push fatigue).',
        };
      }
      return {
        isSafeChoice: true,
        feedbackTitle: 'Safe Choice: Denied & Changed Password',
        feedbackExplanation:
          'Denying unexpected authentication requests halts unauthorized access immediately. Promptly changing your password protects the compromised credential.',
      };

    case 'browsing':
      if (choice === 'A') {
        return {
          isSafeChoice: false,
          feedbackTitle: 'High Risk: Trusted Lookalike Bookstore URL',
          feedbackExplanation:
            'A secure padlock (HTTPS) only encrypts the wire; it does not verify whether the site operator is honest. Scammers can easily obtain free SSL certificates.',
        };
      }
      return {
        isSafeChoice: true,
        feedbackTitle: 'Safe Choice: Inspected Exact Hostname',
        feedbackExplanation:
          'Inspecting the full domain (e.g., verifying `university-bookstore.edu` instead of `university-books-portal.net`) prevents counterfeit transactions.',
      };
  }
}
