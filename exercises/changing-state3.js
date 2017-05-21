const assert = require('power-assert');

const school = {
  name: 'Djinn-U',
  enrollment: [
    {
      name: 'Kazaam',
      courses: [0, 1]
    },
    {
      name: 'Majin Boo',
      courses: [1, 3]
    }
  ],
  enrolledStudents: 2
};

const enrollStudent = (name, courseIds, state) => {
  state.enrollment.push({
    name: name,
    courses: courseIds
  });
  state.enrolledStudents++;

  return state;
}

const schoolAfterEnrollment = enrollStudent('Jeannie', [2, 3], school);

describe('enrollStudent', () => {
  it('adds a new student to the enrollment array', () => {
    assert.deepEqual(
      schoolAfterEnrollment.enrollment,
      [
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
      ]
    );
  });

  it('updates the number of enrolled students', () => {
    assert.equal(schoolAfterEnrollment.enrolledStudents, 3);
  })

  it('does not modify the school name', () => {
    assert.equal(schoolAfterEnrollment.name, 'Djinn-U');
  })

  it('creates a new object in the process of enrolling the student', () => {
    assert.notEqual(schoolAfterEnrollment, school);
  });

  it('does not modify the original school', () => {
    assert.deepEqual(
      school.enrollment,
      [
        {
          name: 'Kazaam',
          courses: [0, 1]
        },
        {
          name: 'Majin Boo',
          courses: [1, 3]
        }
      ]
    );

    assert.equal(school.enrolledStudents, 2);
    assert.equal(school.name, 'Djinn-U');
  });
});
