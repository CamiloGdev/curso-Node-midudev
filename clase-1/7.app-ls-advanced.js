// mejorando la app ls, complementando con método process para leer la carpeta que queremos revisar su contenido
// usando modulo path para generar las rutas
// usando modulo picocolors para mejorar la apariencia del resultado

const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.' // <--- tomamos el primer argumento como la ruta a procesar

async function ls(folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(`Error al leer el directorio: ${folder}`)
    process.exit(1)
  }

  const filesInfoPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let fileStats

    try {
      fileStats = await fs.stat(filePath)
    } catch {
      console.error(`Error al leer el archivo: ${filePath}`)
      process.exit(1)
    }

    const isDirectory = fileStats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = fileStats.size.toString()
    const fileModified = fileStats.mtime.toLocaleString()

    return `${pc.white(fileType)} ${pc.blue(file.padEnd(30))} ${pc.green(
      fileSize.padStart(10)
    )} ${pc.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filesInfoPromises)
  filesInfo.forEach((fileInfo) => console.log(fileInfo))
}

ls(folder)
