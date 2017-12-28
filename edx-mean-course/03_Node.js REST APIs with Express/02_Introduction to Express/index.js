var server = require('./server.js');

// aqui es donde realmente se ejecuta la funcion exportada en el archivo del servidor.
// la funcion server devuelve la app express que creamos con los endpoints atachados.
// Esta app devuelta, es la que llamamos serve() y queda escuchando peticiones en el puerto 3000.
server().listen(3000, function(error) {
    if (error) {
        console.log(error);
    }
    console.log('Server listening on port 3000!');
});
