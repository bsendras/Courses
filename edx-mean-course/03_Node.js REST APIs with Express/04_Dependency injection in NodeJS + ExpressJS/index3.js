var express = require('express');
var mongoose = require('mongoose');
var wagner = require('wagner-core');

setupModels(mongoose, wagner);

var app = express();

setupApp(app, wagner);

app.listen(3000);
console.log('Listening on port 3000!');

function setupModels(mongoose, wagner) {
    mongoose.connect('mongodb://localhost:27017/test');
    
    var userSchema = new mongoose.Schema({
        name: String
    });

    var User = mongoose.model('User', userSchema);

    // wagner permite registrar lo que se llaman "factories" las cuales son funciones que devuelven valores.
    // esos valores son conocidos como servicios. En este ejemplo User, seria el servicio, que corresponde al User model.
    // Esta nocion de factories y services es similar a la utilizada en Angular.js
    wagner.factory('User' /*servicio user*/, function() {
        return User /*Modelo de usuario*/;
    });
}

// pero...ahora, como accedemos a este nuevo servicio?
// a traves de la funcion "invoke" de wagner.
function setupApp(app, wagner) {
    // invoke, recibe una funcion como parametro y la ejecuta. Ademas, invoke inspecciona la lista de parametros de la funcion
    // que le estamos pasando. y ejecuta la funcion del servicio(factory) que coincida con el nombre del parametro.
    // En este caso esta funcion llama a la funcion del servicio cuyo nombre pasamos por parametro (user), y en ese parametro
    // retorna lo que el servicio devuelve (el modelo user ya creado). luego por la propiedad de clousure el modelo User esta
    // disponible en la funcion interna que realiza la consulta.
    var routeHandler = wagner.invoke(function(User) {
        // Notar que esta funcion pasada a invoque retorna una funcion a parte, que resulta ser un routeHandler de Express.
        return function(req, res) {
            User.findOne({ _id: req.params.id }, function(error, user) {
                res.json({ user: user });
            });
        };
    });

    // la variable routHandler ES el routhandler que se usaria tipicamente para consumir un servicio de nuestra api,
    // por lo tanto podemos pasarlo a=como parametro a la funcion .get y es lo que se ejecutara cuando alguien acceda
    // al endpoint /user/:id
    app.get('/user/:id', routHandler);

    // Asi, invoke reutiliza dinamicamente los modelos creados y modificados, sin necesidad de modificar las funciones del api
    // cada vez que hay un cambio en los modelos.
}