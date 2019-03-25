const Orchestrator = require('./src/orchestrator')
const readline = require('readline-sync')
const TextRobot = require('./src/robots/text')
const nlu = require('./src/connectorWatsonNLU')

async function start() {
  let content = {
    maximumSentences: 6
  }
  const objOrchestrator = new Orchestrator()

  let term = readline.question("Type a Wikipedia search term: ")
  content.searchTerm = objOrchestrator.returnSearchTerm(term)

  let index = readline.keyInSelect(objOrchestrator.prefixes, 'Choose one option: ')
  content.prefix = objOrchestrator.returnPrefixByIndex(index)

  const textRobot = new TextRobot(content.searchTerm, nlu)
  content.sourceContentOriginal = await textRobot.fetchContentFromWikipedia()
  content.sourceContentSanitized = textRobot.sanitizeContent(content.sourceContentOriginal)
  textRobot.breakContentIntoSentences(content)
  textRobot.limitMaximumSentences(content)
  await textRobot.fetchKeywordsOfAllSentences(content)

  console.log(content)
}

start()