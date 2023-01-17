const API_URL = 'https://mqp8jx5px4.execute-api.eu-central-1.amazonaws.com/prod'

const API_URL_SCAN = API_URL + '/scan'
const API_URL_ADD = API_URL + '/add'

const API_WEATHER = 'https://api.open-meteo.com/v1/forecast?&current_weather=true' // &longitude=0&latitude=0

const htmlHeaderRow =
`<tr>
    <th></th>
    <th>Name</th>
    <th>Longitude</th>
    <th>Latitude</th>
    <th></th>
</tr>`

const htmlFormRow=
`<tr><td></td><td></td><td></td><td></td><td></td></tr><tr>
    <td></td>
    <td><input type="text" id="form_name" placeholder="Name" style='width:100%' /></td>
    <td><input type="number" id="form_long" placeholder="[-180..180]" min="-180" max="180" style='width:100%' /></td>
    <td><input type="number" id="form_lat" placeholder="[-90..90]" min="-90" max="90" style='width:100%' /></td>
    <td><button onclick="addItem()" style='width:100%'>Save</button></td> \
</tr>`


$(document).ready(refresh())


function fetchTemperature() {

    var checkRadio = document.querySelector('input[name="radio_selector"]:checked');

    if(checkRadio == null) {
        alert('No item selected!')
        return        
    }

    var selectedRow = $('#' + checkRadio.id).closest('tr')
    var name = selectedRow.find("td#name").text()
    var long = selectedRow.find("td#long").text()
    var lat = selectedRow.find("td#lat").text()

    console.log('name', name)
    console.log('long', long)
    console.log('lat', lat)

    var path = API_WEATHER + '&longitude=' + long + '&latitude=' + lat

    $.ajax({
        async: false,
        type: 'GET',
        url: path,
        success: function(data) {
            console.log('path', path)
            console.log('response', data)
            alert('Temperature in selected place: ' + data.current_weather.temperature)
        }
    })

}


function addItem() {
    var name = $('#form_name').val()
    var long = Number($('#form_long').val())
    var lat = Number($('#form_lat').val())

    if (!name) {
        alert('Name not provided')
        return
    }

    if (long < -180 || long > 180) {
        alert('Longitude out of range [-180..180] degrees')
        return
    }

    if (lat < -90 || lat > 90) {
        alert('Longitude out of range [-90..90] degrees')
        return
    }

    var path = API_URL_ADD + '?name=' + name + '&long=' + long + '&lat=' + lat

    $.ajax({
        async: false,
        type: 'GET',
        url: path,
        success: function(data) {
            console.log('path', path)
            console.log('response', data)
        }
    })

    refresh()
}


function refresh() {
    var rows = []

    $.ajax({
        async: false,
        type: 'GET',
        url: API_URL_SCAN,
        success: function(data) {
            var rowNumber = 1
            data.forEach(function(item) {
                name = item['name']['S']
                long = item['longitude']['N']
                lat = item['latitude']['N']
                temp = 0
                var rowId = "row" + rowNumber

                rows.push(
                    `<tr>
                        <td><input type="radio" id=${rowId} name="radio_selector"></td>
                        <td id="name">${name}</td>
                        <td id="long">${long}</td>
                        <td id="lat">${lat}</td>
                        <td></td>
                    </tr>`)

                rowNumber++
            })
        }     
    })
    draw_table(rows)
}


function draw_table(rows) {
    $('#table1').empty();
    $('#table1').append(htmlHeaderRow)
    $('#table1').append(rows.join())
    $('#table1').append(htmlFormRow)
    $('#loading').hide()
    $('#table1').show()
}