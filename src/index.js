import _ from 'lodash';
import Update from './update.js';
import Utilities from './Utilities.js';
import img from './images/refresh.png';
import img1 from './images/refresh-hover.png';
import enter from './images/enter.png';
import menu from './images/menu.png';
import menuHover from './images/menu-hover.png';
import deleteIcon from './images/delete.png';
import deleteIconHover from './images/delete-hover.png';
import './css/style.css';

const container = document.getElementById('task-container');
const inputTask = document.getElementById('task');
const touchEnter = document.querySelector('.enter');
const btn = document.querySelector('.btn');
let data = [];
if (Update.loadData().length > 0) data = Update.loadData();
const component = () => {
  const element = document.createElement('p');
  const refresh = document.querySelector('.refresh');
  const enterImage = document.querySelector('.enter');
  refresh.src = img;
  enterImage.src = enter;
  refresh.addEventListener('mouseover', () => {
    refresh.src = img1;
  });
  refresh.addEventListener('mouseout', () => {
    refresh.src = img;
  });
  element.textContent = _.join(['Made', 'By SAIDI AZARIA'], ' ');
  return element;
};

const onBlur = (e) => {
  const parent = e.target.parentNode;
  const imgId = parseInt(parent.previousSibling.previousSibling.firstChild.nextSibling.id, 10);
  if (parent.previousSibling.previousSibling.firstChild.nextSibling.checked) e.target.classList.add('line-through');

  const NUM = data.findIndex((value) => value.index === imgId);
  data[NUM].description = e.target.value;
  Update.save(data);
  parent.parentNode.classList.remove('bg-selected');
  parent.nextSibling.nextSibling.firstChild.nextSibling.src = menu;
};
/**
 * this function load images and  give them
 * some events
 */
const loadIconAndEvent = () => {
  const menus = document.querySelectorAll('.menu');
  /**
   * here we handle the event for delete and menu button
   */
  menus.forEach((img) => {
    img.src = menu;
    img.addEventListener('mouseover', () => {
      if (img.src !== deleteIcon) {
        img.src = menuHover;
        img.classList.remove('cursor-hand');
        img.classList.add('cursor-move');
      } else {
        img.src = deleteIconHover;
        img.classList.remove('cursor-move');
        img.classList.add('cursor-hand');
        const pere = img.parentNode.previousSibling.previousSibling;
        pere.removeEventListener('blur', onBlur, true);
      }
    });
    img.addEventListener('mouseout', () => {
      if (img.src !== deleteIconHover) {
        img.src = menu;
      } else {
        img.src = deleteIcon;
        const pere = img.parentNode.previousSibling.previousSibling;
        pere.addEventListener('blur', onBlur, true);
      }
    });
    /**
     * remove one task--------------
     */
    img.addEventListener('click', () => {
      if (img.src === deleteIconHover || img.src === deleteIcon) {
        const parent = img.parentNode.previousSibling.previousSibling;
        const otherParent = parent.previousSibling.previousSibling;
        const imgId = parseInt(otherParent.firstChild.nextSibling.id, 10);
        data = Utilities.clearOneTask(data, imgId);
        Update.save(data);
        // const tmp = img.parentNode.parentNode;
        container.removeChild(img.parentNode.parentNode);
        // Update.changedState(data);
        // console.log('block:', tmp);
      }
    }, false);
  });
};

// check if the task is completed
const check = (value) => {
  if (value) return 'checked';
  return '';
};
/**
 * this function make the element's content editable
 */
const editable = () => {
  const p = document.querySelectorAll('.edit');
  p.forEach((element) => {
    element.addEventListener('click', () => {
      element.style.outline = 'none';
      element.classList.remove('line-through');
      const parent = element.parentNode;
      parent.parentNode.classList.add('bg-selected');
      parent.nextSibling.nextSibling.firstChild.nextSibling.src = deleteIcon;
      element.setAttribute('contenteditable', true);
    }, false);
    const pere = element.parentNode;
    pere.addEventListener('blur', onBlur, true);
  });
};
/**
 * this function add all the tasks in the container
 */
const addTask = () => {
  let chaine = '';
  data.forEach((task) => {
    chaine += `
        <div class=" grid grid-col-3 border-b p">
            <div class="pt-5">
                <input type="checkbox"  id="${task.index}"  class="square" ${check(task.completed)} width="20"/>
            </div>
            <div>
                <textarea class="no-border bg-transparent no-resize w-100 fs-15 pt-3 h-100 text-dark edit ${check(task.completed) === 'checked' ? 'line-through' : ''}">${task.description}</textarea>
            </div>
            <div class="pt-5">
                <img alt="image_menu" class="menu" src="" width="20"/>
            </div>

        </div>
        `;
  });
  container.innerHTML = chaine;
  loadIconAndEvent();
  editable();
};

document.body.append(component());
addTask();
Update.changedState(data);
btn.addEventListener('click', () => {
  data = Utilities.clearCompletedTasks(data);
  Update.save(data);
  addTask();
  Update.changedState(data);
});
inputTask.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    if (inputTask.value) {
      const task = { description: inputTask.value, completed: false };
      data = Utilities.add(data, task);
      Update.save(data);
      addTask();
      Update.changedState(data);
      inputTask.value = '';
    }
  }
});

touchEnter.addEventListener('click', () => {
  if (inputTask.value) {
    const task = { description: inputTask.value, completed: false };
    data = Utilities.add(data, task);
    Update.save(data);
    addTask();
    Update.changedState(data);
    inputTask.value = '';
  }
});