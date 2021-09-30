export default class Utilities {
    static add = (data, task) => {
      task.index = data.length;
      task.completed = false;
      data.push(task);
      return data;
    }

    static clearCompletedTasks = (data) => {
      const tmp = data.filter((task) => task.completed !== true);
      tmp.forEach((element, index) => {
        element.index = index;
      });
      return tmp;
    }

    static clearOneTask = (data, index) => {
      const tmp = data.filter((task) => task.index !== index);
      tmp.forEach((element, index) => {
        element.index = index;
      });
      return tmp;
    }
}