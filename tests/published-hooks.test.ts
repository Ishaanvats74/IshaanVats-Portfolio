import assert from 'node:assert/strict'
import test from 'node:test'
import { publishedHooks } from '../src/cms/published-hooks'

test('opening Create New and autosaving drafts never invalidate during render', async () => {
  const hook = publishedHooks(() => { throw new Error('Cannot revalidate during render') }).afterChange[0]
  for (const previousDoc of [{}, { _status: 'draft' }]) {
    const doc = { id: 1, _status: 'draft' }
    assert.equal(await hook({ doc, previousDoc } as Parameters<typeof hook>[0]), doc)
  }
})

test('publishing, published edits, unpublishing and deleting invalidate public content', async () => {
  let calls = 0
  const hooks = publishedHooks(() => { calls++ })
  const change = hooks.afterChange[0]
  for (const [before, after] of [
    ['draft', 'published'], ['published', 'published'], ['published', 'draft'],
  ]) {
    const doc = { id: 1, _status: after }
    assert.equal(await change({ doc, previousDoc: { _status: before } } as Parameters<typeof change>[0]), doc)
  }
  const remove = hooks.afterDelete[0]
  for (const status of ['draft', 'published']) {
    const doc = { id: 1, _status: status }
    assert.equal(await remove({ doc } as Parameters<typeof remove>[0]), doc)
  }
  assert.equal(calls, 5)
})
