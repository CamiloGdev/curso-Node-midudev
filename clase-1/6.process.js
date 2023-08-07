// el modulo process brinda control sobre los eventos del proceso
// al momento de us ejecución

// como obtener los argumentos invocados al momento de ejecutar el proceso
// ej: node <fichero.js> <argumento1> < argumento2>...
console.log(process.argv)

// recuperar la ruta del directorio desde el cual se esta haciendo la ejecución
// no es donde esta el archivo, es desde donde estamos ejecutandolo
// current working directory
console.log(process.cwd())
