// esto es equivalente a escribir module.exports.other = require(...)
// la diferencia es que si uso elshorthand "exports" no puede ser asignado directamente con require.
// osea: exports = require('..') no se permite.
// pero: modules.exports = require('..') si se permite.

// la segunda sutileza es que, como puede observarse no se incluye en el path el directorio "test/myotherfile.js"
// eso es asi porque la funcion require resuelve los nombres de los archivos de forma relativa a la ubicacion del archivo actual.
exports.other = require('./myotherfile.js');