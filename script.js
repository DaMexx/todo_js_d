const mainInput = document.getElementById('task_input');
const addButton = document.getElementById('button');
const taskListMain = document.getElementById('task_list');
const taskArray = [];

const render = () => {
  let tasks = '';
  taskArray.forEach((item) => {
    tasks += `<li id=${item.id}>
    <input type=checkbox ${item.status ? 'checked' : ''}>
    <span>${item.content}</span>
    <button>X</button>
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
  taskArray.push(task);
  render();
};

const enterEvent = (event) => {
  if (event.key === 'Enter') {
    addNewTaskInArray();
  }
};

const changeStat = (id) => {
  taskArray.forEach((item) => {
    const task = item;
    if (item.id === +id) {
      task.status = !task.status;
    }
  });
  render();
};

const checkTaskList = (e) => {
  if (e.target && e.target.type === 'checkbox') {
    //for checkbox
    const currentId = e.target.parentElement.id;
    changeStat(currentId);
    console.log(currentId);
  } else if (e.target && e.target.nodeName === 'BUTTON') {
    //for delete_button
  }
};

taskListMain.addEventListener('click', checkTaskList);
addButton.addEventListener('click', addNewTaskInArray);
mainInput.addEventListener('keydown', enterEvent);