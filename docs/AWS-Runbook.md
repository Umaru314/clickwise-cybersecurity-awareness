# Clickwise — AWS Deployment & Verification Runbook

**Author:** Mariama Kanu  
**Project:** Cybersecurity Awareness Website on AWS  
**Document Status:** Pending Student Lab Execution (Placeholders clearly marked)  

---

## 1. Pre-Deployment Checklist: Budget, Permissions & Credits

Before creating any cloud resources in your authorized AWS account or student sandbox (AWS Academy / AWS Educate / Learner Lab):

1. **Check Available Credits & Budget:**
   - Navigate to the **AWS Billing and Cost Management Console** (`https://console.aws.amazon.com/billing/`).
   - Confirm active credits or billing limits.
   - Click **Budgets** → **Create budget** → select **Zero spend budget** or a **Monthly cost budget** (e.g., $1.00 or $5.00 threshold) with email alerts to your student email.
   - *Note:* Budget alerts send notifications when forecasted or actual spend crosses a threshold; alerts do **not** automatically stop resources or prevent charges.
2. **Verify Free Tier & Pricing Terms:**
   - **Amazon S3:** Standard storage free tier includes 5 GB of standard storage, 20,000 GET requests, and 2,000 PUT requests per month for 12 months.
   - **Amazon CloudFront:** Free tier includes 1 TB of data transfer out and 10,000,000 HTTP/HTTPS requests per month, which remains free indefinitely (always-free tier).
   - Clickwise is deliberately designed as a static website under 2 MB, well within all free limits.

---

## 2. Step-by-Step Deployment Procedure

### Stage A: Create the Private Amazon S3 Bucket
1. Open the **Amazon S3 Console** (`https://console.aws.amazon.com/s3/`).
2. Click **Create bucket**.
3. **Bucket Name:** Enter a globally unique, DNS-compliant name in lowercase, for example:
   ```text
   clickwise-awareness-mkanu-2026
   ```
4. **AWS Region:** Select your assigned lab region (e.g., `us-east-1` or `us-east-2`).
5. **Object Ownership:** Leave as **ACLs disabled (recommended)**.
6. **Block Public Access settings:**
   - Ensure the checkbox **Block *all* public access** is **CHECKED** (enabled).
   - Confirm that all four sub-options (Block public ACLs, Ignore public ACLs, Block public policy, Restrict public buckets) are **ON**.
7. **Bucket Versioning:** Disabled (optional for this lab).
8. **Default Encryption:** Server-side encryption with Amazon S3 managed keys (SSE-S3).
9. Click **Create bucket**.
10. **Disable Static Website Hosting:** Click into the new bucket → **Properties** tab → scroll to **Static website hosting** at the bottom → verify it is set to **Disabled**. (CloudFront will communicate directly via the S3 REST API endpoint, *not* the S3 website hosting endpoint).

---

### Stage B: Upload Website Files to the S3 Bucket Root
1. Inside your bucket, click **Upload**.
2. Click **Add files** or drag and drop the files from your local `website/` directory:
   - `index.html` (Must be at the root of the bucket, NOT inside a subfolder named `website/`)
   - `phishing.html`
   - `passwords.html`
   - `mfa.html`
   - `browsing.html`
   - `practice.html`
   - `sources.html`
   - `style.css`
3. Click **Add folder** to upload the `assets/` directory (containing images and icons).
4. Review the upload list. Confirm `index.html` shows target key `index.html`.
5. Click **Upload** and wait for the green "Upload succeeded" confirmation.

---

### Stage C: Create the CloudFront Distribution with Origin Access Control (OAC)
1. Open the **Amazon CloudFront Console** (`https://console.aws.amazon.com/cloudfront/v4/home`).
2. Click **Create distribution**.
3. **Origin Domain:** In the dropdown, select your newly created S3 bucket:
   ```text
   clickwise-awareness-mkanu-2026.s3.us-east-1.amazonaws.com
   ```
   *(Ensure you select the REST endpoint, not the S3 website endpoint).*
