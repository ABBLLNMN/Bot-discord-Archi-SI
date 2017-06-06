const Command = require('./command')

module.exports = class Ping extends Command {
  static match (message) {
    console.log('checking  ping')
    return message.content.startsWith('!ping')
  }

  static action (message) {
    message.reply('pong')
  }
}
