import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export function publishedHooks(refresh: () => void): {
  afterChange: CollectionAfterChangeHook[]
  afterDelete: CollectionAfterDeleteHook[]
} {
  return {
    afterChange: [({ doc, previousDoc }) => {
      // Payload creates an empty autosave draft while rendering Create New.
      // Only changes affecting public content should invalidate Next's cache.
      if (doc._status === 'published' || previousDoc?._status === 'published') refresh()
      return doc
    }],
    afterDelete: [({ doc }) => {
      // A draft can retain an earlier published version, so invalidate on deletion.
      refresh()
      return doc
    }],
  }
}
