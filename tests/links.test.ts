import { test } from 'node:test'
import assert from 'node:assert/strict'
import { projectLinks, safeURL } from '../src/lib/links'

test('project buttons follow the four required URL combinations', () => {
  assert.deepEqual(projectLinks({}), [])
  assert.deepEqual(projectLinks({ liveURL: 'https://demo.example' }), [{ label: 'View Live Project', href: 'https://demo.example' }])
  assert.deepEqual(projectLinks({ githubURL: 'https://github.com/example/repo' }), [{ label: 'View on GitHub', href: 'https://github.com/example/repo' }])
  assert.deepEqual(projectLinks({ liveURL: 'https://demo.example', githubURL: 'https://github.com/example/repo' }).map(link => link.label), ['View Live Project', 'GitHub Repository'])
})
test('external links reject executable schemes and malformed URLs', () => {
  for (const value of ['javascript:alert(1)', 'data:text/html,test', '/relative', 'invalid']) assert.equal(safeURL(value), undefined)
  assert.equal(safeURL('https://github.com/Ishaanvats74'), 'https://github.com/Ishaanvats74')
})
