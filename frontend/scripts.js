const API_URL = 'https://mqp8jx5px4.execute-api.eu-central-1.amazonaws.com/prod'

const API_URL_SCAN = API_URL + '/scan'
const API_URL_ADD = API_URL + '/add'

const htmlHeaderRow =
`<tr>
    <th>Name</th>
    <th>Longitude</th>
    <th>Latitude</th>
    <th>Temperature</th>
    <th></th>
</tr>`

const htmlFormRow=
`<tr><td></td></tr><tr>
    <td><input type="text" id="form_name" placeholder="Name" style='width:100%' /></td>
    <td><input type="number" id="form_long" placeholder="[-180..180]" min="-180" max="180" style='width:100%' /></td>
    <td><input type="number" id="form_lat" placeholder="[-90..90]" min="-90" max="90" style='width:100%' /></td>
    <td></td>
    <td><button onclick="addItem()" style='width:100%'>Save</button></td> \
</tr>`

function addItem() {
    var name = $('#form_name').val()
    var long = $('#form_long').val()
    var lat = $('#form_lat').val()

    var path = API_URL_ADD + '?name=' + name + '&long=' + long + '&lat=' + lat

     $.get(path, function() {
        console.log(path)
     })

    refresh()
//    $('#form_name').val(null)
//    $('#form_long').val(null)
//    $('#form_lat').val(null)
}

function draw_table(rows) {
    $('#table1').empty();
    $('#table1').append(htmlHeaderRow)
    $('#table1').append(rows.join())
    $('#table1').append(htmlFormRow)
    $('#loading').hide()
    $('#table1').show()
}

function refresh() {
    var rows = [];

    $.get(API_URL_SCAN, function(data) {
        data.forEach(function(item) {
            console.log('item', item)

            name =  item['name']['S']
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