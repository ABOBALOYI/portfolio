#!/bin/bash

# AWS S3 and CloudFront Deployment Script
# This script builds the Gatsby site and deploys it to S3 with CloudFront invalidation

set -e

echo "🚀 Starting AWS deployment..."

# Configuration
S3_BUCKET="${AWS_S3_BUCKET:-your-bucket-name}"
CLOUDFRONT_DISTRIBUTION_ID="${AWS_CLOUDFRONT_DISTRIBUTION_ID:-your-distribution-id}"
AWS_REGION="${AWS_REGION:-us-east-1}"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    echo "Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if required environment variables are set
if [ "$S3_BUCKET" = "your-bucket-name" ]; then
    echo -e "${RED}❌ Please set AWS_S3_BUCKET environment variable${NC}"
    exit 1
fi

if [ "$CLOUDFRONT_DISTRIBUTION_ID" = "your-distribution-id" ]; then
    echo -e "${RED}❌ Please set AWS_CLOUDFRONT_DISTRIBUTION_ID environment variable${NC}"
    exit 1
fi

# Clean previous build
echo -e "${BLUE}🧹 Cleaning previous build...${NC}"
npm run clean

# Build the site
echo -e "${BLUE}🔨 Building Gatsby site...${NC}"
npm run build

# Check if build was successful
if [ ! -d "public" ]; then
    echo -e "${RED}❌ Build failed - public directory not found${NC}"
    exit 1
fi

# Sync to S3
echo -e "${BLUE}☁️  Uploading to S3 bucket: ${S3_BUCKET}...${NC}"
aws s3 sync public/ s3://${S3_BUCKET} \
    --region ${AWS_REGION} \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html" \
    --exclude "page-data/*" \
    --exclude "sw.js"

# Upload HTML files with shorter cache
echo -e "${BLUE}📄 Uploading HTML files with no-cache...${NC}"
aws s3 sync public/ s3://${S3_BUCKET} \
    --region ${AWS_REGION} \
    --exclude "*" \
    --include "*.html" \
    --include "page-data/*" \
    --include "sw.js" \
    --cache-control "public, max-age=0, must-revalidate"

# Invalidate CloudFront cache
echo -e "${BLUE}🔄 Invalidating CloudFront cache...${NC}"
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)

echo -e "${GREEN}✅ CloudFront invalidation created: ${INVALIDATION_ID}${NC}"

# Wait for invalidation to complete (optional)
echo -e "${BLUE}⏳ Waiting for invalidation to complete...${NC}"
aws cloudfront wait invalidation-completed \
    --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} \
    --id ${INVALIDATION_ID}

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Your site is now live on CloudFront${NC}"
