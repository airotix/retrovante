// Optimised transparent cut-outs. Add a file here (assets/jackets/<name>.webp) and it becomes available as JK.<name>.
const files = import.meta.glob('./assets/jackets/*.webp', { eager: true, query: '?url', import: 'default' })
export const JK = {}
for (const [path, url] of Object.entries(files)) JK[path.match(/\/([a-z0-9-]+)\.webp$/)[1]] = url
