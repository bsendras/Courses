var mongoose = require ('mongoose');
var schema = require('./schema');

// We choose javascript native ES6 promises library to replace the deprecated mongoose's default promise library.
mongoose.Promise = global.Promise;

var uri = 'mongodb://bsendras:bs001@mdbaas-shard-00-00-qwjdr.mongodb.net:27017,mdbaas-shard-00-01-qwjdr.mongodb.net:27017,mdbaas-shard-00-02-qwjdr.mongodb.net:27017/test?ssl=true&replicaSet=mdbaas-shard-0&authSource=admin';
// mongoose.connect(uri) Esta es la forma mas consisa pero tambien podemos evaluar el error como sigue:
mongoose.connect(uri, function(error) {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  // Params:
  // User:  Nombre del modelo que se esta instanciando.
  // schema: Varable que tiene el schema que importamos con require.
  // users: coleccion de la db a la que asociamos el modelo. 
  var User = mongoose.model('User', schema, 'users');
  
  //OPCIONALMENTE
  // Borro el documento que se inserto la vez anterior.
  /*
  User.findOneAndRemove( { email: 'john@smith.io' }, function(error) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  });
  */

  // Ahora, Que podemos hacer con el modelo que tenemos instanciadao?

  // 1) Podemos crear un documento:
  var user = new User ({
    name: 'John Smith',
    email: 'john@smith.io'
  });

  // 2) Podemos guardarlo en la base de datos.
  user.save(function (error) {
    if (error) {
      console.log(error);
      process.exit(1);
    }

    // 3) Y podemos consultar el documento insertado, ya que el modelo de mongoose tiene una funcion ".find" que wrappea
    // la funcion ".find" del driver nativo de mongodb. la cual ya toma como parametro de entrda/salida un array de documentos.
    var query = { email: 'john@smith.io' };
    User.find(query, function(error, docs) {
      if (error) {
        console.log(error);
        process.exit(1);
      }

      // NOTAR la forma en la que se utiliza aqui la funcion require. Tomamos un metodo un modulo externo "On Demand".
      console.log(require('util').inspect(docs));
      process.exit(0);  
    });
  });
});