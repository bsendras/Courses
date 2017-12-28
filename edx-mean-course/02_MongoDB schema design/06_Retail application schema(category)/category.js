var mongoose = require('mongoose');

categorySchema = {
    // el dato guardado en _id se castea a string, en este ejemplo el id sera el nombre de la categorya.
    _id: { type: String },

    // parent solo puede almacenar objetos de este typo
    parent: { 
        type: String,
        ref: 'Category'
    },
    // ancestors solo puede almacenar estos objetos en el array
    ancestors: [{
        type: String,
        ref: 'Category'
    }]
};
// El schema aplica las limitaciones anotadas en cada regla.

module.exports = new mongoose.Schema(categorySchema);

// exportamos el objeto javascript plano por separado para poder reusar el esquema, como hicimos en el esquema Producto,
// y asi no volver a escribir las reglas.
module.exports.categorySchema = categorySchema;

// Usando indices multiclave (multi-key) tenemos ahora una forma eficiente de responder a preguntas como
// cuales son las subcategorias de "electrnics" o cuales son hijas directas de "Phones", o cuales son los ancestros
// de "android".

//ej:
// para encontrar todas las subcategorias de electronics, buscamos todos los documentos que contengas "electronics en su array de ancestros.
// db.categories.find({ ancestors: 'electronics' });

// para encontrar categorias que son hijas directas de "Phone" buscamos categorias que tengan en la propiedad parent el valor "Phone"
// db.categories.find({ parent: 'phone' });
// es necesario mantener este valor por separado debido a que mongo db no soporta consultas como "el ultimo del array ancestors ..."

// Asi ahora podemos encontrar todos los productos bajo la categoria "Phone" debido a que en "produc" se reusa el schema "category"
// db.product.find({ 'category.ancestors': 'Phone' }).pretty();

// NOTA: observar que el nombre del atributo compuesto del query lleva punto en el medio y se escribe entre comillas.