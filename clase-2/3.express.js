// servidor usando el framework Express
const express = require('express')
const dittoJSON = require('./pokemon/ditto.json')

const app = express()
const PORT = process.env.PORT ?? 3000

app.disable('x-powered-by') // <-- desactivación de cabecera para no enviar la herramienta con la que se esta trabajando

/* // Middleware para todas las peticiones que entren
app.use((req, res, next) => {
  // podríamos trackear la request a la base de datos
  // revisar si el usuario tiene cookies
  // por ejemplo podemos traernos la lógica que toma el cuerpo de la request y la almacena como JSON en una variable
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // aca solo llegan request que son POST y que tienen el header Content-Type: application/json
  let body = ''

  // Escuchar el evento data de la request
  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request y meter la información parseada en el req.body
    req.body = data
    next()
  })
}) */

// express nos brinda un middleware que nos ahorra el código anterior y hace exactamente lo mismo
app.use(express.json())

// con express en lugar de definir una función que procesa las request, contamos con métodos independientes basados en los diferentes métodos HTTP
app.get('/pokemon/ditto', (req, res) => {
  res.status(200).json(dittoJSON) // <-- con express la res tiene una funcionalidad mas especial
})

app.post('/pokemon', (req, res) => {
  req.body.timestamp = Date.now()
  // aca podríamos guardar en DB con el req.body
  res.status(201).json(req.body)
})

// para manejar los errores en la petición establecemos un tratamiento global de las request, pero al final para garantizar si ya se ha dado una petición establecida
app.use((req, res) => {
  res.status(404).send('<h1>404<h1/>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
