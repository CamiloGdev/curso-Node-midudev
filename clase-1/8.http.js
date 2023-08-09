// creando un servidor desde cero sin instalar dependencias
const http = require('node:http')

// creamos el servidor
const server = http.createServer((req, res) => {
  // <--- le pasamos el callback para manejar las peticiones.
  console.log('request received')
  res.end('Hola mundo')
})

// indicamos al servidor en que puerto debe escuchar
server.listen(0, () => {
  // <- pasamos un colback para indicar por consola cuando el servidor comience a escuchar
  console.log(
    `server listening on port http://localhost:${server.address().port}`
  )
})
// para evitar el uso de un puerto ocupado podemos indicar como puerto el 0, de esta manera el servidor usara uno desocupado.
// y para saber el puerto que estamos usando server.address().port
