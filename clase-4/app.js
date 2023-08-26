import express from 'express'
import { randomUUID } from 'node:crypto'
import cors from 'cors'
import { validateMovie, validatePartialMovie } from './schemas/movies.js'

import movies from './movies.json'

const app = express()
app.use(express.json())
app.disable('x-powered-by')

// Middelware para solucionar los errores de cors
app.use(
  cors({
    origin: (origin, callback) => {
      const ACEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://movies.com',
        'http://camilo.dev',
      ]

      if (ACEPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
  })
)

// Todos los recursos que sean MOVIES se identifican con /movies

// OBTENER TODAS LA MOVIES
// CON OPCIÓN DE FILTRAR POR GENRE
app.get('/movies', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  return res.json(movies)
})

// OBTENER UNA MOVIE POR SU ID
app.get('/movies/:id', (req, res) => {
  // path-to-regex
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)

  return res.json({ message: 'Movie not found' })
})

// CREAR UNA NUEVA MOVIE
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    // <-- también podemos verificar el parámetro contrario con (!result.success)
    return res.status(400).json({ error: JSON.parse(result.error.message) }) // <-- también podría usarse el código 422 (Unprocessable Entity)
  }

  // Esto se debe hacer en DB
  const newMovie = {
    id: randomUUID(), // <-- generamos un uuid v4 usando el modulo nativo crypto
    ...result.data,
  }

  movies.push(newMovie) // <-- no seria REST por que estamos guardando el estado (la data) de la app en memoria en la variable movies, pero esto se resuelve guardando en base de datos mas adelante

  return res.status(201).json(newMovie)
})

// ELIMINAR UNA MOVIE
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

// ACTUALIZAR PARCIALMENTE UNA MOVIE
app.patch('/movie/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) {
    return res.status(400).json({ error: 'Movie not found' })
  }

  // Esto se debe hacer en DB
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`)
})
