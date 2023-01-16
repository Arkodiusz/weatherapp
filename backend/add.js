var aws = require('aws-sdk')
var dynamodb = new aws.DynamoDB()
var tableName = process.env.TABLE_NAME

exports.handler =  async function(event, context) {
    var name = event.queryParams.name
    var long = event.queryParams.long
    var lat = event.queryParams.lat

    console.log('name', name)
    console.log('long', long)
    console.log('lat', lat)
}