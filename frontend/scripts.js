// Using good-old jQuery to fill the table with data received from the API Gateway endpoint

header = `<tr> \
            <th>Name</th> \
            <th>Longitude</th> \
            <th>Latitude</th> \
            <th>Temperature</th> \
        </tr>`

function draw_table(rows) {
    $('table.table').append(header)
    $('table.table').append(rows.join())
    $('#loading').hide()
    $('table.table').show()
}

function hide_table() {
    $('table.table').empty();
    $('#loading').show();
}

function refresh() {
    hide_table();

    var api_gateway_url = 'https://ikaq65a9q9.execute-api.eu-central-1.amazonaws.com/prod';
    var rows = [];

    $.get(api_gateway_url, function(data) {
        data.forEach(function(item) {
            console.log('item', item)

            name =  item['PriKey']['S']
            long = item['longitude']['N']
            lat = item['latitude']['N']
            temp = 0

            rows.push(`<tr> \
                <td>${name}</td> \
                <td>${long}</td> \
                <td>${lat}</td> \
                <td>${temp}</td> \
            </tr>`);
        });

        draw_table(rows)
    })
}

$(document).ready(refresh())