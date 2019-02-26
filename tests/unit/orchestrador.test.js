const Orchestrator = require('../../src/orchestrator')

test('call Orchestrator pass a word should be return same string', () => {
  expect(new Orchestrator().returnSearchTerm("foo")).toBe("foo");
})

test('call Orchestrator pass a word with space should be return string trimed', () => {
  expect(new Orchestrator().returnSearchTerm("foo ")).toBe("foo");
})

test('call Orchestrator pass index 0 should be return prefix Who is', () => {
  expect(new Orchestrator().returnPrefixByIndex(0)).toBe("Who is");
})

test('call Orchestrator pass index 2 should be return prefix The history of', () => {
  expect(new Orchestrator().returnPrefixByIndex(2)).toBe("The history of");
})