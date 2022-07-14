const mainInput = document.getElementById('task_input');
const addButton = document.getElementById('button');
const taskListMain = document.getElementById('task_list');
const tasksArray = [];

const render = () => {
  let tasks = '';
  tasksArray.forEach((item) => {
    tasks += `<li id=${item.id}>
    <input type=checkbox ${item.status ? 'checked' : ''}>
    <span>${item.content}</span>
    <button class = 'list-button'>X</button>
    </li>`;
    return null;
  });
  taskListMain.innerHTML = tasks;
};

const addNewTaskInArray = () => {
  const content = mainInput.value.trim();
  if (!content) return;
  const task = {
    content,
    status: false,
    id: Date.now(),
  };
  mainInput.value = '';
  tasksArray.push(task);
  render();
};

const enterEvent = (event) => {
  if (event.key === 'Enter') {
    addNewTaskInArray();
  }
};

const changeStat = (id) => {
  tasksArray.forEach((item) => {
    const task = item;
    if (task.id === +id) {
      task.status = !task.status;
    }
  });
  render();
};

const deleteTask = (id) => {
  const taskItemIndex = tasksArray.findIndex((task) => task.id === +id);
  tasksArray.splice(taskItemIndex, 1);
  render();
};

const checkTaskList = (e) => {
  const currentId = e.target.parentElement.id;
  if (e.target && e.target.type === 'checkbox') {
    //  for checkbox
    changeStat(currentId);
    console.log(currentId);
  } else if (e.target && e.target.nodeName === 'BUTTON') {
    //  for delete_button
    deleteTask(currentId);
  }
};

taskListMain.addEventListener('click', checkTaskList);
addButton.addEventListener('click', addNewTaskInArray);
mainInput.addEventListener('keydown', enterEvent);