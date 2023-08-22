// Uso del modulo nativo path

const path = require('node:path')

// Obtener la barra separadora de rutas según OS
console.log(path.sep)

// Uniendo rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename('/tmp/midu-secret-files/password.txt')
console.log(base)

const filename = path.basename('/tmp/midu-secret-files/password.txt', '.txt')
console.log(filename)

const extencion = path.extname('my.super.image.jpg')
console.log(extencion)
