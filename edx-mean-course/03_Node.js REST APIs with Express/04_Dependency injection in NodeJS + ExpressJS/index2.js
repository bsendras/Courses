var mongoose = require('mongoose');

// 1)
mongoose.connect('mongodb://localhost:27017/test');

// 2)
var userSchema = new mongoose.Schema({
    name: String
});

// 3)
var User = mongoose.model('User', userSchema);

// aplanamos la estructura del codigo del archivo index.js
// ahora este codigo de logica de negocios ya no esta dentro de una funcin que lo contenga.
User.create({ name: 'John' }, function(error, doc) {
    console.log(require('util').inspect(doc));
});

// la diferencia con la estructura del codigo del archivo index.js
// radica en el trabajo que toma crear un usuario en este caso.
// Aqui tendriamos que 1) crear el connection string. 2) crear el diseno del
// schema propiamente dicho y 3) crear el modelo a partir del schema para
// por ultimo crear el usuario. si escribieramos toda nuestra logica de negocios
// de esta forma, el codigo se complicaria y se saldria de control a medida que fuesemos
// agregando diferentes modelos, schemas y usemos diferentes bases de datos.
// en el ejemplo del index.js nos abstraemos de la creacion y seteo de esquemas, modelos y coneccion.


// Ademas si quisieramos manipular nuestros modelos para realizar pruebas
// el hecho de tener los modelos escritos en el mismo lugar donde dichos modelos
// se usan, hace dificil escribir esas pruebas.


