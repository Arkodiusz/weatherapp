#!/bin/sh

S3_WEBSITE="weatherapp-ui"

echo "Uploading index.html to bucket $S3_WEBSITE"
aws s3api put-object --bucket $S3_WEBSITE --key index.html --body index.html --profile arek