var express = require('express');
var status = require('http-status');

module.exports = function(wagner) {
    var api = express.Router();

    // ROUTE 1: Category by _Id
    // e.g. http://localhost:3000/api/v1/category/id/electronics
    api.get('/category/id/:id', wagner.invoke(function(Category) {
        return function (req, res) {
            // Invoke obtiene wl modelo Category que ahora queda disponible en este scope por clousure.
            Category.findOne({ _id: req.params.id }, function(error, category) {
                // error de findOne.
                if (error) {
                    return res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
                };
                // no hay resultados
                if (!category) {
                    return res.status(status.NOT_FOUND).json({ error: 'Not found' });
                } 
                // Todo bien! devuelvo el documento.
                res.json({ Category: category });
            });
        };
    }));

    api.get('/category/parent/:id', wagner.invoke(function(Category) {
        return function (req, res) {
            Category.find({ parent: req.params.id }).sort({ _id: 1 }).exec(function(error, categories) {
                // error de find
                if (error) {
                    return res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
                }
                // Todo bien!
                res.json({ categories: categories });
            });
        };    
    }));

    // devolvemos el route para que otras capas de aplicacion puedan
    // incluirlo usando "app.use()".
    return api;
};