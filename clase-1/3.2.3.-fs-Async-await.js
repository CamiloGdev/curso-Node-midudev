// uso del readFile del modulo fs de forma Asincrona con Async await
const fs = require('node:fs/promises')

;(async () => {
  // <--- al trabajar con CommonJS es necesario englobar el código en una función autoinvocada (IIFE Inmediatly Invoked Function Expression) de tipo async para que el await funcione

  console.log('leyendo el primer archvo ...')
  const text = await fs.readFile('./archivo.txt', 'utf-8')
  console.log('termine de leer el archivo y te lo muestro: ', text)

  console.log('hacer cosas mientras lee el archivo ...') // <---- esto lo muestra despues de mostrar el contenido del archovo y no mientras lo esta leyendo a pesar de que la lectura no la esta haciend el hilo principal de ejecución, ya que el await espera la respuesta de la lectura para continuar con la ejecución de la instrucción

  console.log('leyendo el segundo archivo ...')
  const text2 = await fs.readFile('./archivo2.txt', 'utf-8')
  console.log('termine de leer el archivo2 y te lo muestro: ', text2)
})()
