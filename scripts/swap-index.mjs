import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const indexPath = resolve(root, 'index.html')

// The canonical source entry for Vite — must reference /src/main.tsx
const SOURCE_ENTRY = `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kurob - Fullstack Programmer Cilegon | Web Developer Freelance</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

// Heuristic: an index.html is a production build if it references a hashed /assets/index-*.js
function isProductionBuild(content) {
  return /\/assets\/index-[A-Za-z0-9_-]+\.js/.test(content)
}

let current = ''
try {
  current = readFileSync(indexPath, 'utf-8')
} catch {
  current = ''
}

if (isProductionBuild(current) || !current.includes('/src/main.tsx')) {
  writeFileSync(indexPath, SOURCE_ENTRY)
  console.log('[swap-index] Restored source index.html (/src/main.tsx) for Vite')
} else {
  console.log('[swap-index] index.html already a source entry, skipping')
}
