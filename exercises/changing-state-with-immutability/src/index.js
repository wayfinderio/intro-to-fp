const { expect } = require('chai');



// Tests ///////

const result = enrollStudent('Jeannie', [2, 3], school);

expect(result.enrollment).to.deep.equal([
  {
    name: 'Kazaam',
    courses: [0, 1]
  },
  {
    name: 'Majin Boo',
    courses: [1, 3]
  },
  {
    name: 'Jeannie',
    courses: [2, 3]
  },
]);

// Turn this on to expose the problem

// expect(result).to.not.equal(school);
//
// expect(school.enrollment).to.deep.equal([
//   {
//     name: 'Kazaam',
//     courses: [0, 1]
//   },
//   {
//     name: 'Majin Boo',
//     courses: [1, 3]
//   }
// ]);
