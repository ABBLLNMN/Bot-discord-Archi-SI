const Command = require('../command')
const YouTube = require('youtube-node')
var youTube = new YouTube()
youTube.setKey('AIzaSyA2HOeK8fbmyYJ2J32EbqZB0I_3EDK6Qr4')

module.exports = class Youtube extends Command {
  static match (message) {
    return message.content.startsWith('!youtubeUser')
  }

  static action (message) {
    youTube.search(message, 3, function (error, result) {
      if (error) {
        console.log(error)
      } else {
        // Pour afficher les données en JSON dans la console
        console.log(JSON.stringify(result))
        // Pour afficher l'élément Javascript dans la console
        // console.log(result.items[0].snippet.title)
        message.channel.sendMessage('RESULTAT 01 : type : ' + result.items[0].id.kind + ', titre : ' + result.items[0].snippet.title + ', description : ' + result.items[0].snippet.description)
        message.channel.sendMessage('RESULTAT 02 : type : ' + result.items[1].id.kind + ', titre : ' + result.items[1].snippet.title + ', description : ' + result.items[1].snippet.description)
        message.channel.sendMessage('RESULTAT 03 : type : ' + result.items[2].id.kind + ', titre : ' + result.items[2].snippet.title + ', description : ' + result.items[2].snippet.description)
      }
    })
  }
}
