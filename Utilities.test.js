import Utilities from './src/Utilities.js';

const data = [];
const task = {
  description: 'clean my room 111',
};
const task2 = {
  description: 'cook food',
};
const data1 = [
  {
    index: 1,
    completed: false,
    description: 'clean my room 111',
  },
  { index: 2, description: 'cook food', completed: false },
];
describe('Test the methods add', () => {
  test('test for add method', () => {
    expect(Utilities.add(data, task)).toHaveLength(1);
  });
  test('test for add method to check the content', () => {
    expect(Utilities.add(data, task2)).toEqual(data1);
    // console.log('----', data);
  });
  test('test for add method for empty task', () => {
    const tmp = [...data];
    expect(Utilities.add(data, {})).toEqual(tmp);
    // console.log('----', data);
  });
  test('test for add method when task is not an object', () => {
    const tmp = [...data];
    expect(Utilities.add(data, 'hbhhh')).toEqual(tmp);
  });
  test('test for add method when data is not an Array', () => {
    expect(Utilities.add('kjnjfnjn', 'hbhhh')).toEqual([]);
  });
});

describe('#clearOneTask is working properly', () => {
  test('if only one task is deleted', () => {
    // Arrange
    const currentData = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: false },
      { index: 3, description: 'Task 3', completed: false },
      { index: 4, description: 'Task 4', completed: false },
    ];

    // Act
    const filtered = Utilities.clearOneTask(currentData, 2);

    // Assert
    expect(filtered).toHaveLength(currentData.length - 1);
  });
});
