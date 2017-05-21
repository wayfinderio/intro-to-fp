const assert = require('power-assert');

const recommendedShows = {
  'Avatar: The Last Airbender' : {
    type: ['Animated', 'Fantasy', 'Family'],
    seasons: 3
  },
  'Buffy the Vampire Slayer': {
    type: ['Live Action', 'Fantasy', 'Teen'],
    seasons: 7
  },
  'Babylon 5': {
    type: ['Live Action', 'Sci-Fi', 'Political'],
    seasons: 5
  }
};

// these lines are not correct, fix them ///////
const newRecommendedShows = recommendedShows;

recommendedShows['Steven Universe'] = {
  type: ['Animated', 'Fantasy', 'Family'],
  seasons: 4
};
////////////////////////////////////////////////

describe('Updating an immutable object', () => {
  it('adds a new field to the new object', () => {
    assert.equal(Object.keys(newRecommendedShows).length, 4)
    assert.deepEqual(
      newRecommendedShows,
      {
        'Avatar: The Last Airbender' : {
          type: ['Animated', 'Fantasy', 'Family'],
          seasons: 3
        },
        'Buffy the Vampire Slayer': {
          type: ['Live Action', 'Fantasy', 'Teen'],
          seasons: 7
        },
        'Babylon 5': {
          type: ['Live Action', 'Sci-Fi', 'Political'],
          seasons: 5
        },
        'Steven Universe': {
          type: ['Animated', 'Fantasy', 'Family'],
          seasons: 4
        }
      }
    );
  });

  it('does not modify the original object', () => {
    assert.equal(Object.keys(recommendedShows).length, 3);
    assert.deepEqual(
      recommendedShows,
      {
        'Avatar: The Last Airbender' : {
          type: ['Animated', 'Fantasy', 'Family'],
          seasons: 3
        },
        'Buffy the Vampire Slayer': {
          type: ['Live Action', 'Fantasy', 'Teen'],
          seasons: 7
        },
        'Babylon 5': {
          type: ['Live Action', 'Sci-Fi', 'Political'],
          seasons: 5
        }
      }
    );
  });
});
