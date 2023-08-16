const express = require('express')

const app = express()
const PORT = process.env.PORT ?? 3000

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
})

app.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`)
})
