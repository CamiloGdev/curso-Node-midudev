# Ejercicios y proyectos prácticos con ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) y ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

## 1- conceptos básicos de Node y express
  * Uso de modulo nativo de `node:os`.
  * Uso de statSync del modulo nativo de Node file-system `node:fs`, para obtener data de los ficheros de forma sincrona.
  * Uso de readFileSync del modulo nativo de Node file-system 'fs', para lectura de archivos de forma sincrona.
  * Uso de readFile del modulo nativo de Node file-system 'fs', para lectura de archivos de forma asíncrona con callbacks.
  * Uso de readFile del modulo nativo de Node file-system `node:fs/promises`, para lectura de archivos de forma asíncrona con promises.
  * Uso de readFile del modulo nativo de Node file-system `node:fs/promises`, para lectura de archivos de forma asíncrona con async-await.
  * Uso de readFile del modulo nativo de Node file-system `node:fs/promises`, para lectura de archivos de forma asíncrona y paralela con promises.
  * Uso de readFile del modulo nativo de Node file-system `node:fs/promises`, para lectura de archivos de forma asíncrona y paralela con async-await.
  * Uso de del modulo nativo de Node `node:path` para trabajo con rutas de ficheros.
  * Pequeña app ls que lee el contenido del la carpeta actual y los muestra por consola
  * Uso del método process, para recuperar la ruta del directorio desde el cual se esta haciendo la ejecución (current working directory)
  * Pequeña app ls que lee el contenido del la carpeta actual y los muestra por consola, complementado con colores usando paquete `picocolors`, con captura de argumentos desde consola usando el método process.
  * Uso de del modulo nativo de Node `node:http`, para inicializar un server sin instalar dependencias externas.
  * Creación de pequeño modulo que recibe un puerto y retorna dicho puerto si esta disponible o devuelve un puerto disponible para su uso
  * Uso de del modulo nativo de Node `node:http`, para inicializar un server sin instalar dependencias externas y usando el modulo creado para buscar un puerto disponible.

## 2- Creación de servidores simples y procesado de peticiones sencillas.
  * Creación de un server para procesar peticiones simples con el uso del modulo nativo `node:http` sin instalar dependencias externas
  * Creación de un server para procesar peticiones teniendo en cuenta el método http recibido, usando nuevamente el modulo `node:http` sin instalar dependencias
  * Creación de un server simple con el uso del framework  `express`

## 3- pequeña API de películas
  * Creación de pequeña API para proporcionar información de películas de cine, usando el framework `express`
  * uso del modulo `cors` para la implementación de un middleware en la API que impida los errores de cors
  * Creación de un schema de validaciones para las peticiones usando el modulo `zod`
  * Creación de una pequeña landing para consumir la API, para probar su funcionamiento y el uso de los cors

## 4- refactorizando la API de películas, implementación de MVC architecture, integración con ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
  * Modularización de la API siguiendo la `arquitectura MVC`
  * Implementación de enrutador, encargado exclusivamente del manejo de las rutas
  * Implementación de controlador encargado de la validación y gestión de las peticiones
  * Implementación de un modulo para el manejo y gestión de la lógica de negocio, usando un archivo local del sistema
  * Implementación de un modulo para el manejo y gestión de la lógica de negocio, haciendo uso de la base de datos no relacional `MongoDB`
  * Manejo de variables de entorno con el paquete `dotenv` para el manejo de las credenciales de conexión con `MongoDB`
  * Implementación de un middleware para modularizar la gestión de los cors

## 5- implementación del modelo usando MySQL
  -filtrar movies por genero con
  - crear las tablas con llave foránea
  - inyección de dependencias
  resaltar las palabras clave
