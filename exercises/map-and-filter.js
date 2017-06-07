const assert = require('power-assert');

const selectedShows = [
  {
    name: 'Avatar: The Last Airbender',
    type: ['Animated', 'Fantasy', 'Family'],
    seasons: 3
  },
  {
    name: 'Buffy the Vampire Slayer',
    type: ['Live Action', 'Fantasy', 'Teen'],
    seasons: 7
  },
  {
    name: 'Babylon 5',
    type: ['Live Action', 'Sci-Fi', 'Political'],
    seasons: 5
  },
  {
    name: 'Steven Universe',
    type: ['Animated', 'Fantasy', 'Family'],
    seasons: 4
  }
];

// (a -> Bool) -> Array a -> Array a
const filter = (filterFn, array) => {
  // implement your own filter here

}

// (a -> b) -> Array a -> Array b
const map = (mapFn, array) => {
  // implement your own map here
}


describe('Using filter to process an array', () => {
  it('keeps only the elements for which the predicate returns true', () => {
    const familyShows = filter(
      (show) => show.type.includes('Family'),
      selectedShows
    );

    assert.equal(Object.values(familyShows).length, 2);
    assert.equal(familyShows[0].name, 'Avatar: The Last Airbender');
    assert.equal(familyShows[1].name, 'Steven Universe');
  });
});

describe('Using map to process an array', () => {
  it('applies the function to each element in the array', () => {
    const showNames = map(
      (show) => show.name,
      selectedShows
    );

    assert.deepEqual(
      showNames,
      ['Avatar: The Last Airbender', 'Buffy the Vampire Slayer', 'Babylon 5', 'Steven Universe']
    );
  });
});
