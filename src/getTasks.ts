export const getSaveTasks = () => {
  const tasks = localStorage.getItem("tasks");
  if (tasks) {
    const saveTasks = JSON.parse(tasks);
    return saveTasks;
  } else {
    return [];
  }
};
