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

module.exports = class SpotifyArtist extends Command {
  static match (message) {
    return message.content.startsWith('!spotifyArtist')
  }

  static action (message) {
    spotifyApi.searchArtists(message.content).then(function (data) {
      console.log(data.body.artists.items[0])
      if (data.body.artists.items[0] === undefined) {
        message.reply("Votre recherche n'a pas aboutie, veuillez rééssayer.")
      } else {
        for (let i = 0; i < data.body.artists.items.length && i < 3; i++) {
          message.reply('Artiste numéro ' + [i + 1] + ' : ' + data.body.artists.items[i].name)
        }
      }
    }, function (err) {
      console.error(err)
    })
  }
}
