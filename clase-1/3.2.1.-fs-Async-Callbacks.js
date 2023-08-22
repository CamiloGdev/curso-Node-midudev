// uso del readFile del modulo fs de forma Asíncrona con Callbacks
const fs = require('node:fs')

console.log('leyendo el primer archvo ...')
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  console.log('termine de leer el archivo y te lo muestro: ')
  console.log(text) // <--- en este caso la instrucción de lectura del archivo se hará de forma asíncrona, por lo que el método recibe una función de callback que se ejecutara tan pronto termine la lectura, con las instrucciones que necesitemos ejecutar como en este caso que mostramos el contenido, pero mientras llega al callback se puede continuar con las siguientes instrucciones.
})

console.log('hacer cosas mientras lee el archivo ...') // <---- esta ves esto si se muestra antes de mostrar el contenido del archivo ya que la instrucción se ejecuta mientras se hace la lectura de forma asíncrona

console.log('leyendo el segundo archivo ...')
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  console.log('termine de leer el archivo2 y te lo muestro: ')
  console.log(text)
})
