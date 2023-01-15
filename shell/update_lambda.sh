#!/bin/sh
# run this script from project root directory
# example: ...\projects\app> sh .\shell\update_lambda.sh

S3_BUCKET="weatherappsource"

SOURCE_DIR="backend"
BUILD_DIR="build"

SCAN_SOURCE="scan.js"
SCAN_ARCHIVE="$BUILD_DIR\scan.zip"

ADD_SOURCE="add.js"
ADD_ARCHIVE="$BUILD_DIR\add.zip"


PROFILE="arek"

echo "Archiving source files..."
cd $SOURCE_DIR || exit
7z a -tzip $SCAN_ARCHIVE $SCAN_SOURCE
7z a -tzip $ADD_ARCHIVE $ADD_SOURCE

echo "Uploading archived lambda code..."
aws s3 cp $BUILD_DIR s3://$S3_BUCKET/ --recursive --profile $PROFILE
