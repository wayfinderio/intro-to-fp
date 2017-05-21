const assert = require('power-assert');

const favoriteThings = [
  'Raindrops on roses',
  'Whiskers on kittens',
  'Bright copper kettles',
  'Warm woolen mittens'
];

// these lines are not correct, fix them ///////
favoriteThings.push('Brown paper packages tied up with strings');
const newFavoriteThings = favoriteThings;
////////////////////////////////////////////////

describe('Updating an immutable array', () => {
  it('adds the new item to the new array', () => {
    assert.equal(5, newFavoriteThings.length)
    assert.deepEqual(
      newFavoriteThings,
      [
        'Raindrops on roses',
        'Whiskers on kittens',
        'Bright copper kettles',
        'Warm woolen mittens',
        'Brown paper packages tied up with strings'
      ]
    );
  });

  it('does not modify the original array', () => {
    assert.equal(4, favoriteThings.length);
    assert.deepEqual(
      favoriteThings,
      [
        'Raindrops on roses',
        'Whiskers on kittens',
        'Bright copper kettles',
        'Warm woolen mittens'
      ]
    );
  });
});
