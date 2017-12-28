var mongoose = require('mongoose');
var Category = require('./category');

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

module.exports = new mongoose.Schema(productSchema);
module.exports.productSchema = productSchema;