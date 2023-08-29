// con este enrrutador direccionaremos todas las peticiones a las rutas que empiecen con ../movies

import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

// OBTENER TODAS LA MOVIES
// CON OPCIÓN DE FILTRAR POR GENRE
moviesRouter.get('/', MovieController.getAll)

// OBTENER UNA MOVIE POR SU ID
moviesRouter.get('/:id', MovieController.getById)

// CREAR UNA NUEVA MOVIE
moviesRouter.post('/', MovieController.create)

// ELIMINAR UNA MOVIE
moviesRouter.delete('/:id', MovieController.delete)

// ACTUALIZAR PARCIALMENTE UNA MOVIE
moviesRouter.patch('/:id', MovieController.update)
