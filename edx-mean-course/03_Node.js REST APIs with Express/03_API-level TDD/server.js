    // el modulo express, al ser accedido con require devuelve una funcion que puede usarse para crear un Aplicacion explress.
    var express = require('express');

    // sesta funcion exportada es la que se ejecutara en index.js
    module.exports = function() {
        var app = express();

        // con la app creada podemos adjunta/atachar los enpoints o routes necesarios a la aplicacion
        // Aca agregamos un endpoint handler. accedemos a el dede el navegador con http://<hostname or ip>:<puerto>/
        app.get('/', function(req, res) {
            res.send('Hello World!');
        });

        // Aca agregamos un endpoint handler. accedemos a el dede el navegador con http://<hostname or ip>:<puerto>/user/<param value>?option=<optionvalue>
        app.get('/user/:user', function(req, res) {
            res.send('Page for user ' + req.params.user + ' with option ' + req.query.option);
        });

        // en el handler anterion :user es lo que se llama un rout parameter.
        // req.params.user nos da acceso al string ingresado en el parametro.
        // req.query.option comtiene pares clave valor representando el querystring de la url. (todo lo que viene despues de ?)

        // un express route/endpoint handler toma dos parametros. Uno es un objecto request (req) que contiene info sobre la
        // peticion entrante) y un objeto response (res) que qcontiene utilidades para armar la respuesta.

        return app;
    }

