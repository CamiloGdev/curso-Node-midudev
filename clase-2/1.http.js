// creando un servidor y procesando requests
const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000 // <-- tomamos el puerto desde las variables de entorno

// definimos el callback que procesa la petición externamente
const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8') // <-- definición de cabeceras como tipo de respuesta y el charset para detectar correctamente los caracteres, etc...

  if (req.url === '/') {
    // <-- respuesta al request raíz "/"
    res.statusCode = 200
    res.end('<h1>Bienvenido a mi página de inicio<h1/>')
  } else if (req.url === '/super-imagen.png') {
    fs.readFile('./teclado.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>error 500, no se pudo procesar la imagen<h1/>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    // <-- respuesta al request raíz "/"
    res.statusCode = 200
    res.end('<h1>Contacto<h1/>')
  } else {
    res.statusCode = 404
    res.end('<h1>404<h1/>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
