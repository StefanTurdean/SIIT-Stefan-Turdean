
var array = [ 1, 2, 3, 4, 56, 232, 45, 12, 4, 6, 8, 8,8, 1, 1]

// 1 display in the console the numbers from 1 to 20

for (let index = 1; index <= 20; index++) {
    console.log(index);    
}

console.log(" ");
// 2 display in the console the odd numbers from 1 to 20

for (let index = 0; index <= 20; index++) {
    if (index % 2 == 1) {
        console.log(index);
    }    
}

console.log(" ");
// 3 compute the sum of the elements of an array and display it in the console

var sum = 0;

for (let index = 0; index < array.length; index++) {
    sum = sum + array[index]    
}

console.log(sum);

console.log("");
// 4 compute the maximum of the elements of an array and display it in the console

var max = array[0];

for (let index = 0; index < array.length; index++) {
    if (max < array[index]) {
        max = array[index]        
    }
}

console.log(max);

console.log("");

// 5 compute how many times a certain element appears in an array - tips: use object, var element = 2

var counter = {}

for (let index = 0; index < array.length; index++) {
    counter[array[index]] = 0;
}

for (let index = 0; index < array.length; index++) {
    if (counter[array[index]] != null) {
        counter[array[index]] = counter[array[index]] + 1
    }
}
    
console.log(counter);

console.log("");
// 6 Using nested control structures (doua for + if) for generate the following pattern
// 0 1 0 1
// 1 0 1 0
// 0 1 0 1
// 1 0 1 0

var matrix = [];

for (let i = 0; i < 4; i++) {
    matrix[i] = [];
    for (let j = 0; j < 4; j++) {
        if (i % 2 == 0) {
            matrix[i][j] = j % 2
        }
        else{
            matrix[i][j] = i % 2 - j % 2
        }
    }    
}

console.log(matrix);