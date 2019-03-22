const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey

class TextRobot {
    constructor(term) {
        this.term = term
    }
    getSearchTerm() {
        return this.term
    }
    async fetchContentFromWikipedia() {
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponse = await wikipediaAlgorithm.pipe(this.term)
        const wikipediaContent = wikipediaResponse.get()

        return wikipediaContent.content
    }
    sanitizeContent(sourceContentOriginal) {
        const allLines = sourceContentOriginal.split('\n')

        let withoutBlankLinesAndMarkdown = allLines.filter((line) => {
            if (line.trim().length === 0 || line.trim().startsWith('=')) {
              return false
            }
    
            return true
        })

        withoutBlankLinesAndMarkdown = withoutBlankLinesAndMarkdown.join(' ')
        let sanitizeContent = withoutBlankLinesAndMarkdown.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
        return sanitizeContent
    }
}

module.exports = TextRobot