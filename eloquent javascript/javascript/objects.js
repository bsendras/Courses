// Los objetos en JS son una coleccion de pares Key-Value, y metodos que los manejan.
// hay 2 formas de crear objetos:

// 1) LITERAL

// creo un objeto especificando lo que contiene.
var me = {
    name: "Bruno",
    age: 30
};

// creo un objeto vacio.
var me1 = {};

// 2) CONSTRUCTOR
// creo un objeto especificando lo que contiene.
var object3 = new Object({
    id: "object3",
    type: "Video"
});

// Creo un objeto vacio 
var me2 = new Object();

// ahora puedo añadirle propiedades y metodos.
me2["name"] = "Bruno";  // de esta forma ó
me2.age = 30;           // de esta otra. Esta es un atajo para la anterior.

// Arrays heterogeneos con objetos
var myArray = [3, true, "JavaScript", new Object({name: "Bruno", age: 30})];

console.log(myArray);

// jagged. Array elemets as objects.
var aList = [[1, {titulo: "Free Willie", duracion: 3600}, {actor1: "Jessey", actor2: "Glen"}],[2, {titulo: "Free Ryan"}]];
console.log(aList);
console.log(aList[0].length);
console.log(aList[1].length);

var myObject = {
  name: 'Eduardo',
  type: 'Most excellent',
  // Object property as Array.
  interests: ['Pets', 'Snowboard', 'Sportbikes']
};

// example of a contact list
var friends = new Object({
    bill: {
        firstName: "Bill", 
        lastName: "Gates",
        number: "(555) 555-5555",
        address: ['1 Windows Av.', 'Redmond', 'WA', '98052']
    },

    steve: {
        firstName: "Steve", 
        lastName: "Jobs",
        number: "(111) 111-1111",
        address: ['1 Apple St.', 'Cupertino', 'CA', '90210']
    },

    bruno: {
        firstName: "Bruno", 
        lastName: "Sendras",
        number: "(011) 3864-2541",
        address: ['123 Fake St.', 'Haedo', 'Moron', '1706']
    },

    mica: {
        firstName: "Micaela", 
        lastName: "Iseñ",
        number: "(011) 3864-2541",
        address: ['456 Juan B. Justo Av.', 'Haedo', 'Moron', '1706']
    }
});

// show entries
var list = function (friendList) {
    for (var friend in friends) {
        console.log(friend);
    }
};

list(friends);

// search info entrie.s
var search = function (friendList, name) {
    var result = [];
    for (var friend in friendList) {
        if (friendList[friend].firstName === name) {
            result.push(friendList[friend]);
            console.log(friendList[friend]);
            return result;
        }
    }
}

search(friends, "Bruno");


// METHODS

// here we define our method using "this", before we even introduce bob
var setAge = function (newAge) {
  this.age = newAge;
};
// now we make bob
var bob = new Object();
bob.age = 30;
bob.setAge = setAge;
  
// make susan here, and first give her an age of 25
var susan = new Object({
    age: 25,
    setAge: setAge
});

// here, update Susan's age to 35 using the method
susan.setAge(35);

// Custom Constructors. classes?

// Our person constructor
function Person (name, age) {
    this.name = name;
    this.age = age;

    this.whoAmI = function() {
        return "I'm " + this.name + " and I'm " + this.age + " years old."; 
    };
};

var person1 = new Person("Bruno", 30);
console.log(person1.whoAmI());

//OBJECTS AS FUNCTION PARAMETERS
// We can make a function which takes persons as arguments
// This one computes the difference in ages between two people
var ageDifference = function(person1, person2) {
    return person1.age - person2.age;
}

// Make a new function, olderAge, to return the age of
// the older of two people
var olderAge = function (person1, person2) {
    // Ejemplo del operador ternario.
    return (person1.age >= person2.age)?person1.age:person2.age;
};

var alice = new Person("Alice", 30);
var billy = new Person("Billy", 25);

// get the difference in age between alice and billy using our function
var diff = ageDifference(alice, billy);

console.log(diff);

console.log("The older person is " + olderAge(alice, billy));

// Other Object Example.
function Circle (radius) {
    this.radius = radius;
    this.area = function () {
        return Math.PI * this.radius * this.radius;
        
    };
    // define a perimeter method here
    this.perimeter = function () {
        return 2 * Math.PI * this.radius; 
    };
};


// TYPEOF Operator
// complete these definitions so that they will have
// the appropriate types
var anObj = { job: "I'm an object!" };
var aNumber = 42;
var aString = "I'm a string!";

console.log(typeof anObj); // should print "object"
console.log(typeof aNumber); // should print "number"
console.log(typeof aString); // should print "string"

// HasOwnProperty. Esta funcion viene heredada de Object
var myObj = {
    // finish myObj
    name: ""
};

console.log( myObj.hasOwnProperty('name') ); // should print true
console.log( myObj.hasOwnProperty('nickname') ); // should print false


// Asi listamos los nombres y valores de las propiedades de un objeto.
var nyc = {
    fullName: "New York City",
    mayor: "Bill de Blasio",
    population: 8000000,
    boroughs: 5
};

for (property in nyc) {
    // muestro los nombres
    console.log(property);
}

for (property in nyc) {
    // muestro los valores
    console.log(nyc[property]);  
}


