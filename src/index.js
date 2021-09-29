import _ from 'lodash';
import img from './images/refresh.png';
import img1 from './images/refresh-hover.png';
import enter from './images/enter.png';
import square from './images/square.png';
import squareHover from './images/square-hover.png';
import menu from './images/menu.png';
import menuHover from './images/menu-hover.png';
import checked from './images/checked.png';
import deleteIcon from './images/delete.png';
import deleteIconHover from './images/delete-hover.png';
import './css/style.css';

const container = document.getElementById('task-container');
const data = [
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
const loadIconAndEvent = () => {
  const squares = document.querySelectorAll('.square');
  const menus = document.querySelectorAll('.menu');
  squares.forEach((img) => {
    img.src = square;
    if (img.classList.contains('checked')) img.src = checked;
    img.addEventListener('mouseover', () => {
      if (img.src !== checked) img.src = squareHover;
    });
    img.addEventListener('mouseout', () => {
      if (img.src !== checked) img.src = square;
    });
    img.addEventListener('click', () => {
      const parent = img.parentNode;
      const target = parent.nextSibling.nextSibling.firstChild.nextSibling;
      // console.log('cible: ', target);
      img.src = img.src === checked ? square : checked;
      if (img.src === checked) target.classList.add('line-through');
      else target.classList.remove('line-through');
    });
  });
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
      const parent = element.parentNode;
      parent.parentNode.classList.add('bg-selected');
      parent.nextSibling.nextSibling.firstChild.nextSibling.src = deleteIcon;
      element.setAttribute('contenteditable', true);
    });
    element.addEventListener('blur', () => {
      const parent = element.parentNode;
      // console.log('jai perdu le focus');
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
                <img alt="image_square" class="square ${check(task.completed)}" src="" width="20"/>
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
