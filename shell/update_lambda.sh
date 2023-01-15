#!/bin/sh
# run this script from project root directory
# example: ...\projects\app> sh .\shell\update_lambda.sh

S3_BUCKET="weatherappsource"
SOURCE="backend\lambda.js"
ARCHIVE="backend\lambda.zip"
KEY="lambda.zip"
PROFILE="arek"

echo "Archiving '$SOURCE' to '$ARCHIVE'"
7z a -tzip $ARCHIVE $SOURCE

echo "Uploading archived lambda code '$ARCHIVE' to bucket '$S3_BUCKET' using profile '$PROFILE'"
aws s3api put-object --bucket $S3_BUCKET --key $KEY --body $ARCHIVE --profile $PROFILE