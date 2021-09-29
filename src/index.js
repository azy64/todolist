import _ from 'lodash';

const component = () => {
    const element = document.createElement('p');
    element.textContent= _.join(["Hello"," Webpack By Azy"]," ");
    return element;
}

document.body.append(component());