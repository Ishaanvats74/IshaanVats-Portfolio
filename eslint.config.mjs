import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
export default defineConfig([...nextVitals, globalIgnores(['.next/**','node_modules/**','src/payload-types.ts','src/migrations/**','src/app/(payload)/admin/importMap.js','next-env.d.ts'])])
