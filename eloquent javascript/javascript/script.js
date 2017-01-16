var divideByThree = function (number) {
    var val = number / 3;
    console.log(val);
};

divideByThree(6);

var greeting = function (name) {
    console.log("Great to see you," + " " + name);
};

greeting("Bruno Sendras");

var foodDemand = function (food) {
    console.log("I want to eat" + " " + food); 
};

foodDemand("Pizza Hut and Dunkin' Donuts");

var timesTwo = function (number) {
    return number * 2;
}

var newNumber = timesTwo(100);
console.log(newNumber);

var quarter = function (number) {
    return number / 4;
};

if (quarter(12) % 3 === 0) {
    console.log("Is divisible by 3.");
} else {
    console.log("Is not divisible by 3.");
};

var perimeterBox = function (length, width) {
    return length + length + width + width;
};

// "var" keyword declares a variable in the current scope.

// devuelve un numero random entre 0 y 1
computerChoice = Math.random();
console.log(computerChoice);

for (var i = 5; i <= 50; i+=5) {
	console.log(i);
}

// You are now declaring an array.
// Arrays are an awesome data structure!
var junk = ["rock", "paper", 12, 14];

console.log(junk);

for (var i = 0; i < junk.length; i++) {
    console.log("Elemet " + i + ":" + junk[i]);
}

var text = "Bruno, since text could be quite long, \
you can use a backslash Bruno at the end of each \
line to make your string \"wrap\" to the next line, \
like Brun1o this";

var myName = "Bruno";

var hits = [];

for (var i = 0; i < text.length; i++) {
    if (text[i] === "B") {
        if (text.indexOf(myName, i) === i) {
            hits.push(text.substr(i, myName.length));
        }
    }
}

if (hits.length === 0) {
    console.log("Your name wasn't found!");
} else {
    console.log(hits);   
}

var loop = function(){
	var count = 3;
	while(count > 0){
		//Your code goes here!
		console.log("I'm looping!");
		count--;
	}
};

loop();

var loopCondition = false;

do {
	console.log("I'm gonna stop looping 'cause my condition is " + loopCondition + "!");	
} while (loopCondition);

var figthADragon = function () {
    var slaying = true;
    var youHit = Math.floor(Math.random() * 2);
    var damageThisRound = Math.floor(Math.random() * 5 + 1);
    var totalDamage = 0;

    while (slaying) {
        if (youHit) {
            totalDamage += damageThisRound;
            console.log("You hit the dragon and did " + damageThisRound + " damage!");
            if(totalDamage >= 4) {
                console.log("You defeat the dragon!");
                slaying = false;    
            }
        } else {
            console.log("The dragon burniates you! you're a toast!");
            slaying = false;    
        }
    }
}

figthADragon();

isNaN("Bruno");     // true
isNaN(NaN);         // true
isNaN(undefined);   // true
isNaN(42);          // false
isNaN("42");        // false

var trySwitch = function (color) {
    switch(color) {
    case 'red':
        console.log("Red's a good color!");
        break;
    case 'blue':
        console.log("That's my favorite color, too!");
        break;
    //Add your case here!
    case 'yellow':
        console.log("It sounds like piss :(");
        break;
    default:
        console.log("I don't think that's a primary color!");
    }
}

trySwitch("yellow");

// Array heterogeneo
var myArray = [21, true, "Bruno", NaN, undefined, null];
for (var j = 0; j < myArray.length; j++) {
    console.log(myArray[j]);
}

// Array multidimensional (array of arrays)
var newArray = [[1,0,0],[0,1,0],[0,0,1]];
for (var j = 0; j < newArray.length; j++) {
    console.log(newArray[j]);
}

// Jagged array
var jagged = [[1],[0,1],[0,0,1]];
for (var j = 0; j < jagged.length; j++) {
    console.log(jagged[j]);
}


// Here is an array of multiples of 8. But is it correct?
var multiplesOfEight = [8,16,24,32,40,58];

// Test to see if a number from the array is NOT a true
// multiple of eight. Real multiples will return false.
// Se pueden evaluar expresiones booleanas en una linea.
var answer = multiplesOfEight[5] % 8 !== 0;