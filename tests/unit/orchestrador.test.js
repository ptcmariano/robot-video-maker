const Orchestrator = require('../../src/orchestrator')

test('call Orchestrator pass a word should be return same string', () => {
  expect(new Orchestrator().returnSearchTerm("foo")).toBe("foo");
})

test('call Orchestrator pass a word with space should be return string trimed', () => {
  expect(new Orchestrator().returnSearchTerm("foo ")).toBe("foo");
})