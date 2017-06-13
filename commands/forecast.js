const Command = require('./command')
const config = require('../config')
const http = require('http')
const cityList = require('./city.list.json')

const getCityDetailsByName = name => cityList.find(city => city.name.toLowerCase() === name.toLowerCase())

const pad = s => (s < 10) ? '0' + s : s

const convertDate = date => {
  let d = new Date(date)
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

const getForecast = cityId => {
  return new Promise((resolve, reject) => {
    http.get(`http://api.openweathermap.org/data/2.5/forecast/daily?id=${cityId}&units=metric&APPID=${config.weather.API_KEY}&lang=${config.weather.lang}`, function (res) {
      const statusCode = res.statusCode
      const contentType = res.headers['content-type']

      if (statusCode !== 200) {
        console.log('erreur pas 200')
      } else if (!/^application\/json/.test(contentType)) {
        console.log(`error content-type is ${contentType}`)
      } else {
        console.log('ok')
      }

      let rawData = ''
      res.on('data', data => {
        rawData += data
      })
      res.on('end', () => {
        let parsedData
        parsedData = JSON.parse(rawData)
        let resultat = []
        for (var i = 1; i <= 5; i++) {
          resultat.push(
            {
              date: convertDate(parsedData.list[i].dt * 1000),
              temperatureMin: parsedData.list[i].temp.min,
              temperatureMax: parsedData.list[i].temp.max,
              description: parsedData.list[i].weather[0].description
            }
          )
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
    if (message.content.length > 0) {
      let ville = getCityDetailsByName(message.content)

      if (ville) {
        getForecast(ville.id).then(function (res) {
          let msgToSend = `Prévision sur 5 jours à ${ville.name},${ville.country} :\n`
          res.forEach(function (e) {
            msgToSend += `${e.date} ${e.description} ${Math.round(e.temperatureMin)}°C/${Math.round(e.temperatureMax)}°C\n`
          })
          message.reply(msgToSend)
        }).catch((error) => {
          console.log(error.message)
        })
      } else {
        message.reply(message.content + ' n\'est pas une ville reconnue')
      }
    } else {
      message.reply('il faut que tu entres le nom d\'une ville reconnue.')
    }
  }
}
