// uso de módulos nativos de NodeJS con CommonJS

// modulo que nos brinda información del OS
const os = require('node:os')

console.log('información del sistema operativo:')
console.log('-------------------')
console.log('Nombre del sistema operativo: ', os.platform())
console.log('arquitectura: ', os.arch())
console.log('CPUs: ', os.cpus())
console.log('Memoria libre: ', os.freemem() / 1024 / 1024)
console.log('Memoria total: ', os.totalmem() / 1024 / 1024)
