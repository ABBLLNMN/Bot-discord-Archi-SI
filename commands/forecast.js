const Command = require('./command')
const config = require('../config')
const http = require('http')
const cityList = require('./city.list.json')
const convertKelvinToCelsius = tempInKelvin => tempInKelvin - 273.15
const getCityDetailsByName = name => cityList.find(city => city.name.toLowerCase() === name.toLowerCase())
const getForecast = cityId => {
  return new Promise((resolve, reject) => {
    http.get(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${config.weather.API_KEY}&lang=${config.weather.lang}`, function (res) {
      const statusCode = res.statusCode
      const contentType = res.headers['content-type']

      if (statusCode !== 200) {
        console.log('erreur pas 200')
      } else if (!/^application\/json/.test(contentType)) {
        console.log(`erreur content-type. Pas json mais ${contentType}`)
      } else {
        console.log('ok')
      }

      let rawData = ''
      res.on('data', data => {
        rawData += data
        console.log('raw' + rawData)
      })
      res.on('end', () => {
        let parsedData
        parsedData = JSON.parse(rawData)
        let resultat = {
          temperature: convertKelvinToCelsius(parsedData.main.temp),
          description: parsedData.weather.description
        }
        resolve(resultat)
      })
    })
  })
}

module.exports = class Forecast extends Command {
  static match (message) {
    console.log('checking  forecast')
    return message.content.startsWith('!forecast')
  }

  static action (message) {
    let ville = getCityDetailsByName(message.content)

    if (ville) {
      getForecast(ville.id)
    }
  }
}
