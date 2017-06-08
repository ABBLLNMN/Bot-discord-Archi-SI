
// Recherche tout

module.exports = class SpotifyAll extends Command {
  static match (message) {
    return message.content.startsWith('!spotifyAll')
  }

  static action (message) {
    spotifyApi.searchTracks(message.content).then(function (data) {
      for (let i = 0; i < 3; i++) {
        if (data.body.tracks.items.length === 0) {
          message.reply("Il n'y a pas de résultat pour votre recherche.")
          break
        } else {
          message.reply("L'artiste numéro " + [i + 1] + ' est ' + data.body.tracks.items[i].artists[i].name + ", dont l'album est : " + data.body.tracks.items[i].album.name + ', et la chanson : ' + data.body.tracks.items[i].name)
        }
      }
    }, function (err) {
      console.error(err)
    })
  }
}

// Recherche de la chanson

/** 
module.exports = class SpotifTrack extends Command {
  static match (message) {
    console.log('checking spotify')
    return message.content.startsWith('!spotifyTrack')
  }

  static action (message) {
    spotifyApi.searchTracks('Track:' + message.content).then(function (data) {
      for (let i = 0; i < 3; i++) {
        if (data.body.tracks.items.length === 0) {
          message.reply("Il n'y a pas de résultat pour votre recherche.")
          break
        } else {
          message.reply('Chanson numéro ' + [i + 1] + ' : ' + data.body.tracks.items[i].name)
        }
      }
    }, function (err) {
      console.error(err)
    })
  }
}

// Recherche de l'album

module.exports = class SpotifyAlbum extends Command {
  static match (message) {
    console.log('checking spotify')
    return message.content.startsWith('!spotifyAlbum')
  }

  static action (message) {
    spotifyApi.searchTracks('Album:' + message.content).then(function (data) {
      for (let i = 0; i < 3; i++) {
        if (data.body.tracks.items.length === 0) {
          message.reply("Il n'y a pas de résultat pour votre recherche.")
          break
        } else {
          message.reply('Album numéro : ' + [i + 1] + data.body.tracks.items[i].name)
        }
      }
    }, function (err) {
      console.error(err)
    })
  }
}
*/