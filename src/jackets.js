import dimensions from './assets/jackets/responsive/dimensions.json'
// Originals remain available for high-density displays; browsers choose the
// smallest suitable variant for the actual layout width.
const files = import.meta.glob('./assets/jackets/*.webp', { eager: true, query: '?url', import: 'default' })
export const JK = {}
for (const [path, url] of Object.entries(files)) JK[path.match(/\/([a-z0-9-]+)\.webp$/)[1]] = url
const variants = import.meta.glob('./assets/jackets/responsive/*.webp', { eager: true, query: '?url', import: 'default' })
export const JK_SRCSET = {}
export const JK_DIMENSIONS = dimensions
for (const [name, url] of Object.entries(JK)) {
  JK_SRCSET[name] = [480, 960].map((width) => `${variants[`./assets/jackets/responsive/${name}-${width}.webp`]} ${width}w`).concat(`${url} ${dimensions[name].width}w`).join(', ')
}
