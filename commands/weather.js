const Command = require('./command')
const config = require('../config')
const http = require('http')
const cityList = require('./city.list.json')
const convertKelvinToCelsius = tempInKelvin => tempInKelvin - 273.15
const getCityDetailsByName = name => cityList.find(city => city.name.toLowerCase() === name.toLowerCase())
const getWeather = cityId => {
  return new Promise((resolve, reject) => {
    http.get(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${config.weather.API_KEY}&lang=${config.weather.lang}`, function (res) {
      const statusCode = res.statusCode
      const contentType = res.headers['content-type']

      if (statusCode !== 200) {
        console.log('error isnt 200')
      } else if (!/^application\/json/.test(contentType)) {
        console.log(`error content-type is ${contentType}`)
      } else {
        console.log('ok')
      }

      let rawData = ''
      res.on('data', data => {
        rawData += data
        console.log(rawData)
      })

      res.on('end', () => {
        let parsedData
        parsedData = JSON.parse(rawData)
        let resultat = {
          temperature: convertKelvinToCelsius(parsedData.main.temp),
          description: parsedData.weather[0].description
        }
        resolve(resultat)
      })
    })
  })
}
module.exports = class Weather extends Command {
  static match (message) {
    console.log('checking  weather')
    return message.content.startsWith('!weather')
  }

  static action (message) {
    let ville = getCityDetailsByName(message.content)

    if (ville) {
      getWeather(ville.id).then(function (res) {
        message.reply(`Voici la météo actuellement à ${ville.name} :
    Temps : ${res.description}
    Température : ${Math.round(res.temperature)}°C`)
      }).catch((error) => {
        console.log(error.message)
      })
    } else {
      message.reply(message.content + ' n\'est pas une ville reconnue')
    }
  }
}
