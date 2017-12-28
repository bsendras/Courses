var express = require('express');
var wagner = require('wagner-core');


require('./models')(wagner);

var app = express();

// Hasta ahora no habiamos visto la funcion app.use()
// La semantica completa use es bastante compleja. por ahora vamos a usarla para obtener la funcionalidad de un Express subrouter.
// Es decir, la funcion exportada por api.js va a retornar un Express subrouter. Y asi al express app sabra que tiene que remitirse
//  a este subrouter cada vez que algien visite una URL que empiece con /api/v1
app.use('/api/v1', require('./api')(wagner));

app.listen(3000);
console.log('Listening on port 3000!');