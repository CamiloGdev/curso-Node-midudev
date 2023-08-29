// con este enrrutador direccionaremos todas las peticiones a las rutas que empiecen con ../movies

import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

import { readJSON } from '../utils.js' // <-- importamos el modulo  que creamos para leer los json como si hicieramos un requiere
const movies = readJSON('./movies.json') // usando el reasJSON importado ahora si podemos importar directamente nuestro json como si usaramos CommonJS

export const moviesRouter = Router()
console.log(moviesRouter)

// OBTENER TODAS LA MOVIES
// CON OPCIÓN DE FILTRAR POR GENRE
moviesRouter.get('/', (req, res) => {
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
moviesRouter.get('/:id', (req, res) => {
  // path-to-regex
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)

  return res.json({ message: 'Movie not found' })
})

// CREAR UNA NUEVA MOVIE
moviesRouter.post('/', (req, res) => {
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
moviesRouter.delete('/:id', (req, res) => {
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
moviesRouter.patch('/:id', (req, res) => {
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
