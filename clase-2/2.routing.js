// procesando peticiones con diferentes metodos http
const http = require('node:http')
const dittoJSON = require('./pokemon/ditto.json') // <-- gracias al uso de CommonJS podemos importar los JSON directamente sin convertir

function processRequest(req, res) {
  const { url, method } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON)) // <-- se deve convertir el JSON a string para enviarlo

        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404<h1/>')
      }

    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''

          // Escuchar el evento data de la request
          req.on('data', (chunk) => {
            body += chunk.toString() // <-- chunk quiere desit troso, para cada troso que llega del cuerpo de la request lo tranformamos en string y lo vamos guardando en body
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // aca podriamos llamar a la base de datos para procezar data
            res.writeHead(201, {
              // <-- otra forma de enviar la cabecera con el status code directamente
              'Content-Type': 'application/json; charset=utf-8',
            })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data)) // <-- para este caso de ejemplo retormanos la misma data suministrada
          })

          break
        }

        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end('404 not Found')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log('server listening on port: http://localhost:3000')
})
