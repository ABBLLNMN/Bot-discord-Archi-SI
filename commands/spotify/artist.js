const Command = require('../command')
const config = require('../../config.js')
const SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
  clientId: config.spotify.clientId,
  clientSecret: config.spotify.clientSecret
})

spotifyApi.clientCredentialsGrant()
  .then(function (data) {
    spotifyApi.setAccessToken(data.body['access_token'])
  }, function (err) {
    console.log('Something went wrong when retrieving an access token', err.message)
  })

module.exports = class SpotifyArtist extends Command {
  static match (message) {
    return message.content.startsWith('!spotifyArtist')
  }

  static action (message) {
    if (message.content === ' ' || message.content === '') {
      message.channel.send("Votre recherche n'a pas abouti, veuillez rééssayer.")
    } else {
      spotifyApi.searchArtists(message.content).then(function (data) {
        if (data.body.artists.items[0] === undefined) {
          message.channel.send("Votre recherche n'a pas abouti, veuillez rééssayer.")
        } else {
          for (let i = 0; i < data.body.artists.items.length && i < 3; i++) {
            console.log(data.body.artists.items[i])
            message.channel.send(data.body.artists.items[i].external_urls.spotify)
          }
        }
      }, function (err) {
        console.error(err)
      })
    }
  }
}
