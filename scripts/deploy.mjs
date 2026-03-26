import { readFileSync, writeFileSync, cpSync, rmSync, mkdirSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const dist = resolve(root, 'dist')

// Copy dist/index.html to root/index.html
const indexHtml = readFileSync(resolve(dist, 'index.html'), 'utf-8')
writeFileSync(resolve(root, 'index.html'), indexHtml)

// Copy dist/404.html to root/404.html
try {
  cpSync(resolve(dist, '404.html'), resolve(root, '404.html'))
} catch {}

// Sync dist/assets/ to root/assets/
const rootAssets = resolve(root, 'assets')
const distAssets = resolve(dist, 'assets')

// Clean old assets
try {
  rmSync(rootAssets, { recursive: true, force: true })
} catch {}

mkdirSync(rootAssets, { recursive: true })

const files = readdirSync(distAssets)
for (const file of files) {
  cpSync(resolve(distAssets, file), resolve(rootAssets, file))
}

console.log('Deploy files copied to root successfully.')
