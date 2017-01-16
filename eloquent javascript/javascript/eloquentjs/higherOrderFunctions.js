/* A higher-order function is a functio that
   operate in other functions, either by taking
   them as a parameter or by returning them. 

  Higher-order function allow us to abstrat
  over actions, not just values as is usual */

function forEachDo(array, action) {
    for (element in array) {
        /* Remember! element is the name of
        the element in the array NOT the value */
        action(array[element]);
    }
}
var names = ["Waldo", "Brandon", "Robert"];

/* As functions can be stored in a variable or simply
  exist as a value, we cpuld use several aproaches to this. */

/* 1 */
forEachDo(names, console.log);

/* 2 */
var thisAction = console.log;
forEachDo(names, thisAction);

/* 3 */
var oneLine = "";
forEachDo(names, function (name) {
    oneLine += name + " "; 
});
console.log("\""+ oneLine + "\"");

/* fortunately Array already has a foreach method
   so we dont have to write it by ourselves */
names.forEach(function (element) {
    console.log(element);
});

var obj = {
    nombre: "Robert",
    age: 39
}

var jsonObj = JSON.stringify(obj);
var obj1 = JSON.parse(jsonObj);

console.log(jsonObj);
console.log(obj1);

