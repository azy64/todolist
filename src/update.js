export default class Update {
    static save = (data) => {
      localStorage.setItem('data', JSON.stringify(data));
    }

    static loadData = () => {
      let data = [];
      if (localStorage.getItem('data')) data = JSON.parse(localStorage.getItem('data'));
      return data;
    }
}