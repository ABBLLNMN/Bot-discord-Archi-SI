const Command = require('./command')
const config = require('../config')
const Twitter = require('twitter')

let clientTwitter = new Twitter({
  consumer_key: config.twitter.CONSUMER_KEY,
  consumer_secret: config.twitter.CONSUMER_SECRET,
  access_token_key: config.twitter.ACCESS_TOKEN_KEY,
  access_token_secret: config.twitter.ACCESS_TOKEN_SECRET
})

const sendTweet = message => {
  return new Promise(function (resolve, reject) {
    clientTwitter.post('statuses/update', { status: message }, function (error, tweet, response) {
      if (!error) {
        resolve(tweet)
      } else {
        reject(error)
      }
    })
  })
}

module.exports = class Twitter extends Command {
  static match (message) {
    console.log('checking twitter')
    return message.content.startsWith('!tweet')
  }

  static action (message) {
    if (message.length > 140) {
      message.channel.send('Envoi impossible : le tweet fait ' + message.length + ' caractères (max : 140)')
    } else {
      sendTweet(message).then(function (tweet) {
        console.log(tweet)
        let link = 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str
        message.channel.send(link)
      })
    }
  }
}
