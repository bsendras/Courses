// incluimos la dependencia para usarla.
var _ = require('underscore');

// usamos la funcion utilitaria "each"
// recorre cada elemento de un array y por cada uno ejecura la funcion pasada en el segundo parametro.
_.each([1, 2, 3], function (v) {
    console.log(v);
});