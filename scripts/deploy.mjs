import { readFileSync, writeFileSync, cpSync, rmSync, mkdirSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const dist = resolve(root, 'dist')
const publicDir = resolve(root, 'public')

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

try {
  rmSync(rootAssets, { recursive: true, force: true })
} catch {}

mkdirSync(rootAssets, { recursive: true })

const files = readdirSync(distAssets)
for (const file of files) {
  cpSync(resolve(distAssets, file), resolve(rootAssets, file))
}

// Sync public/images/ to root/images/
const rootImages = resolve(root, 'images')
const publicImages = resolve(publicDir, 'images')

try {
  rmSync(rootImages, { recursive: true, force: true })
} catch {}

mkdirSync(rootImages, { recursive: true })

try {
  const imageFiles = readdirSync(publicImages)
  for (const file of imageFiles) {
    cpSync(resolve(publicImages, file), resolve(rootImages, file))
  }
} catch {}

console.log('Deploy files copied to root successfully.')
