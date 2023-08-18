const express = require('express')
const crypto = require('node:crypto')

const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies.js')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

const ACEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://movies.com',
  'http://camilo.dev',
]

// Todos los recursos que sean MOVIES se indentifican con /movies

// OBTENER TODAS LA MOVIES
// CON OPCIÓN DE FILTRAR POR GENRE
app.get('/movies', (req, res) => {
  // Añadimos los permisos de CORS para poder realisar la request solo a este endpoint desde un dominio diferente al de nuestra API
  const origin = req.header('origin') // <-- traemos el dominion de origen de la request

  // Se va a añadir la cabecera solo en el caso en que el dominio coincida con uno de los aceptados o que este vacio, vacío tambíen se acepta, ya que este solo esta vacío en el caso en que la request se realice desde el mismo dominio de nuestra API
  if (ACEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin || 'http://localhost:3000') // <-- debemos añadir este header para permitir a otros dominios acceder
  }

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
    // <-- tambien podemos verificar el parametro contrario con (!result.success)
    return res.status(400).json({ error: JSON.parse(result.error.message) }) // <-- tambien podria usarse el codigo 422 (Unprocessable Entity)
  }

  // Esto se debe hacer en DB
  const newMovie = {
    id: crypto.randomUUID(), // <-- generamos un uuid v4 usando el modulo nataivo crypto
    ...result.data,
  }

  movies.push(newMovie) // <-- no seria REST por que estamos guardando el estado (la data) de la app en memoria en la variable movies, pero esto se resuelve guardando en base de datos mas adelante

  return res.status(201).json(newMovie)
})

// ELIMINAR UNA MOVIE
app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin || 'http://localhost:3000')
  }

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

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }
  res.sendStatus(200)
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`)
})
