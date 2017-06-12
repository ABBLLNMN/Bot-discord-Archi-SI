const Command = require('./command')
const config = require('../config')
const translate = require('@google-cloud/translate')({
  key: config.translate.KEY
})

let content, languedemandee, atraduire
let languageList
translate.getLanguages().then((data) => {
  languageList = data[0]
})

module.exports = class Translate extends Command {
  static match (message) {
    return message.content.startsWith('!translate')
  }

  static action (message) {
    content = message.content.split(' ')
    if (content.length > 1) {
      languedemandee = content[0].toLowerCase()
      console.log(languageList.find((langue) => langue.code === languedemandee))

      // detection de la langue
      if (languageList.find((langue) => langue.code === languedemandee) === undefined) {
        message.channel.send('Veuillez entrer une langue valide.')
      } else {
        content.shift()
        atraduire = content.join(' ')
        translate.detect(atraduire)
      .then((results) => {
        let detections = results[0]
        detections = Array.isArray(detections) ? detections : [detections]
        detections.forEach((detection) => {
          message.channel.send('Langue de départ : ' + detection.language)
        })
      })
      .catch((err) => {
        console.log('ERROR', err)
      })

      // traduction dans la langue choisie
        translate.translate(atraduire, languedemandee).then((results) => {
          let translations = results[0]
          translations = Array.isArray(translations) ? translations : [translations]
          translations.forEach((translation) => {
            message.channel.send('La traduction : ' + translation)
          })
        })
    .catch((err) => {
      message.channel.send('ERROR', err)
    })
      }
    } else {
      message.channel.send('Veuillez rajouter un texte à traduire.\nExemple: !translate fr Hello world')
    }
  }
}
