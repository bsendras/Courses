var mongoose = require('mongoose');
var category = require('./category');

var productSchema = {
    name : {
        type: String,
        required: true
    },
    // pictures must start with "http://"
    pictures: [{
        type: String,
        match: /^http:\/\//i
    }],
    price: {
        amount: {
            type: Number,
            required: true
        },
        // only three supported currencies for now.
        currency: ['USD', 'EUR', 'GBP'],
        required: true
    },
    category: Category.categorySchema
};

// agregamos una propiedad virtual
// --------------------------------

// instanciamos el esquema.
var schema = new mongoose.Schema(productSchema);

// mapeamos las abreviaturas de la moneda a simbolos.
var currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£'
};

/*
 * Human-readable string form of price - $25 rather than 25 USD
 */ 

// Agrego la propiedad virtual displayPrice y la dotamos de una funcion getter.
schema.virtual('displayPrice').get(function () {
    return currencySymbols[this.price.currency] + '' + this.price.amount;
});

// podemos lograr lo mismo con una funcion helper, pero las propiedades virtuales tienen algunas propiedades
// que hacen de su uso una alternativa mas conveniente:

// - la propiedad virtual diplayPrice se expone como una propiedad plana del documento producto.
// - no hay necesidad de realizar llamadas a funciones.
// - las funciones toJSON y toObject (metodos de Mongoose) no soportan propiedades virtuales por defecto
//   pero podemos habilitarlo.

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

// Esto es muy util para el API REST porque permite que el API envie propiedades virtuales computadas
// junto con los documentos hacia el cliente Angular.js.

// module.exports = new mongoose.Schema(productSchema);
module.exports = new mongoose.Schema(schema);
module.exports.productSchema = productSchema;
