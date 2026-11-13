/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateContrastRatio,
  evaluateWcagCompliance,
  validateOacBucketPolicy,
  evaluatePracticeChoice,
} from './audit';

test('calculateContrastRatio computes expected contrast values', () => {
  // Pure white against pure black is 21:1
  const maxRatio = calculateContrastRatio('#FFFFFF', '#000000');
  assert.equal(maxRatio, 21);

  // Clickwise Ink (#242130) against Ivory background (#FAF9F6)
  const inkRatio = calculateContrastRatio('#242130', '#FAF9F6');
  assert.ok(inkRatio >= 13.0, `Ink ratio was ${inkRatio}, expected >= 13.0`);

  // Clickwise Plum accent (#634397) against Ivory (#FAF9F6)
  const plumRatio = calculateContrastRatio('#634397', '#FAF9F6');
  assert.ok(plumRatio >= 5.5, `Plum ratio was ${plumRatio}, expected >= 5.5`);
});

test('evaluateWcagCompliance checks AA and AAA boundaries correctly', () => {
  const inkEval = evaluateWcagCompliance('#242130', '#FAF9F6');
  assert.equal(inkEval.passesNormalAA, true);
  assert.equal(inkEval.passesNormalAAA, true);
  assert.equal(inkEval.passesLargeAA, true);
  assert.equal(inkEval.passesLargeAAA, true);

  const plumEval = evaluateWcagCompliance('#634397', '#FAF9F6');
  assert.equal(plumEval.passesNormalAA, true); // > 4.5
  assert.equal(plumEval.passesLargeAA, true);  // > 3.0
});

test('validateOacBucketPolicy enforces CloudFront OAC restrictions', () => {
  const validPolicy = JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'AllowCloudFrontServicePrincipalReadOnly',
        Effect: 'Allow',
        Principal: { Service: 'cloudfront.amazonaws.com' },
        Action: 's3:GetObject',
        Resource: 'arn:aws:s3:::clickwise-bucket/*',
        Condition: {
          StringEquals: {
            'AWS:SourceArn': 'arn:aws:cloudfront::123456789012:distribution/EDFDVBD632BHDS5',
          },
        },
      },
    ],
  });

  const validResult = validateOacBucketPolicy(validPolicy);
  assert.equal(validResult.isValid, true);
  assert.equal(validResult.errors.length, 0);

  // Policy without SourceArn
  const insecurePolicy = JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'TooPermissive',
        Effect: 'Allow',
        Principal: { Service: 'cloudfront.amazonaws.com' },
        Action: 's3:GetObject',
        Resource: 'arn:aws:s3:::clickwise-bucket/*',
      },
    ],
  });

  const insecureResult = validateOacBucketPolicy(insecurePolicy);
  assert.equal(insecureResult.isValid, false);
  assert.ok(insecureResult.errors.some((e) => e.includes('AWS:SourceArn')));
});

test('evaluatePracticeChoice evaluates campus scenarios properly', () => {
  const phishingA = evaluatePracticeChoice('phishing', 'A');
  assert.equal(phishingA.isSafeChoice, false);
  assert.ok(phishingA.feedbackTitle.includes('High Risk'));

  const phishingB = evaluatePracticeChoice('phishing', 'B');
  assert.equal(phishingB.isSafeChoice, true);
  assert.ok(phishingB.feedbackTitle.includes('Safe Choice'));

  const mfaA = evaluatePracticeChoice('mfa', 'A');
  assert.equal(mfaA.isSafeChoice, false);

  const mfaB = evaluatePracticeChoice('mfa', 'B');
  assert.equal(mfaB.isSafeChoice, true);
});
