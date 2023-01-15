var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();
var tableName = process.env.TABLE_NAME ;

exports.handler = (event, context, callback) => {
    console.log(event)
    console.log(context)
    console.log(callback)
};