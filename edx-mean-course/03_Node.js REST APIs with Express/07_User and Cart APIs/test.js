var express = require('express');
var assert = require('assert');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';

describe('User and Cart API', function() {
    var server;
    var Category;
    var Product;
    var User;

    before(function () {
        // bootstrap the server
        var app = express();
        models = require('./models')(wagner);

        // Make models available in tests
        Category = models.Category;
        Product = models.Product;
        User = models.User;      

        // Recordemos que los routehandlers del api utilizan la propiedad "req.user"
        // Y que asumimos que un midleware similar a body-parser iba a setearla.
        // Para este test simple vamos a atachar un midleware que se encargue de setear req.user
        // con el unico deocumento user creado en la db se la siguiente forma.
        app.use(function(req, res, next) {
           // en este caso el midleware es una funcion escrita por nosotros.
            User.findOne({}, function (error, user) {
                assert.ifError(error);
                req.user = user;
                next();
            });
        });

        app.use(require('./api')(wagner));

        // start server
        server = app.listen(3000);  
    });

    after(function () {
        // Shut the server down.
        server.close();
    });

    beforeEach(function (done) {
        // Make sure collections are empty befor each test.
        User.remove({}, function (error) {
            assert.ifError(error);

            Product.remove({}, function (error) {
                assert.ifError(error);

                Category.remove({}, function (error) {
                    assert.ifError(error);

                    // ya limpie todo, ahora inserto la info de prueba.

                    // Populate db with some data.
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
                    // Create an array with a single user. 
                    var users = [
                        {
                            profile: {
                                username: 'bsendras',
                                picture: 'https://avatars1.githubusercontent.com/u/8486139?v=4&s=400'
                            },
                            data: {
                                oauth: 'invalid',
                                cart: []
                            }
                        }            
                    ];

                    // debo insertar los documentos en la db.
                    Category.create(categories, function(error) {
                        assert.ifError(error);
                        Product.create(products, function(error) {
                            assert.ifError(error);
                            User.create(users, function(error) {
                                assert.ifError(error);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    var PRODUCT_ID = '00000000000000000000001';

    it('Can save users cart', function(done) {
        var url = URL_ROOT + '/me/cart';
        superagent.put(url).send({
            data: {
                cart: [{ product: PRODUCT_ID, quantity: 1 }]
            }
        }).end(function (error, res) {
            assert.ifError(error);
            assert.equal(res.status, status.OK);
            User.findOne({}, function(error, user) {
                assert.ifError(error);
                assert.equal(res.data.cart.length, 1);
                assert.equal(res.data.cart[0].Product, PRODUCT_ID);
                assert.equal(res.data.cart[0].quantity, 1);
                done();
            });
        });
    });

    it('Can load user data', function(done) {
        done();
    });    
});