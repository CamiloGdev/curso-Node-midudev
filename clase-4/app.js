import express from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.use(express.json())
app.disable('x-powered-by')

// Middelware para solucionar los errores de cors
app.use(corsMiddleware())

// Todos los recursos que sean MOVIES se identifican con /movies
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`)
})
