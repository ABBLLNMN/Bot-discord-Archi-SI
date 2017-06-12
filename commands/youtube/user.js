const Command = require('../command')
const YouTube = require('youtube-node')
var youTube = new YouTube()
youTube.setKey('AIzaSyA2HOeK8fbmyYJ2J32EbqZB0I_3EDK6Qr4')

module.exports = class Youtube extends Command {
  static match (message) {
    return message.content.startsWith('!youtubeUser')
  }

  static action (message) {
    youTube.search(message.content, 50, function (error, result) {
      if (error) {
        console.log(error)
      } else if (result.items[0] === undefined) {
        message.reply("Votre recherche n'a pas abouti, veuillez rééssayer.")
      } else {
        var k
        var compteur
        compteur = 0
        var tab = []

        for (k = 0; k < 51; k++) {
          if (result.items[k] !== undefined) {
            if (result.items[k].id.kind === 'youtube#channel') {
              tab.splice(compteur, 0, k)
              compteur += 1
            }
          }
        }
        console.log(compteur)
        console.log(tab)
        var numero
        numero = 0
        if (compteur === 1) {
          for (k = 0; k < 1; k++) {
            if (result.items[tab[k]].id.kind === 'youtube#channel') {
              numero += 1
              message.channel.sendMessage('Résultat n°' + numero + ' correspondant à votre recherche User est de type : ' + result.items[tab[k]].id.kind + ', et a pour titre : ' + result.items[tab[k]].snippet.title)
            }
          }
        }
        if (compteur === 2) {
          for (k = 0; k < 2; k++) {
            if (result.items[tab[k]].id.kind === 'youtube#channel') {
              numero += 1
              message.channel.sendMessage('Résultat n°' + numero + ' correspondant à votre recherche User est de type : ' + result.items[tab[k]].id.kind + ', et a pour titre : ' + result.items[tab[k]].snippet.title)
            }
          }
        }
        if (compteur > 2) {
          for (k = 0; k < 3; k++) {
            if (result.items[tab[k]].id.kind === 'youtube#channel') {
              numero += 1
              message.channel.sendMessage('Résultat n°' + numero + ' correspondant à votre recherche User est de type : ' + result.items[tab[k]].id.kind + ', et a pour titre : ' + result.items[tab[k]].snippet.title)
            }
          }
        }
      }
    })
  }
}
