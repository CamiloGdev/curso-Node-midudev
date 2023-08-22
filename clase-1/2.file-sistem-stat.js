// uso del modulo fs para manipulación de archivos
const fs = require('node:fs')

// obtener la información del archivo de manera Sincrona
const stats = fs.statSync('./archivo.txt')

console.log(
  stats.isFile(), // si es un fichero
  stats.isDirectory(), // si es un directorio
  stats.isSymbolicLink(), // si es un enlace simbólico
  stats.size // tamaño del archivo
)
