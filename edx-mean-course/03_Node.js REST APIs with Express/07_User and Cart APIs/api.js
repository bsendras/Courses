var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');

module.exports = function(wagner) {
    // creo el subrouter que voy a devolver.
    var api = express.Router();

    // de la misma forma que app.use() la usabamos para atachar el express subrouter en index.js
    // ahora usamos ".use()" par attachar un instancia del body-parser que paresea json. La funcion ".use" puede atachar todo tipo
    // de middleware a los express subrouters. Esto significa que antes de que cualquiera de los routHandlers o endpoints se ejecute
    // este body-parser parsea el json contenido en el body del httprequest, y expone los datos parseados a los routeHandlers en la propiedad
    // "req.body" 
    api.use(bodyparser.json());

    // Este routeHandler recibe y setea los datos del carrito del usuario logueado.
    api.put('/me/cart', wagner.invoke(function(User) {
        return function(req, res) { // esta funcion es devuelta por wagner.invoke y va a parar al segundo parametro del api.put('/me/cart', * )
            try {
                // El campo "data.cart" es tomado del body del http request por el body-parser, quien lo hace disponible a traves de req.body.
                var cart = req.body.data.cart;
            } catch (e) {
                // Si no hubiera un campo "data.cart" en el body, el body parser no puede hacerlo disponible req.body,
                // por lo tanto intentar acceder a req.body.data.cart da una excepcion en body.data, la cual atrapamos
                // y tratamos devolviendo un BAD_REQUEST status, lo que se interpreta del lado cliente como una solicitud
                // mal construida o que no provee los datos necesarios para procesarse.
                return res.status(status.BAD_REQUEST).json({ error: 'No cart specified!' });
            }

            // una vez que se obtiene la informacion del carrito en el campo data.cart
            // seteamos el carrito del usuario logueado con el valor provisto en data.cart y guardamos el estado actual del usuario.
            // Ahora, que pasa con la integridad de datos aca? estamos sobreescribiendo el array de productos del carrito entero
            // con la info que brinda el usuario y podria guardar informacion invalida. Para evitar esto Mongoose se encarga de
            // manejar lo que se llama "casting invalidationß", lo que significa que si los Obj ID o la cantidades son invalidas,
            // mongoose falla en la insercion y no se persisten dichos cambios (.save fails).
            req.user.data.cart = cart;
            req.user.save(function(error, user) {
                if (error) {

                    console.log('Esta dando un error en api.js:47:22 req.user.save()');
                    // si algo salio mal actualizando la db, devolvemos un INTERNAL_SERVER_ERROR status
                    return res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
                }
                // finalmente devolvemos el estado del usuario actualizado.
                return res.json({ user: user });
            });

            // en la siguiente sección (login with facebook) vamos a usar un midleware similar a body-parser
            // el cual se encargara de hacer disponible la propiedad "req.user" usada mas arriba, y setearla con la informacion 
            // del usuario de facebook actualmente logueado.
        };
    }));

    // este routehandler obtiene los datos del usuario actualmente logueado incluyendo su carrito.
    // recordemos que el modelodel usuario define al carrito de ese usuario como un array que contiene object ids de productos.
    // Aqui veremos como resolvemos esta relacion uno a muchos en nuestra api. Este handler no necesita realizar inyeccion de dependencias.
    api.get('/me', function(req, res) {
        if (!req.user) {
             return res.status(status.UNAUTHORIZED).json({ error: 'Not logged in' });
        }
        // mongoose cuenta con esta funcion muy util llamada populate, que superficialmente se comporta
        // como un join en SQL. Una vez ontenido el documeto "user" correspondiente al usuario actualmente
        // logueado, este contiene un array ("data.cart") que contiene los Objects ids de los productos en su carrito.    
        req.user.populate(
            // ejecutamos "populate sobre el path "data.cart.product", asi mongoose va a reemplazar cada object id, por
            // el documento correspondiente al producto refereenciado en el array del carrito. Esro ejecuta realmente el query
            // de todos los prductos en el carrito.
            { path: 'data.cart.product', model: 'Product' },
            handleOne.bind(null, 'user', res)
        );
    });

    return api;    
};