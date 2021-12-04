const path = require('path')
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
// const validator = require('validator')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

console.log(chalk.blue(__dirname))
const pathPublic = path.join(__dirname, '../public')
console.log(chalk.cyan(pathPublic))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pathPublic))

app.get('', (req, res) => {
  res.render('index', {
    title: 'super dynamic mellon farmer!',
    name: 'siliconsmiley'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Title',
    name: 'siliconsmiley',
    helpTitle: "There's no way that you can save me",
    itsOK: "It's OK go with him Haley"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "what's this all a boot?",
    name: 'siliconsmiley',
    moreAbout: 'more about nothing'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'address query parameter required',
      example: req.protocol + ':' + '//' + req.hostname + req.url
          + '?address=baltimore'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, address} = {}) => {
    if (error) {
      return res.send({error})
    }
    console.log(latitude, longitude, address)
    console.log('lat:', chalk.green(latitude),
        'long:', chalk.green(longitude),
        'address:', chalk.blue(address))
    weather(latitude, longitude, (error, weatherData) => {
      if (error) {
        return res.send({error})
      }
      console.log(address, weatherData)
      res.send({
        location: address,
        time: weatherData.observationTime,
        temp: weatherData.temperature,
        feelslike: weatherData.feelsLike
      })
    })
  })

  // observationTime: body.current.observation_time,
  //     temperature: body.current.temperature,
  //     feelsLike: body.current.feelslike,
  //     weatherIcon: body.current.weather_icons

})

app.get('/products', (req, res) => {
  console.log(req.query)
  if (!req.query.search) {
    return res.send({
      error: "FAIL! gimmie search"
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'help 404',
    message: 'no help article found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: "these are not the droids you're looking for",
    name: 'siliconsmiley'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})