// contraseña mongo db: j0gJr9nN5hPAtMbe
// con el modelo movie realizamos el manejo interno de los datos, las reglas del negocio

import { randomUUID } from 'node:crypto'

import { readJSON } from '../../utils.js' // <-- importamos el modulo  que creamos para leer los json como si hicieramos un requiere
const movies = readJSON('./movies.json') // usando el reasJSON importado ahora si podemos importar directamente nuestro json como si usaramos CommonJS

export class MovieModel {
  // OBTENER TODAS LA MOVIES
  // CON OPCIÓN DE FILTRAR POR GENRE
  static getAll({ genre }) {
    if (genre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
      return filteredMovies
    }
    return movies
  }

  // OBTENER UNA MOVIE POR SU ID
  static getById({ id }) {
    const movieById = movies.find((movie) => movie.id === id)
    if (movieById) return movieById

    return false
  }

  // CREAR UNA NUEVA MOVIE
  static createMovie({ input }) {
    // Esto se debe hacer en DB
    const newMovie = {
      id: randomUUID(), // <-- generamos un uuid v4 usando el modulo nativo crypto
      ...input,
    }

    movies.push(newMovie) // <-- no seria REST por que estamos guardando el estado (la data) de la app en memoria en la variable movies, pero esto se resuelve guardando en base de datos mas adelante

    return newMovie
  }

  // ELIMINAR UNA MOVIE
  static deleteMovie({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
      return false
    }

    movies.splice(movieIndex, 1)

    return true
  }

  // ACTUALIZAR PARCIALMENTE UNA MOVIE
  static updateMovie({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) {
      return false
    }

    // Esto se debe hacer en DB
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input,
    }

    return movies[movieIndex]
  }
}
