var mongodb = require('mongodb');
// me conecto a mongodb://server:port/databasename
var uri = 'mongodb://localhost:27017/example';

// intento la coneccion. recibe la uri y un callback paraa obtener el error y el handle a la db.
mongodb.MongoClient.connect(uri, function(error, db) {
    // Si hubo error salgo y lo muestro.
    if (error) {
        console.log(error);
        process.exit(1);
    }

    // Intento insertar en la coleccion 'sample' el documento {x: 1}, y paso un callback para obtener el error o el resultado de la insercion.
    db.collection('sample').insert({ x: 1 }, function(error, result) {
        if (error) {
            console.log(error);
            process.exit(1);
        }
    
        // Intento obtener los documentos de la coleccion sample y paso un callback para obtener el error o los documentos devueltos.
        // Si pasara un callback a la funcion find, el resultado obtenido seria un "cursor" al set de documentos y no un set de documentos.
        // un cursor es un objeto al que podemos iterar y pedir los siguientes documentos, de auno, pero aqui eso no hace falta.
        // por eso primero lo volcamos a un array, y es a la funcion toArray a quien le damos el callback para que nos lo ejecute al finalizar.
        db.collection('sample').find().toArray(function(error, docs) {
            if (error) {
                console.log(error);
                process.exit(1);
            }

            // no hubo error, prosigo.
            console.log("Found docs:");
            // docs es un array
            docs.forEach(function(doc) {
                console.log(JSON.stringify(doc));
            });
            // todo ok; salgo
            process.exit(0);
        });
    });
});