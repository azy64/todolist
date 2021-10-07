/**
 * @jest-environment jsdom
 */

const innerHtml = `
 <div id="task-container">
   <p id="1" class="edit">New Description</p>
 </div>
 <div id="task-container">
   <p id="2" class="edit">New Description 2</p>
 </div>`;
document.body.innerHTML = innerHtml;

const onBlurMocked = jest.fn((data) => {
  if (!Array.isArray(data)) return [];
  if (data.length < 1) return [];
  const ps = document.querySelectorAll('.edit');
  ps.forEach((p) => {
    const index = parseInt(p.id, 10);
    const NUM = data.findIndex((value) => value.index === index);
    data[NUM].description = p.textContent;
  });
  return data;
});

describe('#onBlur is working properly', () => {
  test('if list of tasks is updated accordingly to dom elements inner text', () => {
    // Arrange
    const tempData = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: false },
      { index: 3, description: 'Task 3', completed: false },
      { index: 4, description: 'Task 4', completed: false },
    ];
    const expectedRes = [
      { index: 1, description: 'New Description', completed: false },
      { index: 2, description: 'New Description 2', completed: false },
      { index: 3, description: 'Task 3', completed: false },
      { index: 4, description: 'Task 4', completed: false },
    ];

    // Act
    const result = onBlurMocked(tempData);

    // Assess
    expect(result).toEqual(expectedRes);
  });
  test('if empty array is returnd passing an empty array as argument', () => {
    expect(onBlurMocked([])).toEqual([]);
  });
  test('if empty array is returnd passing not an array as argument', () => {
    expect(onBlurMocked('data')).toEqual([]);
  });
});
