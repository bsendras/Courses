var mongoose = require('mongoose');
var _ = require('underscore');

mongoose.Promise = global.Promise;

module.exports = function(wagner) {
    // Conecta a mongodb
    mongoose.connect('mongodb://localhost:27017/test');

    // crea el category model, mediante la inclusion del schema.
    var Category = mongoose.model('Category', require('./category'), 'categories');
    var Product = mongoose.model('Product', require('./product'), 'products');
    
    // Registra el servicio 'Category' usando wagner.
    // wagner.factory('Category', function() {
    //     return Category;
    // });
    // Esto ultimo, ahora lo hacemos en un loop.
    
    // agrupamos los modelos en un Objeto Javascript.
    var models =  {
        Category: Category,
        Product: Product
    };

    // iteramos los pares clave-valor que representan a cada modelo
    // registramos los servicios/factories correspondientes.
    // to mantain dthe DRY-ness of the code. (D.R.Y = don't repeat yourself).
    _.each(models, function(value, key) {
        wagner.factory(key, function() {
            return value;
        });
    });

    // retorna on objeto json donde la propiedad categoria tiene la forma de un objeto del modelo categoria.
    return models;
};