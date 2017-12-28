var mongodb = require('mongodb');

// db local
// var uri = 'mongodb://localhost:27017/example';

// db "as a service" en cluster online de mongoDB Atlas.
var uri = 'mongodb://bsendras:bs001@mdbaas-shard-00-00-qwjdr.mongodb.net:27017,mdbaas-shard-00-01-qwjdr.mongodb.net:27017,mdbaas-shard-00-02-qwjdr.mongodb.net:27017/test?ssl=true&replicaSet=mdbaas-shard-0&authSource=admin';

mongodb.MongoClient.connect(uri, function(error, db) {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  // estoy conectado

  // MongoDB utiliza lo que se conoce como "Query by example aproach".
  // Lo que significa que para consultar pasamos al find un documento con las caracteristicas a usar como criterio de busqueda.
  
  // Si el query tiene un solo par clave/valor se devuelven todos los objetos que coincidan con el valor de ese atributo.
  // Si el query tiene varios pares clave valor, estos se evaluan como un AND.
  var query1 = {
    title: 'Jaws',
    year: 1975,
    director: 'Steven Spielberg',
    rating: 'PG'
  }

  // en este caso matchea para la propiedad screenplay, uno de los valores del array.
  var query2 = {
    screenplay: 'Peter Bencley'
  }

  // en este caso usamos la notacion "." (punto) para matchear con una propiedad (audience) de un objeto anidado (ratings).
  var query3 = {
    'ratings.audience': { '$gte': 90 }
  }

  db.collection('movies').find(query3).toArray(function(error, docs) {
    if (error) {
      console.log(error);
      process.exit(1);
    }

    console.log('Found docs:');
    docs.forEach(function(doc) {
      console.log(JSON.stringify(doc));        
    });
    process.exit(0);
  });  
});