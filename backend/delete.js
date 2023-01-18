var aws = require('aws-sdk')
var dynamoDB = new aws.DynamoDB()
var tableName = process.env.TABLE_NAME

exports.handler = async (event) => {
    var name = event.queryParams.name

    var params = {
        Key: {
            name: {
                S: name
            }
        },
        TableName: tableName
    }

    try {
        await dynamoDB.deleteItem(params).promise()
        return response(200, 'Successfully deleted item!')
    } catch (err) {
        return response(400, err)
    }
}

function response(code, body) {
    return {
        statusCode: code,
        body: body
    }
}