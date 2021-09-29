import _ from 'lodash';
import './css/style.css';

const component = () => {
    const element = document.createElement('p');
    element.textContent= _.join(["Hello"," Webpack By Azy"]," ");
    return element;
}

document.body.append(component());