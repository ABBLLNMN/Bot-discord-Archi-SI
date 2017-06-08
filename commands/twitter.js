const Command = require('./command')
const config = require('../config')
const bot = require('../bot')
const Twitter = require('twitter')

let clientTwitter = new Twitter({
  consumer_key: config.twitter.CONSUMER_KEY,
  consumer_secret: config.twitter.CONSUMER_SECRET,
  access_token_key: config.twitter.ACCESS_TOKEN_KEY,
  access_token_secret: config.twitter.ACCESS_TOKEN_SECRET
})

const sendTweet = txtTweet => {
  return new Promise(function (resolve, reject) {
    clientTwitter.post('statuses/update', { status: txtTweet }, function (error, tweet, response) {
      if (!error) {
        resolve(tweet)
      } else {
        reject(error)
      }
    })
  })
}

clientTwitter.stream('statuses/filter', { track: 'ablm_isep' }, function (stream) {
  stream.on('data', function (tweet) {
    console.log(tweet)
    let link = 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str
    bot.sendMessageToChannel(link)
  })

  stream.on('error', function (error) {
    console.log(error)
  })
})

module.exports = class Twitter extends Command {
  static match (message) {
    console.log('checking twitter')
    return message.content.startsWith('!tweet')
  }

  static action (message) {
    console.log(message.content.length)
    if (message.content.length > 140 || message.content.length < 1) {
      message.channel.send('Envoi impossible : le tweet fait ' + message.content.length + ' caractères (max : 140)')
    } else {
      sendTweet(message.content).then(function (tweet) {
        console.log(tweet)
        let link = 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str
        message.channel.send(link)
      })
    }
  }
}
