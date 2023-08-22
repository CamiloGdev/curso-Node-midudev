// uso del readFile del modulo fs de forma Asíncrona con Promises
const fs = require('node:fs/promises')

console.log('leyendo el primer archvo ...')
fs.readFile('./archivo.txt', 'utf-8')
  .then(text => { // <--- es este caso el método devuelve una promesa por lo que ejecutamos esto cuando se resuelva
    console.log('termine de leer el archivo y te lo muestro: ')
    console.log(text)
  })

console.log('hacer cosas mientras lee el archivo ...')

console.log('leyendo el segundo archivo ...')
fs.readFile('./archivo2.txt', 'utf-8')
  .then(text => {
    console.log('termine de leer el archivo2 y te lo muestro: ')
    console.log(text)
  })
