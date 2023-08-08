// pequeña app ls que lee el contenido del la carpeta actual y los muestra por consola

const fs = require('node:fs/promises')

fs.readdir('.')
  .then(files => {
    files.forEach(file => console.log(file))
  })
  .catch(err => {
    console.log('Error al leer el directorio: ', err)
  })
