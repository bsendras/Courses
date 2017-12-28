// node.js utiliza el scope a nivel de archivo, lo que significa que nada de codigo declarado en ese
// archivo puede ser accedido desde afuera de el. Node mantiene un objeto global, pero usarlo para esto es un error.
// Este es un mejor mecanismo para compartir codigo entre archivos..

// Incluimos codigo de archivos externos con require.
var fn = require('./myfile.js'); // call require on "myfile.js" file.
fn();

// la siguiente llamada significa que node js incluya el archivo index.js que se encuentra en el directorio ./test.
// osea, es equivalente a require('./test/index.js')
var otherfn = require('./test').other; // call require on the "test" directory
otherfn();
