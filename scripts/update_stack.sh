#!/bin/sh

echo "Deploying stack"
aws cloudformation deploy --template-file template.yaml --stack-name weatherapp-stack --capabilities CAPABILITY_IAM --profile arek
