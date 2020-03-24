// Functional mini-toolbox

// A classical composition
const compose = (f: Function, g: Function): Function => (x: any) => f(g(x));

// Variadic compose
const composeAll = (...fns: Function[]): Function => fns.reduceRight(compose);
