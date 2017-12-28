var express = require('express');
var status = require('http-status');

module.exports = function(wagner) {

  var api = express.Router();
  
  /**
   *summary:
   *  - returns a product by its ID.
   * 
   *endpoint:
   *  - /product/id/:id
   * 
   *params:
   *  - :id (prouct id); 
   */
  api.get('/product/id/:id', wagner.invoke(function(Product) {
    return function (req, res) {
      // la unica diferencia con el metodo analogo del api de categorias es el metodo handleOne.bind() que estamos usando como callback. 
      // .bind recibe 3 parametros: 
      Product.findOne({ _id: req.params.id }, handleOne.bind(null,      // valor de la variable "this". no lo usamos en este ejemplo. 
                                                             'product', // Los dos parametros siguientes('product y res') se vinculan posicionalmente
                                                             res));     // a los parametros de la funcion "handleOne" de izquierda a derecha.
    };
  }));

  /**
   *summary:
   *  - returns all products within a given category including sub-categories.
   * 
   *endpoint:
   *  - /product/category/:id
   * 
   *params:
   *  - :id (category id); 
   */
  api.get('/product/category/:id', wagner.invoke(function(Product) {
    return function(req, res) {
      var sort = {name: 1};
      if (req.query.price === '1') {
        sort = { 'internal.approximatePriceUSD': 1 };
      }else if (req.query.price === '-1') {
        sort = { 'internal.approximatePriceUSD': -1 };
      }

      Product.find({ 'category.ancestors': req.params.id }).sort(sort).exec(handleMany.bind(null, 'products', res));
    };
  }));

  return api;
};

/**
 *Summary:
 *  - La funcion handleOne define reglas genericas
 *para manejar los resultados de las llamadas a [model].findOne().
 * 
 *Params:
 *  - property: is a property name.
 *  - res: is a express response object.
 *  - error, result: estos son el error y el resultado provenientes de findOne().
 */
function handleOne(property, res, error, result) {
  // Trato genericamente los tipos de error.
  if (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
  }
  if (!result) {
    return res.status(status.NOT_FOUND).json({ error: 'Not found'});
  }
  // Aqui todo esta bien. Retorno genericamente el resultado.
  var json = {};
  json[property] = result;
  res.json(json);
}

/**
 *Summary:
 *  - La funcion handleMany define reglas genericas para manejar los resultados de las llamadas a [model].find().
 * 
 *Params:
 *  - property: is a property name.
 *  - res: is a express response object.
 *  - error, result: estos son el error y el resultado provenientes de find().
 */
function handleMany(property, res, error, result) {
  if (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
  }
  if (!result) {
    return res.status(status.NOT_FOUND).json({ error: 'Not found' });
  }

  var json = {};
  json[property] = result;
  res.json(json);
}
