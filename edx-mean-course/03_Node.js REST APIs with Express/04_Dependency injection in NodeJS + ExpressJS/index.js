var mongoose = require('mongoose');

mongoose.connect('mongodb://lcalhost:27017/test');

var userSchema = new mongoose.Schema({
    name: String
});

var User = mongoose.model('User', userSchema);

myUserFunction(User);

// En este caso, esta funcion de logica de negocios, toma el modelo de mongoose como un parametro
// en lugar de gestionarlo cada vez que la logica de negocios se ejecuta.
function myUserFunction(User) {
    User.create({ name : 'john' }, function (error, doc) {
        console.log(require('util').inspect(doc));
    });
}

// Ahora, por que hacerlo de esta forma? Primero, como las dependencias de la funcion(en este caso el modelo) so pasadas como parametro
// es facil refactorizar toda esta fncion llegvandola a un archivo separado. Segundo, es facil de reutilizar las dependencias, por ejemplo
// si quisieramos utilizar una base de datos de prueba, lo unico que hay que hacer es cambiar la forma en que se inicializa el modelo.