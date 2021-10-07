export default class Update {
    static save = (data) => {
      localStorage.setItem('data', JSON.stringify(data));
    }

    static loadData = () => {
      let data = [];
      if (localStorage.getItem('data')) data = JSON.parse(localStorage.getItem('data'));
      return data;
    }

    static changedState = (data = []) => {
      const checkboxs = document.querySelectorAll('#task-container input[type="checkbox"]');
      checkboxs.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
          const parent = checkbox.parentNode;
          const target = parent.nextSibling.nextSibling.firstChild.nextSibling;
          // img.src = img.src === checked ? square : checked;
          const id = parseInt(checkbox.id, 10);
          const num = data.findIndex((value) => value.index === id);
          if (checkbox.checked) {
            target.classList.add('line-through');
            data[num].completed = true;
          } else {
            target.classList.remove('line-through');
            data[num].completed = false;
          }
          this.save(data);
        });
      });
      // console.log('vraiment:', checkboxs);
    }
}
