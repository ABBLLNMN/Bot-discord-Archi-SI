const Command = require('../command')
const YouTube = require('youtube-node')
var youTube = new YouTube()
youTube.setKey('AIzaSyA2HOeK8fbmyYJ2J32EbqZB0I_3EDK6Qr4')

module.exports = class Youtube extends Command {
  static match (message) {
    return message.content.startsWith('!youtubeAll')
  }

  static action (message) {
    console.log(message.content)
    youTube.search(message.content, 3, function (error, result) {
      if (error) {
        console.log(error)
      } else if (result.items[0] === undefined || message.content === ' ' || message.content === '') {
        message.channel.sendMessage("Votre recherche n'a pas abouti, veuillez rééssayer.")
      } else {
        // Pour afficher les données en JSON dans la console
        console.log(JSON.stringify(result))
        // Pour afficher l'élément Javascript dans la console
        // console.log(result.items[0].snippet.title)
        message.channel.sendMessage('RESULTAT 01 : type : ' + result.items[0].id.kind + ', titre : ' + result.items[0].snippet.title)
        message.channel.sendMessage('RESULTAT 02 : type : ' + result.items[1].id.kind + ', titre : ' + result.items[1].snippet.title)
        message.channel.sendMessage('RESULTAT 03 : type : ' + result.items[2].id.kind + ', titre : ' + result.items[2].snippet.title)
      }
    })
  }
}
