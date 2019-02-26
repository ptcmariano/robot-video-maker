const Orchestrator = require('./src/orchestrator')
const readline = require('readline-sync')

function start() {
  let content = {}
  const objOrchestrator = new Orchestrator()

  let term = readline.question("Type a Wikipedia search term: ")
  content.searchTerm = objOrchestrator.returnSearchTerm(term)

  console.log(content)
}

start()