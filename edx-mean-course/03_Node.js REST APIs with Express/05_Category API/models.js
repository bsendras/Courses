var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function(wagner) {
    // Conecta a mongodb
    mongoose.connect('mongodb://localhost:27017/test');

    // crea el category model, mediante la inclusion del schema.
    var Category = mongoose.model('Category', require('./category'), 'categories');
    
    // Registra el servicio 'Category' usando wagner.
    wagner.factory('Category', function() {
        return Category;
    });

    // retorna on objeto json donde la propiedad categoria tiene la forma de un objeto del modelo categoria.
    return {
        Category: Category
    };
};