4. **Origin Access:**
   - Select **Origin access control settings (recommended)**.
   - Click **Create new OAC**.
   - Keep the default name (e.g., `clickwise-awareness-mkanu-2026.s3.us-east-1.amazonaws.com`).
   - Signing behavior: **Sign requests (recommended)**.
   - Origin type: **S3**.
   - Click **Create**.
5. **Default Cache Behavior:**
   - **Viewer Protocol Policy:** Select **Redirect HTTP to HTTPS**.
   - **Allowed HTTP Methods:** Select **GET, HEAD**.
   - **Restrict viewer access:** No (public site visitors).
   - **Cache key and origin requests:** Select **CachePolicy - CachingOptimized** (recommended default).
6. **Function Associations:** None.
7. **Web Application Firewall (WAF):** Do not enable security protections for this student exercise (avoids AWS WAF monthly rule fees).
8. **Settings:**
   - **Price Class:** Use all edge locations (or North America and Europe to optimize).
   - **Alternate Domain Names (CNAME):** Leave blank (using the default CloudFront domain).
   - **Custom SSL Certificate:** Default CloudFront certificate (`*.cloudfront.net`).
   - **Default Root Object:** Type:
     ```text
     index.html
     ```
     *(CRITICAL: Without this, visiting `https://<CLOUDFRONT_DOMAIN>/` will produce a 403 or Access Denied error).*
9. Click **Create distribution**.
10. **Copy S3 Bucket Policy Prompt:** A prominent banner will appear: *"The S3 bucket policy needs to be updated..."* Click **Copy policy**. (Proceed to Stage D).

---

### Stage D: Apply the Restricted S3 Bucket Policy
1. Return to the **Amazon S3 Console** and click into your bucket (`clickwise-awareness-mkanu-2026`).
2. Click the **Permissions** tab.
3. Scroll to **Bucket policy** and click **Edit**.
4. Paste the policy generated by CloudFront. It must grant `s3:GetObject` solely to the CloudFront service principal (`cloudfront.amazonaws.com`), restricted to your specific distribution ARN via the `AWS:SourceArn` condition.
5. Review the policy against the reference below, click **Save changes**.

#### Annotated Reference Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalReadOnly",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<BUCKET_NAME>/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<CLOUDFRONT_DISTRIBUTION_ID>"
        }
      }
    }
  ]
}
```

*Placeholders to replace with your actual lab values:*
- `<BUCKET_NAME>`: Your bucket name (e.g., `clickwise-awareness-mkanu-2026`).
- `<ACCOUNT_ID>`: Your 12-digit AWS Account ID.
- `<CLOUDFRONT_DISTRIBUTION_ID>`: Your distribution ID (e.g., `EDFDVBD632BHDS5`).

---

## 3. Demonstration & Verification Procedures

Open **Windows PowerShell** on your laptop. Run the three core verification checks below against the exact same deployed file (`index.html`).

Replace:
- `<CLOUDFRONT_DOMAIN>` with your assigned domain (e.g., `d1a2b3c4d5e6f7.cloudfront.net`).
- `<UNSIGNED_S3_OBJECT_URL>` with your plain S3 REST object URL (e.g., `https://clickwise-awareness-mkanu-2026.s3.us-east-1.amazonaws.com/index.html`).

---

### Verification Check 1: Secure HTTPS Delivery via CloudFront

```powershell
curl.exe -I "https://<CLOUDFRONT_DOMAIN>/index.html"
```

**Expected Evidence:**
- HTTP response status: `HTTP/2 200` (or `HTTP/1.1 200 OK`).
- Headers present: `content-type: text/html`, `server: CloudFront`, `x-cache: Hit from cloudfront` (or `Miss from cloudfront` on the very first request).
- Visual check: Open the URL in Google Chrome or Microsoft Edge. Verify the page renders in full color, the envelope illustration displays, all topic cards are visible, and the browser address bar displays the secure lock icon.

---

### Verification Check 2: Automatic HTTP to HTTPS Redirection

```powershell
curl.exe -I "http://<CLOUDFRONT_DOMAIN>/index.html"
```

