
let func = (x, y = 2) => x * y;
console.log(func(5));
console.log(func(2, 4));
console.log(func(1, undefined));
console.log(func(1, null));