// uso del readFile del modulo fs de forma Asincrona con Async await
const fs = require('node:fs/promises')

;(async () => {
  const [text, text2] = await Promise.all([
    fs.readFile('./archivo.txt', 'utf-8'),
    fs.readFile('./archivo2.txt', 'utf-8'),
  ])
  console.log('termine de leer el archivo y te lo muestro: ', text)
  console.log('termine de leer el archivo2 y te lo muestro: ', text2)
})()
