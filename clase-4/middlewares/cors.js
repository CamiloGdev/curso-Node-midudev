// Middelware para solucionar los errores de cors
import cors from 'cors'

const ACEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://movies.com',
  'http://camilo.dev',
]

export function corsMiddleware({ aceptedOrigins = ACEPTED_ORIGINS } = {}) {
  return cors({
    origin: (origin, callback) => {
      if (aceptedOrigins.includes(origin) || !origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
  })
}
