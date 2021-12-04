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
    title: 'Node JS Dynamic Weather App',
    name: 'siliconsmiley'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'siliconsmiley',
    itsOK: "This is fine"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About",
    name: 'siliconsmiley',
    moreAbout: 'more about'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please enter a location',
      example: req.protocol + ':' + '//' + req.hostname + req.url
          + '?address=baltimore'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, address} = {}) => {
    if (error) {
      return res.send({error})
    }
    weather(latitude, longitude, (error, weatherData) => {
      if (error) {
        return res.send({error})
      }
      res.send({
        location: address,
        time: weatherData.observationTime,
        temp: weatherData.temperature,
        feelslike: weatherData.feelsLike
      })
    })
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