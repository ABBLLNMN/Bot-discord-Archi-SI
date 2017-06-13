const Command = require('../command')
const YouTube = require('youtube-node')
var youTube = new YouTube()
youTube.setKey('AIzaSyA2HOeK8fbmyYJ2J32EbqZB0I_3EDK6Qr4')

module.exports = class Youtube extends Command {
  static match (message) {
    return message.content.startsWith('!youtubePlaylist')
  }

  static action (message) {
    youTube.search(message.content, 50, function (error, result) {
      if (error) {
        console.log(error)
      } else if (result.items[0] === undefined || message.content === ' ' || message.content === '') {
        message.channel.send("Votre recherche n'a pas abouti, veuillez rééssayer.")
      } else {
        var k
        var compteur
        compteur = 0
        var tab = []

        for (k = 0; k < 51; k++) {
          if (result.items[k] !== undefined || message.content === ' ' || message.content === '') {
            if (result.items[k].id.kind === 'youtube#playlist') {
              console.log(JSON.stringify(result))
              tab.splice(compteur, 0, k)
              compteur += 1
            }
          }
        }
        console.log(compteur)
        console.log(tab)
        if (compteur === 0) {
          message.channel.send("Votre recherche n'a pas abouti, veuillez rééssayer.")
        }
        if (compteur === 1) {
          for (k = 0; k < 1; k++) {
            if (result.items[tab[k]].id.kind === 'youtube#playlist') {
              message.channel.send('https://www.youtube.com/playlist?list=' + result.items[tab[k]].id.playlistId)
            }
          }
        }
        if (compteur === 2) {
          for (k = 0; k < 2; k++) {
            if (result.items[tab[k]].id.kind === 'youtube#playlist') {
              message.channel.send('https://www.youtube.com/playlist?list=' + result.items[tab[k]].id.playlistId)
            }
          }
        }
        if (compteur > 2) {
          for (k = 0; k < 3; k++) {
            if (result.items[tab[k]].id.kind === 'youtube#playlist') {
              message.channel.send('https://www.youtube.com/playlist?list=' + result.items[tab[k]].id.playlistId)
            }
          }
        }
      }
    })
  }
}
