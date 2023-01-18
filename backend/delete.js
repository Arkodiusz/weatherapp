var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();
var tableName = process.env.TABLE_NAME ;

exports.handler = async (event) => {
    var name = event.queryParams.name
    
    // TODO: implement deletion of item
};