// ESLint needs the legacy JavaScript compiler API; application tsc stays on TS 7.
import { registerHooks, createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const legacy = require.resolve('typescript-legacy')
registerHooks({ resolve(specifier, context, nextResolve) { return nextResolve(specifier === 'typescript' ? legacy : specifier, context) } })
