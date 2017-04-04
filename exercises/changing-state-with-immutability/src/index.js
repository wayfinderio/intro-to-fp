const { expect } = require('chai');

const school = {
  courses: [
    {
      id: 0,
      title: 'Wish Fulfillment',
      capacity: 25
    },
    {
      id: 1,
      title: 'Foundations Of Deception',
      capacity: 200
    },
    {
      id: 2,
      title: 'Advanced Wish Fulfillment',
      capacity: 10
    },
    {
      id: 3,
      title: 'Overcoming Stereotypes',
      capacity: 12
    }
  ],
  enrollment: [
    {
      name: 'Kazaam',
      courses: [0, 1]
    },
    {
      name: 'Majin Boo',
      courses: [1, 3]
    }
  ]
};

const enrollStudent = (name, courseIds, state) => {
  state.enrollment.push({
    name: name,
    courses: courseIds
  });

  return state;
}

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
