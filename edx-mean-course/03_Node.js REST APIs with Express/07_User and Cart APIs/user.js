var mongoose = require('mongoose');

var userSchema = {
  // Perfil personal publico
  profile: {
    username: {
      type: String,
      require: true,
      lowercase: true
    },
    picture: {
      type: String,
      required: true,
      match: /^https:\/\//i
    }
  },
  // datos privados
  data: {
    oauth: {
      // this string will serve as the unique identifier for this user's facebook account.
      type: String,
      required: true
    },
    cart: [{
      // cada objeto del carrito tiene producto y cantidad.
      product: {
        type: mongoose.Schema.Types.ObjectId
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }      
    }]
  }
}

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;

// Entre user y product existe una relacion de muchos a muchos.
// un usuario puede tener muchos productos en su carrito y un producto puede estar en el carrito de muchos usuarios.
// Por el principio de menor cardinalidad embebemos la lista de productos del carrito en el modelo de datos del usuario
// ya que un usuario comprara generalmente en el orden de las decenas de productos a la misma vez.
// Por el contrario, ya que cientos, miles o millones de usuarios pueden comprar un mismo producto, esto resultaria en embeber en el producto
// un array que represente la lista de los cientos, miles o millones de usuarios que lo han añadido a su carrito, violando dicho principio.


// oauth y cart, resultan ser elementos de informacion sensible, debido a que no queremos que otros usuarios vean la el identificador de la cuenta
// de facebook ni que productos suele comprar otro usuario. Usualmente nos interesará ocultar este tipo de datos.
// A diferencia de sql, mongo db no provee niguna noción integrada de control de acceso, de modo que no podemos decirle a mongodb que solo
// un usuario determinado tiene acceso a determinados datos.
// Sinembargo para estos datos sensibles, en esta colección, se resuelve de la siguiente manera.
// La habilidad de mongodb de anidar documentos dentro de otros documentos (sub-documentos) brinda una forma intuitiva de
// implementar desde nuestra aplicacion el control de acceso.

// Los queries de mongodb incorporan la nocion de "Proyeccion" que nos permite ocultar campos dela salida de un query.
// Ejemplo:
// si usamos findOne sin parametros, obtenemos un documento completo.
// db.users.findOne();

// Si usamos findOne, sin criterios de busqueda(matchea con todos los documentos) pero indicamos la proyeccion en el segundo parametro.
// Obtenemos el documento con los campos proyectados ocultos.
// params: 1) Search Criteria / query example 2) proyection
// db.user.findOne({}, { data: 0 });

// Asi evitamos que nuestro codigo de acceso publico muestre info sensible.

// De la misma forma podemos querer evitar que e usuario pueda editar.
// La forma preferida de hacerlo en el MEAN stack tambien se lleva a cabo a traves de sub-documentos.
