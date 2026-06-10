import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import toIco from 'to-ico'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const svg = readFileSync(join(root, 'public/favicon.svg'))

const makeIcon = (size) =>
  sharp(svg)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

const png32 = await makeIcon(32)
const png16 = await makeIcon(16)
const png180 = await makeIcon(180)

writeFileSync(join(root, 'public/favicon-32.png'), png32)
writeFileSync(join(root, 'public/favicon-16.png'), png16)
writeFileSync(join(root, 'public/apple-touch-icon.png'), png180)
writeFileSync(join(root, 'public/favicon.ico'), await toIco([png32, png16]))

console.log('Favicons generated with padding.')
