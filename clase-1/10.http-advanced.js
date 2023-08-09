// creando un servidor desde cero sin instalar dependencias
// pero haciendo uso del modulo creado para devolver un puerto libre
const http = require('node:http')
const { findAvailablePort } = require('./9.free-port.js')
const desiredPort = process.env.PORT ?? 300 // <-- tomamos el puerto desde las variables de entorno

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

findAvailablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})
