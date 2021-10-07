export default class Utilities {
    static add = (data, task) => {
      if (!Array.isArray(data)) return [];
      if (typeof (task) !== 'object') return data;
      if (!task.description) return data;
      task.index = data.length + 1;
      task.completed = false;
      data.push(task);
      return data;
    }

    static clearCompletedTasks = (data) => {
      if (!Array.isArray(data)) return [];
      if (data.length < 1) return [];
      const tmp = data.filter((task) => task.completed !== true);
      tmp.forEach((element, index) => {
        element.index = (index + 1);
      });
      return tmp;
    }

    static clearOneTask = (data, index) => {
      if (!Array.isArray(data)) return [];
      if (!Number.isInteger(index)) return data || [];
      const tmp = data.filter((task) => task.index !== index);
      tmp.forEach((element, index) => {
        element.index = (index + 1);
      });
      return tmp;
    }
}
