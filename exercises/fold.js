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


const getTotalSeasons = (shows) => {
  const extractSeason =
    (show, totalSeasons) =>
      totalSeasons + show.seasons;

  return fold(extractSeason, 0, shows);
}


const fold = (fn, init, array) => {
  // your implementation of fold goes here
}

describe('Using fold to process an array', () => {
  it('applies the fold function to each element in the array', () => {
    const total = getTotalSeasons(selectedShows);

    assert.equal(total, 19);
  });
});
