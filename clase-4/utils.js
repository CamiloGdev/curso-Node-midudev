// ESModules no permiten la importación de json de manera directa como en CommonJS, en este caso debe realizarce de otra manera.
// como leer un json en ESModules
// metodo 1 usando el modulo fs
// import fs from "node:fs"
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// metodo 2 recomendado, creando la funcion requiere() para este archivo con el constructor nativo de Node para usarla en ESModules, de esta forma es posible que sea mas rapido.
import { createRequire } from 'node:module' // <-- importamos el modulo que define los require directamente desde node
const require = createRequire(import.meta.url) // <-- creamos el require para usarlo en este archivo actual

export const readJSON = (path) => require(path) // <-- usando el reqiere creado definimos una función para la lectura de nuestros json y la exportamos para su uso donde sea necesario
