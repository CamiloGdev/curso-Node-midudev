// con este enrrutador direccionaremos todas las peticiones a las rutas que empiecen con ../movies

import { Router } from 'express'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { MovieModel } from '../models/movie.js'

export const moviesRouter = Router()

// OBTENER TODAS LA MOVIES
// CON OPCIÓN DE FILTRAR POR GENRE
moviesRouter.get('/', async (req, res) => {
  const { genre } = req.query

  const movies = await MovieModel.getAll({ genre })
  return res.json(movies)
})

// OBTENER UNA MOVIE POR SU ID
moviesRouter.get('/:id', async (req, res) => {
  // path-to-regex
  const { id } = req.params
  const foundMovie = await MovieModel.getById({ id })
  if (foundMovie) return res.json(foundMovie)

  return res.json({ message: 'Movie not found' })
})

// CREAR UNA NUEVA MOVIE
moviesRouter.post('/', async (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    // <-- también podemos verificar el parámetro contrario con (!result.success)
    return res.status(400).json({ error: JSON.parse(result.error.message) }) // <-- también podría usarse el código 422 (Unprocessable Entity)
  }

  const newMovie = await MovieModel.createMovie({ input: result.data })

  return res.status(201).json(newMovie)
})

// ELIMINAR UNA MOVIE
moviesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const deletedMovie = await MovieModel.deleteMovie({ id })

  if (deletedMovie === false) {
    return res.status(404).json({ error: 'Movie not found' })
  }

  return res.json({ message: 'Movie deleted' })
})

// ACTUALIZAR PARCIALMENTE UNA MOVIE
moviesRouter.patch('/:id', async (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const updatedMovie = await MovieModel.updateMovie({ id, input: result.data })
  if (updatedMovie === false) {
    return res.status(400).json({ error: 'Movie not found' })
  }

  return res.json(updatedMovie)
})
