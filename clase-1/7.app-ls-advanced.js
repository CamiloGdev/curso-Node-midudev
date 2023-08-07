const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] ?? '.' // <--- tomamos el primer argumento como la ruta a proczar

async function ls(folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error('Error al leer el directorio: ', err)
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
    const fileSize = fileStats.size
    const fileModified = fileStats.mtime.toLocaleString()

    return `${fileType} ${file.padEnd(30)} ${fileSize
      .toString()
      .padStart(10)} ${fileModified}`
  })

  const filesInfo = await Promise.all(filesInfoPromises)
  filesInfo.forEach((fileInfo) => console.log(fileInfo))
}

ls(folder)
