const Command = require('../command')
const SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
  clientId: 'b8d54c468f924d0cb33ec784de752001',
  clientSecret: '63a6d1b09d71428ab6629234a9d09839'
})

spotifyApi.clientCredentialsGrant()
  .then(function (data) {
    console.log('The access token expires in ' + data.body['expires_in'])
    console.log('The access token is ' + data.body['access_token'])

    spotifyApi.setAccessToken(data.body['access_token'])
  }, function (err) {
    console.log('Something went wrong when retrieving an access token', err.message)
  })

module.exports = class SpotifTrack extends Command {
  static match (message) {
    return message.content.startsWith('!spotifySong')
  }

  static action (message) {
    spotifyApi.searchTracks('track:' + message.content).then(function (data) {
      if (data.body.tracks.items[0] === undefined) {
        message.reply("Votre recherche n'a pas aboutie, veuillez rééssayer.")
      } else {
        for (let i = 0; i < data.body.tracks.items.length && i < 3; i++) {
          message.reply('Chanson numéro ' + [i + 1] + ' : ' + data.body.tracks.items[i].name)
        }
      }
    }, function (err) {
      console.error(err)
    })
  }
}
