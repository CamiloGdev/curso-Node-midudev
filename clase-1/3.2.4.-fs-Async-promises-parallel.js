// uso del readFile del modulo fs de forma Asíncrona con Async await
const fs = require('node:fs/promises')

Promise.all([
  fs.readFile('./archivo.txt', 'utf-8'),
  fs.readFile('./archivo2.txt', 'utf-8'),
]).then(([text, text2]) => {
  console.log('termine de leer el archivo y te lo muestro: ', text)
  console.log('termine de leer el archivo2 y te lo muestro: ', text2)
})
