var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();
// Update the Table name below
var tablename = process.env.TABLE_NAME ;



exports.scandb = (event, context, callback) => {
    dynamodb.scan({TableName: tablename}, (err, data) => {
        callback(null, data['Items']);
    });
};