**Expected Evidence:**
- HTTP response status: `HTTP/1.1 301 Moved Permanently`.
- Header: `Location: https://<CLOUDFRONT_DOMAIN>/index.html`.
- Server: `CloudFront`.
- Explanation: The viewer's unencrypted HTTP attempt is immediately intercepted at the edge network and redirected to the encrypted HTTPS channel without contacting the S3 origin.

---

### Verification Check 3: Blocked Direct Origin Access (S3 Protection)

```powershell
curl.exe -I "<UNSIGNED_S3_OBJECT_URL>"
```

**Expected Evidence:**
- HTTP response status: `HTTP/1.1 403 Forbidden`.
- Header: `x-amz-error-code: AccessDenied` or XML payload containing `<Code>AccessDenied</Code>`.
- Visual check: Open `<UNSIGNED_S3_OBJECT_URL>` in an Incognito / Private browser window. Capture the XML Access Denied screen.
- Explanation: Because S3 Block Public Access is active and the bucket policy only trusts signed SigV4 requests from your specific CloudFront distribution ARN, unauthenticated public requests are rejected at the S3 boundary.

---

## 4. Troubleshooting Guide

### Issue A: CloudFront Returns 403 Forbidden on the Root Domain
- **Cause:** Missing Default Root Object. When a user requests `https://<CLOUDFRONT_DOMAIN>/`, CloudFront requests the root key (`""`), which S3 does not recognize as an object.
- **Fix:** In CloudFront Console → select Distribution → **General** tab → **Edit** → enter `index.html` in the **Default root object** field → **Save changes**.

### Issue B: CloudFront Returns 403 Forbidden on All Objects
- **Cause:** Bucket policy mismatch or OAC not attached.
- **Fix:**
  1. Verify the distribution's Origin has **Origin access control** selected.
  2. Verify the bucket policy's `AWS:SourceArn` matches the distribution ARN exactly.
  3. Verify the `Resource` in the bucket policy ends with `/*` (e.g., `arn:aws:s3:::my-bucket/*`).

### Issue C: Direct S3 URL Returns 200 OK (Security Failure)
- **Cause:** S3 Block Public Access was accidentally disabled, or an overly permissive bucket policy (such as `"Principal": "*"`) was applied.
- **Fix:** Immediately enable **Block all public access** on the S3 bucket and ensure the bucket policy restricts the `Principal` strictly to `"Service": "cloudfront.amazonaws.com"` with the `AWS:SourceArn` condition.

### Issue D: Browser Shows Stale Content After Uploading New Files
- **Cause:** CloudFront is serving cached copies from edge locations according to its cache TTL.
- **Fix:** In CloudFront Console → select Distribution → **Invalidations** tab → click **Create invalidation** → enter `/*` → click **Create invalidation**. Wait 1–2 minutes for the invalidation to complete.

---

## 5. Cost Observations & Cleanup Runbook

### Cost Monitoring During the Project
- Review the **AWS Cost Explorer** or Billing dashboard 24 hours after deployment to verify that total charges remain $0.00 under the free tier.
- Document any charges (e.g., DNS queries, unexpected tax, or WAF charges if inadvertently toggled).

### Post-Grading Resource Teardown (De-provisioning)
To guarantee that no recurring or unexpected charges occur after project completion and final presentation grading:

1. **Disable the CloudFront Distribution:**
   - In CloudFront Console, select the distribution and click **Disable**.
   - Wait 3–5 minutes until the status changes from *Deploying* to *Disabled*.
2. **Delete the CloudFront Distribution:**
   - Once disabled, select the checkbox and click **Delete**.
3. **Empty and Delete the Amazon S3 Bucket:**
   - In the S3 Console, select the bucket (`clickwise-awareness-mkanu-2026`).
   - Click **Empty** → type `permanently delete` → confirm.
   - Click **Delete bucket** → type the bucket name → confirm deletion.
4. **Delete Budgets (Optional):**
   - Navigate to AWS Budgets and remove any lab budgets if desired.
