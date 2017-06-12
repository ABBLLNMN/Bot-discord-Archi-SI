import test from 'ava'
const config = require('../config')
var client = require('node-rest-client-promise').Client()

test('weather test', t => {
  return client.getPromise(`http://api.openweathermap.org/data/2.5/weather?id=6455259&APPID=${config.weather.API_KEY}&lang=${config.weather.lang}`)
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})

test('forecast test', t => {
  return client.getPromise(`http://api.openweathermap.org/data/2.5/forecast/daily?id=6455259&APPID=${config.weather.API_KEY}&lang=${config.weather.lang}`)
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})

test('pokemon test', t => {
  return client.getPromise(`http://pokeapi.co/api/v2/pokemon/1/`)
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})

test('pokemon-species test', t => {
  return client.getPromise(`http://pokeapi.co/api/v2/pokemon-species/1/`)
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})

test('evolution-chain test', t => {
  return client.getPromise(`http://pokeapi.co/api/v2/evolution-chain/1/`)
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})
