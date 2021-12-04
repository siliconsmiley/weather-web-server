const request = require('postman-request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2lsaWNvbnNtaWxleSIsImEiOiJja3dxcTc2ZDAwYjBjMm9xbDg5bmRweng4In0.m7Ly8SA-Y9X7I0xyOB_Cyg&limit=1'
  console.log(url)
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback(error, undefined)
    } else if (body.features.length === 0) {
      callback('no location found', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        address: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode