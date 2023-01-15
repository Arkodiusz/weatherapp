var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();
var tableName = process.env.TABLE_NAME ;

exports.handler = (event, context, callback) => {
    dynamodb.scan({TableName: tableName}, (err, data) => {
        callback(null, data['Items']);
    });
};