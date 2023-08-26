// creamos un esquema con zod para la validación de los datos para las movies

import z from 'zod' // <-- paquete para realizar validaciones

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string.',
    required_error: 'Movie title is required.',
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().min(0),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL',
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci-Fi',
      'Crime',
    ]),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre.',
    }
  ),
})

// Validamos todos los atributos del recurso
export function validateMovie(input) {
  return movieSchema.safeParse(input)
}

// Agregando el método partial() a la validación, la realizamos parcialmente, cada validación se convierte en opcional, ya que solo nos pasaran algunos de los atributos cuando queramos por ejemplo actualizar parcialmente el recurso
export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input)
}
