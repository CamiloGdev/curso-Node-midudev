const express = require('express')
const crypto = require('node:crypto')

const movies = require('./movies.json')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

// Todos los recursos que sean MOVIES se indentifican con /movies

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

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`)
})
