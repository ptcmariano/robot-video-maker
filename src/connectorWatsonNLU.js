const watsonApiKey = require('./credentials/watson-nlu.json').apiKey
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
 
const nlu = new NaturalLanguageUnderstandingV1({
  iam_apikey: watsonApiKey,
  version: '2018-04-05',
  url: 'https://gateway-wdc.watsonplatform.net/natural-language-understanding/api'
})

module.exports = nlu