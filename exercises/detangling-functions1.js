const assert = require('power-assert');

let dynamicLanguages = ['JavaScript', 'Ruby'];

const addNewLanguages = () => {
  const moreLanguages = ['Python', 'Lua', 'PHP', 'Perl'];

  while (dynamicLanguages.length < 4) {
    dynamicLanguages.push(moreLanguages.shift());
  }
};

describe('Detangling an effectful function', () => {
  it('should be able to test the pure parts of the function here once it is refactored', () => {

    // You will need to change this to reflect the reafactoring you perform above
    addNewLanguages();

    assert.deepEqual(dynamicLanguages, ['JavaScript', 'Ruby', 'Python', 'Lua']);
  });
});
