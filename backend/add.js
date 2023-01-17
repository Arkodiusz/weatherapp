var aws = require('aws-sdk')
var dynamoDB = new aws.DynamoDB.DocumentClient()
var tableName = process.env.TABLE_NAME

exports.handler = async (event) => {
    var name = event.queryParams.name
    var long = Number(event.queryParams.long)
    var lat = Number(event.queryParams.lat)

    console.log(typeof name, 'name', name)
    console.log(typeof long, 'long', long)
    console.log(typeof lat, 'lat', lat)

    var get_params = {
        Key: {
            name: name
        },
        TableName: tableName
    }

    let result = await dynamoDB.get(get_params).promise();

    if (result.Item != null) {
      return response(409, 'Item already exist')
    }

    var put_params = {
        Item: {
            name: name,
            longitude: long,
            latitude: lat
        },
        TableName: tableName
    }

    try {
        await createItem(put_params)
        return response(201, 'Successfully created item!')
    } catch (err) {
        return response(400, err)
    }
}

async function createItem(params){
    try {
        await dynamoDB.put(params).promise()
    } catch (err) {
        return err;
    }
}

function response(code, body) {
    return {
        statusCode: code,
        body: body
    }
}