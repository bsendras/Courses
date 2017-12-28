var assert = require('assert'); // Node.js built-in assertion framework, podria usar cualquier otro porque mocha no trae uno especifico.

 describe('my feature', function(){
    it('works', function () {
        assert.equal('A', 'A');
    });

    it('fails gracefully', function () {
        assert.throws(function () {
            throw 'Error!';
        });
    });
 });

 describe('my other feature', function () {
    it('async', function (done) {
        setTimeout(function () {
            done();
        }, 25);
    });
 });

 // > node_modules/.bin/mocha test.js para corer el test.   puede escribirse de forma mas compacta.
 // > node_modules/.bin/mocha -g fail tgest.js              -g Puedo correr solo algunos test que cincidan con una regexp.
 // > node_modules/.bin/mocha -R dot tgest.js               -R Permite cambiar el reporter, es decir el formato de salida.