const fs = require('fs')
let store = process.env.STORE
let clearFile = () => {
  switch (store) {
    case 'eldo':
      return 'eldorado.json'
    case 'mvideo':
      return 'mvideo.json'
  }
}
fs.writeFileSync(`stores/data/${clearFile()}`, JSON.stringify({ 'items': [] }))
console.log(`Done for ${clearFile()}`)
