const TextRobot = require('../../src/robots/text')

test('call TextRobot with parameter search term', () => {
  expect(new TextRobot("Mahatma Gandhi").getSearchTerm()).toBe("Mahatma Gandhi");
})

// test('call TextRobot the method of fetch wikipedia content', async () => {
//   const textRobot = new TextRobot("Mahatma Gandhi")
//   let contentwikipedia = await textRobot.fetchContentFromWikipedia()
//   console.log('wikia content', contentwikipedia)
//   expect("incomplete").toBe("Mahatma Gandhi")
// })

// test('TextRobot sanitize wikipedia content', async () => {
//   const textRobot = new TextRobot("Mahatma Gandhi")
//   let contentwikipedia = await textRobot.fetchContentFromWikipedia()
//   contentwikipedia = textRobot.sanitizeContent(contentwikipedia)
//   console.log('wikia content', contentwikipedia)
//   expect("incomplete").toBe("Mahatma Gandhi")
// })