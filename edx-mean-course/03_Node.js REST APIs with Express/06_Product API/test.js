var express = require('express');
var assert = require('assert');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';

describe('Products API', function() {
	var server;
	var Catgory;
	var Product;

	before(function() {
		// Bootstrap the server
		var app = express();
		models = require('./models')(wagner); 
		app.use(require('./api')(wagner));

		// start server
		server = app.listen(3000);

		// Make models available in tests
		Category = models.Category;
		Product = models.Product;		
	});

	after(function() {
		// shoot down server.
		server.close();
	});

	beforeEach(function (done) {
		// Make sure products is empty before ecah test.
		Product.remove({}, function(error) {
			assert.ifError(error);

			Category.remove({}, function(error){
				assert.ifError(error);
				done();
			});
		});			
	});

	it('Can load a product by id', function(done) {
		// Create a single product.
		var PRODUCT_ID = '00000000000000000000001';	
		var product = {
			name: 'LG G4',
			_id: PRODUCT_ID,
			price: {
				amount: 300,
				currency: 'USD'
			}
		};
		Product.create(product, function(error, doc) {
			assert.ifError(error);
			var url = URL_ROOT + '/product/id/' + PRODUCT_ID;
			// Make http request to the api endpoint: "http://localhost/3000/product/id/00000000000000000000001"
			superagent.get(url, function(error, res) {
				assert.ifError(error);
				var result;
				// And make sure we got the LG G4 back
				assert.doesNotThrow(function() {
					result = JSON.parse(res.text);
				});
				assert.ok(result.product);
				assert.equal(result.product._id, PRODUCT_ID);
				assert.equal(result.product.name, 'LG G4');
				done();
			});
		});
	});

	it('Can load all products in a category with sub-categories', function(done) {
		// Create an array for a category tree structure.
		var categories = [
			{ _id: 'Electronics' },
			{ _id: 'Phones', parent: 'Electronics' },
			{ _id: 'Laptops', parent: 'Electronics'},
			{ _id: 'Bacon' }
		];
		// Create an array of products living in that category tree. 
		var products = [
			{
				_id: '00000000000000000000001',
				name: 'LG G4',
				category: { _id: 'Phones', ancestors: ['Electronics', 'Phones'] },
				price: {
					amount: 300,
					currency: 'USD'
				}				
			},
			{
				_id: '00000000000000000000002',
				name: 'Asus Zenbook Prime',
				category: { _id: 'Laptops', ancestors: ['Electronics', 'Laptops'] },
				price: {
					amount: 2000,
					currency: 'USD'
				}								
			},
			{
				_id: '00000000000000000000003',
				name: 'Flying Pigs Farm Pasture Raised Pork Bacon',
				category: { _id: 'Bacon', ancestors: ['Bacon'] },
				price: {
					amount: 20,
					currency: 'USD'
				}								
			}
		];

		// Create 4 categories
		Category.create(categories, function(error, categories) {
			assert.ifError(error);

			// And 3 products
			Product.create(products, function(error, products) {
				assert.ifError(error);
				var url = URL_ROOT + '/product/category/Electronics';
				// Make an http request to the api endpoint: "http://localhost/3000//product/category/Electronics" 
				superagent.get(url, function(error, res) {
					assert.ifError(error);
					var result;
					assert.doesNotThrow(function() {
						result = JSON.parse(res.text);
					});
					// Should be in ascending order by name (primero probamos que devuelva bien en el orden default)
					assert.equal(result.products.length, 2);
					assert.equal(result.products[0].name, 'Asus Zenbook Prime');
					assert.equal(result.products[1].name, 'LG G4');
					// // Sort by price, ascending.
					var url = URL_ROOT + '/product/category/Electronics?price=1';
					superagent.get(url, function(error, res) {
						assert.ifError(error);
						var result;
						assert.doesNotThrow(function() {
							result = JSON.parse(res.text);
							// muetro la respuesta para debug. muestro el json parseado en lugar del texto.
							// console.log(result);
						});
						// Should be in ascending order by price (ahora probamos que devuelva bien, al ordenar por precio)
						assert.equal(result.products.length, 2);
						assert.equal(result.products[0].name, 'LG G4');
						assert.equal(result.products[1].name, 'Asus Zenbook Prime');
						done();
					});
				}); 
			});
		});
	});
});
