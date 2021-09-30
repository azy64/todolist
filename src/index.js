import _ from 'lodash';
import Update from './update.js';
import img from './images/refresh.png';
import img1 from './images/refresh-hover.png';
import enter from './images/enter.png';
import menu from './images/menu.png';
import menuHover from './images/menu-hover.png';
import deleteIcon from './images/delete.png';
import deleteIconHover from './images/delete-hover.png';
import './css/style.css';

const container = document.getElementById('task-container');
let data = [
  {
    description: 'clean the home',
    completed: false,
    index: 1,
  },
  {
    description: 'take the breakfast in the morning',
    completed: true,
    index: 2,
  },
  {
    description: 'cooking for the dinner',
    completed: false,
    index: 3,
  },
];
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
      if (img.src !== deleteIcon) img.src = menuHover;
      else img.src = deleteIconHover;
    });
    img.addEventListener('mouseout', () => {
      if (img.src !== deleteIconHover) img.src = menu;
      else img.src = deleteIcon;
    });
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
      element.setAttribute('autofocus', true);
      const parent = element.parentNode;
      parent.parentNode.classList.add('bg-selected');
      parent.nextSibling.nextSibling.firstChild.nextSibling.src = deleteIcon;
      element.setAttribute('contenteditable', true);
    });
    element.addEventListener('blur', () => {
      const parent = element.parentNode;
      element.classList.add('line-through');
      const imgId = parseInt(parent.previousSibling.previousSibling.firstChild.nextSibling.id, 10);
      const NUM = data.findIndex((value) => value.index === imgId);
      data[NUM].description = element.textContent;
      Update.save(data);
      parent.parentNode.classList.remove('bg-selected');
      parent.nextSibling.nextSibling.firstChild.nextSibling.src = menu;
    });
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
                <!--<img  id="${task.index}" alt="image_square" class="square ${check(task.completed)}" src="" width="20"/>-->
                <input type="checkbox"  id="${task.index}"  class="square" ${check(task.completed)} width="20"/>
            </div>
            <div>
                <p class="h-100 text-dark edit ${check(task.completed) === 'checked' ? 'line-through' : ''}">${task.description}</p>
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
