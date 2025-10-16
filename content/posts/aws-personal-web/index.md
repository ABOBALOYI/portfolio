---
title: How I Hosted My Gatsby Website on AWS with GitHub CI/CD
description: Trying to create a simple post in WordPress
date: 2024-05-12
draft: false
slug: /Insights/aws-personal-web
tags:
  - AWS
  - react.js
---

_Website:_ [baloyiabo.co.za](https://baloyiabo.co.za)
_Stack:_ Gatsby · AWS S3 · CloudFront · GitHub Actions · Route 53 · ACM (SSL)
--

## 🧱 Step 1: Build a Gatsby Static Website

I started by creating a Gatsby site:

```bash
npx gatsby new baloyiabo
cd baloyiabo
gatsby develop
```

After customizing my site, I generated the production-ready static files:

```bash
gatsby build
```

## 📸 _Screenshot of local development / Gatsby homepage preview here_

## ☁️ Step 2: Set Up AWS S3 Bucket for Hosting

1. Go to the AWS Console → S3.
2. Create a new bucket named `baloyiabo.co.za`.
3. Disable "Block all public access".
4. Enable static website hosting and upload the `/public` folder after building.
   📸 _Screenshot of S3 bucket config and static hosting tab_
   --

## 🌍 Step 3: Configure Route 53 for Custom Domain

1. Purchase or migrate the domain `baloyiabo.co.za`.
2. Create a **hosted zone** in Route 53.
3. Point your domain registrar’s NS records to AWS.
4. Add an alias record to point to the CloudFront distribution (later).
   📸 _Screenshot of Route 53 hosted zone settings_
   --

## 🔒 Step 4: Create a Free SSL Certificate with ACM

1. Go to AWS ACM → Request a certificate.
2. Add both `baloyiabo.co.za` and `www.baloyiabo.co.za`.
3. Choose DNS validation and update your Route 53 records automatically.
   📸 _Screenshot of ACM certificate request and validation records_
   --

## 🌐 Step 5: Set Up CloudFront for CDN + HTTPS

1. Go to AWS CloudFront → Create Distribution.
2. Set origin to your S3 static website endpoint.
3. Attach your ACM SSL certificate.
4. Set up default behavior to redirect HTTP to HTTPS.
   📸 _Screenshot of CloudFront distribution settings and domain_
   --

## 🔧 Step 6: Create GitHub Actions CI/CD Workflow

In your GitHub repo, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Gatsby to S3
on:
push:
branches: [main]
jobs:
deploy:
runs-on: ubuntu-latest
steps:
- name: Checkout code
uses: actions/checkout@v3
- name: Set up Node
uses: actions/setup-node@v4
with:
node-version: '18'
- name: Install dependencies
run: npm install
- name: Build Gatsby site
run: npm run build
- name: Deploy to S3
uses: jakejarvis/s3-sync-action@master
with:
args: --delete
env:
AWS_S3_BUCKET: baloyiabo.co.za
AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
SOURCE_DIR: "public"
- name: Invalidate CloudFront cache
uses: chetan/invalidate-cloudfront-action@v2
env:
AWS_REGION: "us-east-1"
DISTRIBUTION: ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }}
PATHS: "/*"
AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## 📸 _Screenshot of GitHub Actions workflow run and deployment logs_

## 🔐 Step 7: Store AWS Credentials in GitHub Secrets

1. In GitHub → Settings → Secrets → Actions.
2. Add:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CLOUDFRONT_DISTRIBUTION_ID`
  📸 _Screenshot of GitHub Secrets config_
  --

## ✅ Step 8: Push to `main` and Watch It Go Live!

Once all is set up, any push to your `main` branch will:
Build the Gatsby site
Deploy to S3
Invalidate CloudFront
Serve via HTTPS with your custom domain 🎉
📸 _Final screenshot of the live website (baloyiabo.co.za)_
--

## 💸 Cost Breakdown

| Service    | Monthly Cost                  |
| ---------- | ----------------------------- |
| S3 Hosting | ~$0.10 – $0.50                |
| CloudFront | ~$0.50 – $2.00                |
| Route 53   | ~$1.50 (hosted zone + domain) |
| SSL (ACM)  | **Free**                      |

_Total:_ ~$2 – $4 per month
