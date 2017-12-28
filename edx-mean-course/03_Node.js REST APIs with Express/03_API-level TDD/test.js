// superagent es un cliente http, necesario para ejecutar requests de prueba.
var app = require('./server.js');
var assert = require('assert');
var superagent = require('superagent');

describe('server', function() {
    var server;

    // antes de que empiece cada prueba, na inicio el server.
    beforeEach(function() {
        server = app().listen(3000);
    });

    // despues de que termine cada prueba, lo detngo.
    afterEach(function() {
        server.close();
    });

    // a diferencia de lenguajes como java o c++ la naturaleza asincronica de la "event-driven IO" de node,
    // permite iniciar un servidor http y hacer http requests a ese mismo server, en EL MISMO THREAD (esta
    // la parte importante).
    it('prints out "Hello World!", when user goes to /', function(done) {
        superagent.get('http://localhost:3000/', function(error, res) {
            // intentamos afirmar que sucede lo que esperams que suceda.
            assert.ifError(error);                  // verifico al ejecutar el request.
            assert.equal(res.status, 200);          // vrifico el estado del server en la respuesta(http status, 200 = succes) Express returns HTTP status 200 by default.
            assert.equal(res.text, "Hello World!"); // Verifico que el tecto devuelto sea el esperado.
            done();
        });
    });

    // mocha ispecciona los parametros de la funcion que estamos pasando como parametro a la funcion 'it'
    // (inspecciona los parametros de la funcion que recibe done). Si esta funcion recibe parametros, entonces mocha asume que
    // el test es asincronico, y llamando a done al final es como le decimos a mocha que el test termino.

    //IMPORTANTE revisar la leccion de mocha con gulp.
});