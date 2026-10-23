import { readFileSync, writeFileSync } from 'node:fs'

// React must identify this stylesheet as a resource, not the first <style> in
// <head>: browsers/extensions can insert their own styles before hydration.
// Keep this narrow and fail on upstream changes instead of silently skipping it.
const target = new URL(
  '../node_modules/@payloadcms/next/dist/layouts/Root/index.js',
  import.meta.url,
)
const before =
  'children: /*#__PURE__*/_jsx("style", {\n        children: `@layer payload-default, payload;`'
const after =
  'children: /*#__PURE__*/_jsx("style", {\n        href: "payload-layer-order",\n        precedence: "payload-layer-order",\n        children: `@layer payload-default, payload;`'
const source = readFileSync(target, 'utf8').replaceAll('\r\n', '\n')
if (source.includes(after)) {
  console.log('Payload stylesheet hydration fix already applied.')
} else if (source.includes(before)) {
  writeFileSync(target, source.replace(before, after))
  console.log('Applied Payload stylesheet hydration fix.')
} else {
  throw new Error(
    'Payload RootLayout changed. Review scripts/patch-payload-style.mjs before updating the dependency.',
  )
}
