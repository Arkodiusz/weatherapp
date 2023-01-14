#!/bin/sh

S3_SOURCE="weatherappsource"

echo "Archiving lambda code"
7z a -tzip lambda.zip lambda.js


echo "Uploading archive to bucket $S3_SOURCE"
aws s3api put-object --bucket $S3_SOURCE --key lambda.zip --body lambda.zip --profile arek