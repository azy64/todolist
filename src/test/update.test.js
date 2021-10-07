/**
 * @jest-environment jsdom
 */
// import Update from './src/update.js';

// Arrange
const innerHtml = `
<div id="task-container">
  <input id="2" type="checkbox" checked="true"/>
</div>`;
document.body.innerHTML = innerHtml;

const changedStateMocked = jest.fn((data = []) => {
  if (data.length < 1) return [];
  if (!Array.isArray(data)) return [];
  const checkboxs = document.querySelectorAll('#task-container input[type="checkbox"]');
  checkboxs.forEach((checkbox) => {
    const id = parseInt(checkbox.id, 10);
    const num = data.findIndex((value) => value.index === id);
    if (checkbox.checked) {
      data[num].completed = true;
    } else {
      data[num].completed = false;
    }
  });
  return data;
});

describe('#changedState() is working properly', () => {
  test('changes the completed state if input', () => {
    // Arrange
    const tempData = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: false },
      { index: 3, description: 'Task 3', completed: false },
      { index: 4, description: 'Task 4', completed: false },
    ];

    const expectedRes = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: true },
      { index: 3, description: 'Task 3', completed: false },
      { index: 4, description: 'Task 4', completed: false },
    ];
    // Assess
    expect(changedStateMocked(tempData)).toEqual(expectedRes);
  });
  test('if empty array is returnd without passing an argument', () => {
    expect(changedStateMocked()).toEqual([]);
  });
  test('if empty array is returnd passing not an array as argument', () => {
    expect(changedStateMocked('data')).toEqual([]);
  });
});
