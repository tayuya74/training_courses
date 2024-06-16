const { json } = require('body-parser')
const requestPromise = require('request-promise')

module.exports = async function(city = '') {
  if (!city) {
    throw  new Error('Имя города не можеть быть пустым')
  }

  const key = '8c9167a4812811a0dffa8aad79a61b77'
  const uri = 'http://api.openweathermap.org/data/2.5/weather'
  
  const options = {
  uri,
  qs: {
    appid: key,
    q: city, 
    units: 'imperial'
  }, 
  json: true
  }

   try {
     const response = await requestPromise(options)
     const celsius = (response.main.temp - 32)* 5/9

    return { 
      weather: `${response.name}: ${celsius.toFixed(0)}`,
      error: null
    }
   } catch (error) {
    return {
      weather: null,
      error: error.error.message
    }
  }
}