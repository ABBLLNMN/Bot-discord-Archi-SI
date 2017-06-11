const Command = require('./command')
const Trad = require('@google-cloud/translate')({
  key: 'AIzaSyCO0UTJvR2C3n6IiCioCiPJWJAuOEak18c'
})

module.exports = class Translate extends Command {
  static match (message) {
    return message.content.startsWith('translate')
  }

  static action (message) {
    // detection de la langue
    if (message.content.charAt(2) !== ' ' || message.content.charAt(1) === ' ') {
      message.reply('Veuillez entrer une langue valide.')
    } else {
      const translate = Trad
      var retour = message.content.substring(0)
      translate.detect(retour)
      .then((results) => {
        let detections = results[0]
        detections = Array.isArray(detections) ? detections : [detections]
        detections.forEach((detection) => {
          message.reply('Langue de départ : ' + detection.language)
        })
      })
      .catch((err) => {
        console.log('ERROR', err)
      })
      // traduction dans la langue choisie
      var languedemandee = message.content.charAt(0) + message.content.charAt(1)
      var atraduire = message.content.substring(3)
      translate.translate(atraduire, languedemandee).then((results) => {
        let translations = results[0]
        translations = Array.isArray(translations) ? translations : [translations]
        translations.forEach((translation) => {
          message.reply('La traduction : ' + translation)
        })
      })
    .catch((err) => {
      message.reply('ERROR', err)
    })
    }
  }
  }
