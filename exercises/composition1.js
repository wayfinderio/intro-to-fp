const assert = require('power-assert');

// replace this with a real implementation
const pipe =
  () =>
    () => {}

const compose =
  () =>
    () => {}

// Boolean -> String
const second = (number) => number.toString() + "!";

// Array a -> Array a -> Number
const first = (numbers1, numbers2) => Math.max(numbers1.length, numbers2.length);

const manualResult = second(first([81,2,51], [6,4,12,1,8]));

const composedFn = compose(second, first);
const composedResult = composedFn([81,2,51], [6,4,12,1,8]);

const pipedFn = pipe(first, second);
const pipedResult = pipedFn([81,2,51], [6,4,12,1,8]);

describe('Compose', () => {
  it('Produces the same result as running the functions one at a time and passing along the result', () => {
    assert.equal(composedResult, manualResult);
  })
});

describe('Pipe', () => {
  it('Produces the same result as running the functions one at a time and passing along the result', () => {
    assert.equal(pipedResult, manualResult);
  })
});
