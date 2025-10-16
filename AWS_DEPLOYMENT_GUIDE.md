# AWS S3 and CloudFront Deployment Guide

This guide will help you deploy your Gatsby portfolio to AWS S3 with CloudFront CDN.

## Prerequisites

1. AWS Account
2. AWS CLI installed locally
3. Domain name (optional, but recommended)

## Step 1: Create S3 Bucket

```bash
# Replace 'your-portfolio-bucket' with your desired bucket name
aws s3 mb s3://your-portfolio-bucket --region us-east-1

# Enable static website hosting
aws s3 website s3://your-portfolio-bucket \
  --index-document index.html \
  --error-document 404.html
```

## Step 2: Configure S3 Bucket Policy

Create a file `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-portfolio-bucket/*"
    }
  ]
}
```

Apply the policy:

```bash
aws s3api put-bucket-policy \
  --bucket your-portfolio-bucket \
  --policy file://bucket-policy.json
```

## Step 3: Create CloudFront Distribution

1. Go to AWS Console → CloudFront → Create Distribution
2. Configure:

   - **Origin Domain**: Select your S3 bucket
   - **Origin Path**: Leave empty
   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Allowed HTTP Methods**: GET, HEAD, OPTIONS
   - **Cache Policy**: CachingOptimized
   - **Compress Objects Automatically**: Yes
   - **Price Class**: Use all edge locations (or choose based on your needs)
   - **Alternate Domain Names (CNAMEs)**: Add your custom domain
   - **SSL Certificate**: Request or import certificate
   - **Default Root Object**: index.html

3. Create custom error responses:
   - **404**: /404.html (Response Code: 404)
   - **403**: /404.html (Response Code: 404)

## Step 4: Configure AWS Credentials

### For Local Deployment

```bash
# Configure AWS CLI
aws configure

# Or set environment variables
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_REGION=us-east-1
export AWS_S3_BUCKET=your-portfolio-bucket
export AWS_CLOUDFRONT_DISTRIBUTION_ID=your_distribution_id
```

### For GitHub Actions

Add these secrets to your GitHub repository:

- Settings → Secrets and variables → Actions → New repository secret

Required secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (e.g., us-east-1)
- `AWS_S3_BUCKET` (your bucket name)
- `AWS_CLOUDFRONT_DISTRIBUTION_ID` (from CloudFront console)
- `CLOUDFRONT_DOMAIN` (optional, for deployment summary)

## Step 5: Deploy

### Manual Deployment

```bash
# Make the script executable
chmod +x deploy-aws.sh

# Set environment variables
export AWS_S3_BUCKET=your-portfolio-bucket
export AWS_CLOUDFRONT_DISTRIBUTION_ID=E1234567890ABC
export AWS_REGION=us-east-1

# Run deployment
./deploy-aws.sh
```

### Automatic Deployment (GitHub Actions)

The site will automatically deploy when you push to the `main` branch.

You can also manually trigger deployment:

1. Go to Actions tab in GitHub
2. Select "Deploy to AWS S3 and CloudFront"
3. Click "Run workflow"

## Step 6: Configure Custom Domain (Optional)

### Using Route 53

1. Create hosted zone for your domain
2. Add A record (Alias):
   - **Name**: @ (or subdomain)
   - **Type**: A - IPv4 address
   - **Alias**: Yes
   - **Alias Target**: Select your CloudFront distribution

### Using External DNS Provider

Add a CNAME record:

- **Name**: www (or subdomain)
- **Value**: your-cloudfront-domain.cloudfront.net

## Step 7: Request SSL Certificate

1. Go to AWS Certificate Manager (ACM)
2. Request a public certificate
3. Add domain names (e.g., abobaloyi.com, www.abobaloyi.com)
4. Validate via DNS or Email
5. Once validated, attach to CloudFront distribution

## Deployment Scripts

### Add to package.json

```json
{
  "scripts": {
    "deploy:aws": "./deploy-aws.sh",
    "deploy:aws:prod": "NODE_ENV=production ./deploy-aws.sh"
  }
}
```

## Cost Estimation

### S3 Storage

- First 50 TB: $0.023 per GB/month
- Typical portfolio site: ~100MB = ~$0.002/month

### CloudFront

- First 10 TB: $0.085 per GB
- 1 million HTTP requests: $0.0075
- Typical traffic (10GB/month): ~$1/month

### Route 53 (if used)

- Hosted zone: $0.50/month
- Queries: $0.40 per million queries

**Total estimated cost: $1-5/month** (depending on traffic)

## Monitoring

### CloudWatch Metrics

- CloudFront requests
- S3 bucket size
- Error rates

### Set up alarms

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name high-error-rate \
  --alarm-description "Alert when error rate is high" \
  --metric-name 4xxErrorRate \
  --namespace AWS/CloudFront \
  --statistic Average \
  --period 300 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold
```

## Troubleshooting

### Issue: 403 Forbidden

- Check S3 bucket policy
- Verify CloudFront origin settings
- Check bucket permissions

### Issue: Old content showing

- CloudFront cache not invalidated
- Run: `aws cloudfront create-invalidation --distribution-id ID --paths "/*"`

### Issue: Slow deployment

- Invalidation can take 5-15 minutes
- Consider using versioned URLs for assets

## Security Best Practices

1. **Use IAM roles** with minimal permissions
2. **Enable CloudFront logging**
3. **Use AWS WAF** for DDoS protection (optional)
4. **Enable S3 versioning** for backup
5. **Use CloudFront signed URLs** for private content (if needed)

## Performance Optimization

1. **Enable Brotli compression** in CloudFront
2. **Use HTTP/2** (enabled by default)
3. **Configure cache behaviors** for different file types
4. **Use Lambda@Edge** for advanced routing (optional)

## Backup Strategy

```bash
# Backup S3 bucket
aws s3 sync s3://your-portfolio-bucket ./backup/

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket your-portfolio-bucket \
  --versioning-configuration Status=Enabled
```

## Next Steps

1. Set up monitoring and alerts
2. Configure custom domain
3. Enable CloudFront access logs
4. Set up automated backups
5. Consider using AWS Amplify for easier deployment (alternative)

## Support

For issues or questions:

- AWS Documentation: https://docs.aws.amazon.com/
- CloudFront Guide: https://docs.aws.amazon.com/cloudfront/
- S3 Guide: https://docs.aws.amazon.com/s3/
