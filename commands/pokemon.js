const Command = require('./command')
const bot = require('../bot.js')
var Pokedex = require('pokedex-promise-v2')
var P = new Pokedex()

let pokemonId
let pokemonName
let pokemontype
let pokemonSprite
let evoChain

// fonction modifiant le nom et l'avatar du bot
const setPokemonOnBot = (message) => {
  P.getPokemonByName(message.content)
    .then(function (pokemon) {
      pokemonId = pokemon.id
      pokemonName = pokemon.name
      pokemonSprite = pokemon.sprites.front_default
      pokemontype = ''
      pokemon.types.forEach(function (e) {
        pokemontype += e.type.name + ' '
      })

      new Promise((resolve) => {
        bot.setBotUsername(pokemonName).then(() => {
          console.log('Username changed')
          bot.setBotAvatar(pokemonSprite).then(() => {
            console.log('Avatar changed')
            resolve()
          }).catch(function (error) {
            console.log('avatar error: ', error)
            message.channel.send('Je ne peux pas changer mon avatar.')
          })
        }).catch(function (error) {
          console.log('avatar error: ', error)
          message.channel.send('La modification du bot dans Discord est limitée à 2 requêtes toutes les heures')
        })
      }).then(() => {
        message.channel.send(
          'Hello, ' + 'my name is ' + pokemonName + ' and I\'m pokemon number ' + pokemonId +
          '! I\'m a ' + pokemontype + 'pokemon. I am ' + pokemon.height / 10 + 'm  tall, and I weight ' + pokemon.weight / 10 + ' kg!'
        )
      }).catch(function (error) {
        console.log('Promise error: ', error)
        message.channel.send('Désolé une erreur s\'est produite.')
      })
    }).catch((error) => {
      console.log('There was an ERROR: ', error)
      message.channel.send(`${message.content} n'est pas un pokemon reconnu.`)
    })
}

module.exports = class Ping extends Command {
  static match (message) {
    console.log('checking  pokemon')
    return message.content.startsWith('!pokemon')
  }

  static action (message) {
    message.content = message.content.toLowerCase()

    if (message.content === 'evolve') {
      console.log('is evolve')
      let botName = pokemonName || bot.getBotUsername()
      P.getPokemonSpeciesByName(botName)
        .then(function (species) {
          console.log('species')
          // To get evolution chain ID
          evoChain = species.evolution_chain.url
          let str = evoChain.substr(0, evoChain.length - 1)
          let evoChainNumber = str.substr(str.lastIndexOf('/') + 1)

          P.getEvolutionChainById(evoChainNumber)
            .then(function (evo) {
              console.log('chain')
              let evoData = evo.chain
              do {
                if (evoData.species.name === botName) {
                  if (evoData.evolves_to.length === 0) {
                    message.channel.send('Je ne peux plus évoluer.')
                    break
                  } else {
                    message.content = evoData.evolves_to[0].species.name
                    setPokemonOnBot(message)
                    break
                  }
                }
                evoData = evoData['evolves_to'][0]
              } while (evoData.hasOwnProperty('evolves_to'))
            })
            .catch(function (error) {
              console.log('There was an ERROR: ', error)
              message.channel.send('Désolé, une erreur est survenue.')
            })
        })
        .catch(function (error) {
          console.log('There was an ERROR: ', error)
          message.channel.send(`Je ne suis pas un pokemon pouvant évoluer.`)
        })
    } else {
      if (message.content.length > 0) {
        setPokemonOnBot(message)
      } else {
        message.channel.send('Veuillez entrer un pokemon.')
      }
    }
  }
}
