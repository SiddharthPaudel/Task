const KEY = "tasks";

export const taskApi = {
  async getAll() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  },
  async saveAll(tasks) {
    localStorage.setItem(KEY, JSON.stringify(tasks));
    return tasks;
  }
};
