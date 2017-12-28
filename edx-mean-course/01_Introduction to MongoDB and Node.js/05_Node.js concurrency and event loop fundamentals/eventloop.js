// Node se ejecuta de forma single threaded, por lo que las llamadas a operaciones como conectarse a la base de datos,
// registran manjadores de ecentos que invocan a nuestros callbacks, cuado ese evento ocurra.
// por ejemplo:

setTimeout(function (){
    // Codigo asincronico o no bloqueante.
    console.log('In timeout');
}, 0);

console.log('Not in timeout'); //Codigo sincronico o bloqueante

// Lo que sucede aqui es que setTimeout registra un manejador de evento que ejecutara nuestro callback en la proxima iteracion
// del loop de eventos. Hecho esto continua ejecutando la siguiente linea que imprimira 'Not in timeout' durante la iteracion actual.
// Por lo tanto la salida esperada de este codigo es la siguiente:
/*

Not in timeout
In timeout

*/

// En nodejs tipicamente las operaciones File I/O y Network I/O (operaciones de filesystem o de red) son asincronicas.
// Esto significa que van a registrar manejadores de eventos, por lo tanto son operaciones asincronicas.

// La mayoria de las operaciones contra mongoDB en este curso usan callbacks, por lo que son asincronicas. Esto 
// permite a nodejs brndar un alto nivel de concurrencia por default sin tener que manejar varios threads para asegurarse de no bloquear
// la cpu esperando a que se complete una operacion contra la base de datos.

// ahora que sabemos lo que significa pasar un callback y que sera registrado en el manejador de eventos en la iteracion actual y
// procesado en las sucesivas iteraciones podriamos usar la funcion console.log() como callbac para mostrar un array de elementos.

// toArray registra un event handler que sabe que cuando se produzca el evento debe ejecutar console.log para cada elemento del array.
// db.collection('test').find().toArray(console.log);