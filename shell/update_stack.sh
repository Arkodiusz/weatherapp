#!/bin/sh
# run this script from project root directory
# example: ...\projects\app> sh .\shell\update_stack.sh

STACK_NAME="weatherapp-stack"
TEMPLATE_FILE="backend\template.yaml"
PROFILE="arek"

echo "Deploying stack '$STACK_NAME' with template '$TEMPLATE_FILE' using profile '$PROFILE'"
aws cloudformation deploy --template-file $TEMPLATE_FILE --stack-name $STACK_NAME --capabilities CAPABILITY_IAM --profile $PROFILE
