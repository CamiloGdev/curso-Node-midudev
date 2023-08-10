// servidor usando el framework Express
const express = require('express')
const dittoJSON = require('./pokemon/ditto.json')

const app = express()
const PORT = process.env.PORT ?? 3000

app.disable('x-powered-by') // <-- desactivación de cabecera para no enviar la herramienta con la que se esta trabajando

// con express en lugar de definir una funcion que procesa las request, contamos con metodos indendientes basados en los diferentes metodos HTTP
app.get('/pokemon/ditto', (req, res) => {
  res.status(200).json(dittoJSON) // <-- con express la res tiene una funcionalidad mas especial
})

app.post('/pokemon', (req, res) => {
  let body = ''

  // Escuchar el evento data de la request
  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    // aca podriamos llamar a la base de datos para procezar data

    data.timestamp = Date.now()

    res.status(201).send(data)
  })
})

// para manejar los errores en la petición establecemos un tratamiento global de las request, pero al final para garantizar si ya se ha dado una peticion establecida
app.use((req, res) => {
  res.status(404).send('<h1>404<h1/>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
