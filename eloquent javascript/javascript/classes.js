// En realidad los objetos son instancias de una clase.

// the original Animal class and sayName method
function Animal(name, numLegs) {
    this.name = name;
    this.numLegs = numLegs;
    this.isAlive = true;
}
// Instanciamos un animal.
var animal1 = new Animal("Roco", 4);

// Java script permite modificar la definicion de la clase una vez ya instanciada.
// Agregamos un metodo que antes no existia.
Animal.prototype.sayName = function() {
    console.log("Hi my name is " + this.name);
};

// Ahora el animal sabe decir su nombre.
animal1.sayName();


// Herencia.

// define a Penguin class
function Penguin (name) {
    this.name = name;
    this.numLegs = 2;
}

// set its prototype to be a new instance of Animal
// Asi indicamos que Penguin herede las propiedades y metodos de Animal.
Penguin.prototype = new Animal();

var penguin = new Penguin("Happy");
penguin.sayName();

function Emperor (name) {
    this.name = name;
    this.saying = "Waddle waddle";
}

// create an "emperor" object and print the number of legs it has
Emperor.prototype = new Penguin();

// En este caso vemos que tambien se heredan las propiedades.
var emperor = new Emperor("Happy1");
console.log(emperor.numLegs);

var myEmperor = new Emperor("Jules");

// Remember how the prototype chain works: if a 
// property is not defined for a class, this class's 
// prototype chain will be traversed upwards until one
// is found (or not) in a parent (higher) class.
console.log( myEmperor.saying ); // should print "Waddle waddle"
console.log( myEmperor.numLegs ); // should print 2
console.log( myEmperor.isAlive ); // should print true

// Miembros publicos y privados.

// Por default todos los miembros de una clase son publicos
// tal cual se declararon hasta ahora.

// La forma de declarar y acceder miembros privados es la siguiente
function Person(first,last,age) {
   this.firstname = first;
   this.lastname = last;
   this.age = age;
   // Miembro privado
   var bankBalance = 7500;
  
   // clasico getter (metodo publico) para acceder desde afuera.
   // notar que NO se devuelve "this.bankBalance"
   // "this." estaria haciendo referncia a un miembro publico
   // cmo si lo hicieramos desde afuera. 
   this.getBalance = function() {
      // your code should return the bankBalance
      return bankBalance;
   };

   // Metodo privado.
   var getBalance2 = function() {
      // your code should return the bankBalance
      return bankBalance;
   };

   // tambien podemos declarar un metodo publico que acceda a uno privado
   this.askTeller = function () {
       //devuelvo el metodo.
       return getBalance2;
   };
}

var john = new Person('John','Smith',30);
// Esto NO da excepcion, pero si devuelve "undefined" porque la propiedad no es accesible desde fuera de la clase.
// y opera cuando agregamos propiedades a los objetos.
console.log(john.bankBalance);

// create a new variable myBalance that calls getBalance()
var myBalance = john.getBalance();
// esto devuelve correctamente el dato.s
console.log(myBalance);

// Esto SI produce una excepcion porque es un metodo privado
// console.log(john.getBalance2());
var myBalanceMethod = john.askTeller();
var myBalanceValue = myBalanceMethod();
console.log(myBalanceValue);
