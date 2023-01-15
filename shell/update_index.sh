#!/bin/sh
# run this script from project root directory
# example: ...\projects\app> sh .\shell\update_index.sh

S3_BUCKET="weatherapp-ui"
SOURCE="frontend"
PROFILE="arek"

echo "Uploading content of '$SOURCE' directory to bucket '$S3_BUCKET' using profile '$PROFILE'"
aws s3 cp $SOURCE s3://$S3_BUCKET/ --recursive --profile $PROFILE