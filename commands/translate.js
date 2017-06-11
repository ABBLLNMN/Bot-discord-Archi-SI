const Command = require('./command')
const config = require('../config')

var Trad = require('@google-cloud/translate')({
  key: 'AIzaSyBngKK7gcXWaJVV3SmCZ40UmxFWCljOQx8'
})

module.exports = class Translate extends Command {
  static match (message) {
    console.log('checking googleTrad')
    return message.content.startsWith('!translate')
  }

  static action (message) {

    // detection de la langue
    const translate = Trad
    translate.detect(message.content)
      .then((results) => {
        let detections = results[0]
        detections = Array.isArray(detections) ? detections : [detections]
        detections.forEach((detection) => {
          message.reply('Langue : ' + `${detection.language}`)
        })
      })
      .catch((err) => {
        console.log('ERROR', err)
      })
    // traduction
    translate.translate(message.content, 'en').then((results) => {
      let translations = results[0]
      translations = Array.isArray(translations) ? translations : [translations]
      message.reply('Traduction:')
      console.log('Traduction:')
      translations.forEach((translation) => {
        message.reply(`${message.content} => ${translation}`)
      })
    })
    .catch((err) => {
      console.log('ERROR', err)
    })
  }


}
