import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { createElement, act } from 'react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { JSDOM } from 'jsdom'

test('Payload layer style survives an injected style before document hydration', async () => {
  // Exercise the actual style properties from the installed Payload RootLayout.
  const source = readFileSync(
    new URL(
      '../node_modules/@payloadcms/next/dist/layouts/Root/index.js',
      import.meta.url,
    ),
    'utf8',
  )
  const match = source.match(/_jsx\("style", (\{[^}]+\})\)/)
  assert.ok(
    match,
    'Payload RootLayout style changed; review the patch and fixture',
  )
  const styleProps = runInNewContext(`(${match[1]})`)
  assert.equal(styleProps.href, 'payload-layer-order')
  assert.equal(styleProps.children, '@layer payload-default, payload;')

  for (const patched of [false, true]) {
    const props = patched ? styleProps : { children: styleProps.children }
    const app = createElement(
      'html',
      { lang: 'en' },
      createElement('head', null, createElement('style', props)),
      createElement(
        'body',
        null,
        createElement(
          'button',
          {
            id: 'login',
            onClick: () => {
              clicks++
            },
          },
          'Log in',
        ),
      ),
    )
    const dom = new JSDOM(`<!doctype html>${renderToString(app)}`, {
      url: 'http://localhost/admin',
      pretendToBeVisual: true,
    })
    const previous = new Map<string, PropertyDescriptor | undefined>()
    for (const [key, value] of Object.entries({
      window: dom.window,
      document: dom.window.document,
      navigator: dom.window.navigator,
      IS_REACT_ACT_ENVIRONMENT: true,
    })) {
      previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key))
      Object.defineProperty(globalThis, key, {
        configurable: true,
        writable: true,
        value,
      })
    }
    const injected = dom.window.document.createElement('style')
    injected.textContent =
      'body {transition: opacity ease-in 0.2s;} body[unresolved] {opacity: 0; display: block;}'
    dom.window.document.head.prepend(injected)
    const originalButton = dom.window.document.getElementById('login')
    const errors: unknown[] = []
    let clicks = 0
    let root: ReturnType<typeof hydrateRoot> | undefined
    try {
      await act(async () => {
        root = hydrateRoot(dom.window.document, app, {
          onRecoverableError: (error) => errors.push(error),
        })
      })
      if (patched) {
        assert.equal(
          errors.length,
          0,
          'Patched document must hydrate without recovery',
        )
        assert.equal(
          dom.window.document.getElementById('login'),
          originalButton,
          'SSR content must be reused',
        )
        assert.equal(
          injected.isConnected,
          true,
          'Unrelated injected styles must be preserved',
        )
        assert.equal(
          dom.window.document.querySelectorAll(
            'style[data-href="payload-layer-order"]',
          ).length,
          1,
        )
        await act(async () => {
          originalButton?.click()
        })
        assert.equal(clicks, 1, 'Hydrated interaction must work')
      } else {
        assert.ok(
          errors.some((error) => String(error).includes('Hydration failed')),
          'Control fixture must reproduce the reported mismatch',
        )
      }
    } finally {
      await act(async () => root?.unmount())
      dom.window.close()
      for (const [key, descriptor] of previous) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor)
        else Reflect.deleteProperty(globalThis, key)
      }
    }
  }
})
