const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')

class TextRobot {
    constructor(term, nlu) {
        this.term = term
        this.nlu = nlu
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
    breakContentIntoSentences(content) {
        content.sentences = []
    
        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence) => {
          content.sentences.push({
            text: sentence,
            keywords: [],
            images: []
          })
        })
    }
    limitMaximumSentences(content) {
        content.sentences = content.sentences.slice(0, content.maximumSentences)
    }

    async fetchKeywordsOfAllSentences(content) {
        for (const sentence of content.sentences) {
            sentence.keywords = await this.fetchWatsonAndReturnKeywords(sentence.text)
        }
    }
    
    async fetchWatsonAndReturnKeywords(sentence) {
        return new Promise((resolve, reject) => {
            this.nlu.analyze({
                text: sentence,
                features: {
                    keywords: {}
                }
            }, (error, response) => {
                if (error) {
                    console.log('watson key', watsonApiKey)
                    throw error
                }
                const keywords = response.keywords.map((keyword) => {
                    return keyword.text
                })
                resolve(keywords)
            })
        })
    }
}

module.exports = TextRobot