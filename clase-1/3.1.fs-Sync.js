// uso del readFile del modulo fs de forma Sincrona
const fs = require('node:fs')

console.log('leyendo el primer archvo ...')
// const text = fs.readFileSync('./archivo.txt') <-- esto devuelve un buffer de memoria binari
const text = fs.readFileSync('./archivo.txt', 'utf-8') // se debe codificar para poder hacer uso de el

console.log(text)

console.log('hacer cosas mientras lee el archivo ...') // <---- esto lo muestra despues de mostrar el contenido del archovo y no mientras lo esta leyendo ya que la lectura la hace de forma sincrona, por lo que la ejecucion no continua a la siguiente instrucción hata que no termine la lectura

console.log('leyendo el segundo archivo ...')
const secondTex = fs.readFileSync('./archivo2.txt', 'utf-8')

console.log(secondTex)
