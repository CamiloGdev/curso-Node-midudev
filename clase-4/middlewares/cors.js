// Middleware para solucionar los errores de cors
import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://movies.com',
  'http://camilo.dev',
]

export function corsMiddleware({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) {
  return cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
  })
}
