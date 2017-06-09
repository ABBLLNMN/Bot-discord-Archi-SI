const Command = require('../command')
// const config = require('../config')
const SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
  clientId: 'b8d54c468f924d0cb33ec784de752001',
  clientSecret: '63a6d1b09d71428ab6629234a9d09839'
})

spotifyApi.clientCredentialsGrant()
  .then(function (data) {
    console.log('The access token expires in ' + data.body['expires_in'])
    console.log('The access token is ' + data.body['access_token'])

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token'])
  }, function (err) {
    console.log('Something went wrong when retrieving an access token', err.message)
  })

module.exports = class SpotifyAll extends Command {
  static match (message) {
    return message.content.startsWith('!spotifyAll')
  }

  static action (message) {
    spotifyApi.searchTracks(message.content).then(function (data) {
      console.log(data.body.tracks.items[0])
      for (let i = 0; i < data.body.tracks.items.length && i < 3; i++) {
        if (data.body.tracks.items.length === 0) {
          message.reply("Il n'y a pas de résultat pour votre recherche.")
          break
        } else {
          message.reply("L'artiste numéro " + [i + 1] + ' est ' + data.body.tracks.items[i].artists[0].name + ", dont l'album est : " + data.body.tracks.items[i].album.name + ', et la chanson : ' + data.body.tracks.items[i].name)
        }
      }
    }, function (err) {
      console.error(err)
    })
  }
}
