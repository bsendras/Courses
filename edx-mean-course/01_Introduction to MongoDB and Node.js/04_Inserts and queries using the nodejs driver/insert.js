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
  var doc = {
    title: 'Jaws',
    year: 1975,
    director: 'Steven Spielberg',
    rating: 'PG',
    ratings: {
      critics: 80,
      audience: 90
    },
    screenplay: ['Peter Bencley', 'Carl Gotlieb']
  }

  db.collection('movies').insert(doc, function(error, result) {
    if (error) {
      console.log(error);
      process.exit(1);
    }

    db.collection('movies').find().toArray(function(error, docs) {
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
});