const { expect } = require('chai');

const pipe =
  (thisHappensFirst, thisHappensSecond) =>
    (...args) => thisHappensSecond(thisHappensFirst(...args));

const compose =
  (thisHappensSecond, thisHappensFirst) =>
    (...args) => thisHappensSecond(thisHappensFirst(...args));


// Boolean -> String
const a = (bool) => bool ? "Yes!" : "So sad :(";

// Array Number -> Boolean
const b = (numbers) => numbers.every((n) => n >= 0);

// String -> Number
const c = (str) => str.length;

// pick one of these (or try it both ways)
const moar = compose(?);
const moar = pipe(?);

expect(moar([99, 6, -2])).to.equal(9);
