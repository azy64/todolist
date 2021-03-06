import Utilities from '../Utilities.js';

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

  test('if the targeted task is deleted', () => {
    // Arrange
    const tempData = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: false },
      { index: 3, description: 'Task 3', completed: false },
      { index: 4, description: 'Task 4', completed: false },
    ];
    const target = 3;
    const expectedRes = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: false },
      { index: 3, description: 'Task 4', completed: false },
    ];

    // Act
    const filtered = Utilities.clearOneTask(tempData, target);

    // Assert
    expect(filtered).toEqual(expectedRes);
  });

  test('empty array is returned when passing not an array as first attribute', () => {
    // Assert
    expect(Utilities.clearOneTask('tempData', 2)).toEqual([]);
  });

  test('data is not changed if second attribute index is not a number', () => {
    // Arrange
    const tempData = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: false },
      { index: 3, description: 'Task 3', completed: false },
      { index: 4, description: 'Task 4', completed: false },
    ];

    const tempDataCopy = [...tempData];
    // Assert
    expect(Utilities.clearOneTask(tempData, 'a')).toEqual(tempDataCopy);
  });

  test('passing first argument data as empty array and second attribute index is not a number', () => {
    // Assert
    expect(Utilities.clearOneTask([], 'a')).toEqual([]);
  });
});

describe('#clearCompletedTasks is working properly', () => {
  test('if all completed tasks are removed', () => {
    // Arrange
    const tempData = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: true },
      { index: 3, description: 'Task 3', completed: false },
      { index: 4, description: 'Task 4', completed: true },
    ];
    const expectedRes = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 3', completed: false },
    ];

    // Act
    const result = Utilities.clearCompletedTasks(tempData);
    // Assert
    expect(result).toEqual(expectedRes);
  });
  test('if nothing is deleted when all of the tasks are not completed', () => {
    // Arrange
    const tempData = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: false },
      { index: 3, description: 'Task 3', completed: false },
      { index: 4, description: 'Task 4', completed: false },
    ];

    // Act
    const result = Utilities.clearCompletedTasks(tempData);
    // Assert
    expect(result).toEqual(tempData);
  });
  test('if empty array is returned when passing not array attribute', () => {
    expect(Utilities.clearCompletedTasks('data')).toEqual([]);
  });
  test('if empty array is returned when passing empty array attribute', () => {
    expect(Utilities.clearCompletedTasks([])).toEqual([]);
  });
});
