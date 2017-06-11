const Command = require('./command')
const Trad = require('@google-cloud/translate')({
  key: 'AIzaSyCO0UTJvR2C3n6IiCioCiPJWJAuOEak18c'
})

module.exports = class Translate extends Command {
  static match (message) {
    console.log('checking googleTrad')
    return message.content.startsWith('!translate')
  }

  static action (message) {
    const translate = Trad
    translate.detect(message.content)
      .then((results) => {
        let detections = results[0]
        detections = Array.isArray(detections) ? detections : [detections]
        detections.forEach((detection) => {
          message.reply('Langue : ' + detection.language)
        })
      })
      .catch((err) => {
        console.log('ERROR', err)
      })
    translate.translate(message.content, 'en').then((results) => {
      let translations = results[0]
      translations = Array.isArray(translations) ? translations : [translations]
      translations.forEach((translation) => {
        message.reply('Traduction : ' + (message.content + ' -> ' + translation))
      })
    })
    .catch((err) => {
      console.log('ERROR', err)
    })
  }


}
