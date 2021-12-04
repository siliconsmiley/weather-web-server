const request = require('postman-request')

const weather = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=20123b05ffbffe87b15286cadd26b88e&query=' + latitude + ',' + longitude + '&units=f'
  console.log(url)
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback(error, undefined)
    } else if (body.error) {
      callback('no location found', undefined)
    } else  {
      callback(undefined, {
        observationTime: body.current.observation_time,
        temperature: body.current.temperature,
        feelsLike: body.current.feelslike,
        weatherIcon: body.current.weather_icons
      })
    }
  })
}

module.exports = weather