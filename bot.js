module.exports = {
  sendMessageToChannel: function (params) {
    channel.send(params)
  }
}

const Discord = require('discord.js')
const config = require('./config.js')
const Twitter = require('./commands/twitter')
const Weather = require('./commands/weather')
const Forecast = require('./commands/forecast')
const Ping = require('./commands/ping')
const client = new Discord.Client()
let channel

client.on('ready', () => {
  channel = client.channels.find('id', config.channel)
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.send("It's me... ")
    msg.channel.send("I was wondering if after all these years you d'like to see me...")
  }

  // Liste des commandes
  Weather.parse(msg) ||
  Forecast.parse(msg) ||
  Ping.parse(msg) ||
  Twitter.parse(msg)
})

client.login(config.token)
