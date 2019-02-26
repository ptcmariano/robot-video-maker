
class Orchestrator {
    constructor() {
        this.prefixes = ['Who is', 'What is', 'The history of']
    }
    returnSearchTerm(term) {
        return term.trim()
    }
    returnPrefixByIndex(index) {
        return this.prefixes[index]
    }
}

module.exports = Orchestrator