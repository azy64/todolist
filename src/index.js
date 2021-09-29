import _ from 'lodash';
import img from './images/refresh.png';
import img1 from './images/refresh-hover.png';
import enter from './images/enter.png';
import './css/style.css';

const data = [
  {
    description: 'clean the home',
    completed: false,
    index: 1,
  },
  {
    description: 'take the breakfast in the morning',
    completed: false,
    index: 2,
  },
  {
    description: 'cooking for the dinner',
    completed: false,
    index: 3,
  },
];
const component = () => {
  console.log(data);
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
  element.textContent = _.join(['Hello', ' Webpack By Azy'], ' ');
  return element;
};

document.body.append(component());
