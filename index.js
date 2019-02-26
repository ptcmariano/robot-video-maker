const Orchestrator = require('./src/orchestrator')
const readline = require('readline-sync')

function start() {
  let content = {}
  const objOrchestrator = new Orchestrator()

  let term = readline.question("Type a Wikipedia search term: ")
  content.searchTerm = objOrchestrator.returnSearchTerm(term)

  let index = readline.keyInSelect(objOrchestrator.prefixes, 'Choose one option: ')
  content.prefix = objOrchestrator.returnPrefixByIndex(index)

  console.log(content)
}

start()