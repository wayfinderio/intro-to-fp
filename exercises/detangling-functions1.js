const assert = require('power-assert');

let dynamicLanguages = ['JavaScript', 'Ruby'];
const moreLanguages = ['Python', 'Lua', 'PHP', 'Perl'];

// This is the function to work on, see if you can convert it to a pure function
// you will want to reference the available Array functions.
// You are free to change the arguments, body, and return of the function
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
const addNewLanguages = () => {
  while (dynamicLanguages.length < 4) {
    dynamicLanguages.push(moreLanguages.shift());
  }
};

describe('Detangling an effectful function', () => {
  it('should be able to test the function here once it is refactored', () => {

    // You will need to change this to reflect the changes you perform above
    addNewLanguages();

    assert.deepEqual(dynamicLanguages, ['JavaScript', 'Ruby', 'Python', 'Lua']);
  });
});
