module.exports = {
  sendMessageToChannel: function (params) {
    channel.send(params)
  },

  setBotUsername: (username) => client.user.setUsername(username),

  getBotUsername: () => client.user.username,

  setBotAvatar: (path) => client.user.setAvatar(path)
}

const Discord = require('discord.js')
const config = require('./config.js')
const Pokemon = require('./commands/pokemon')
const Twitter = require('./commands/twitter')
const Weather = require('./commands/weather')
const Forecast = require('./commands/forecast')
const Artist = require('./commands/spotify/artist')
const Album = require('./commands/spotify/album')
const SpotifyAll = require('./commands/spotify/all')
const Tracks = require('./commands/spotify/tracks')
const Ping = require('./commands/ping')
const Translate = require('./commands/translate')
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
  Twitter.parse(msg) ||
  Artist.parse(msg) ||
  Album.parse(msg) ||
  SpotifyAll.parse(msg) ||
  Tracks.parse(msg) ||
  Translate.parse(msg) ||
  Pokemon.parse(msg)
})

client.login(config.token)

const Discord = require('discord.js')
const config = require('./config.js')
const Twitter = require('./commands/twitter')
const Weather = require('./commands/weather')
const Forecast = require('./commands/forecast')
const Artist = require('./commands/spotify/artist')
const Album = require('./commands/spotify/album')
const SpotifyAll = require('./commands/spotify/all')
const Tracks = require('./commands/spotify/tracks')
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
  Twitter.parse(msg) ||
  Artist.parse(msg) ||
  Album.parse(msg) ||
  SpotifyAll.parse(msg) ||
  Tracks.parse(msg)
})

client.login(config.token)
