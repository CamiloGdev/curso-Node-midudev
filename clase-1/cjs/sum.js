function sum(a, b) {
  return a + b;
}

function rest(a, b) {
  return a - b;
}

// exportando con nombre personalizable en el codigo destino
// module.exports = sum

// exportando para poder obligar a usar el nombre que le demos originalmente al modudo
//CommonJS module export
module.exports = {
  sum,
  rest,
};
