const mainInput = document.getElementById('task_input');
const addButton = document.getElementById('button');
const taskListMain = document.getElementById('task_list');
const taskArray = [];

const render = () => {
  let tasks = '';
  taskArray.forEach((item) => {
    tasks += `<li id=${item.id}>
    <input type=checkbox ${item.isComplete ? 'checked' : ''}>
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
    isComplete: false,
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
const changeStat = () => {

}
const checkTaskList = (e) => {
  if (e.target && e.target.type === 'checkbox') {
    console.log('hi');
  } else if (e.target && e.target.nodeName === 'BUTTON') {
    console.log('232');
  }
};

taskListMain.addEventListener('click', checkTaskList);
addButton.addEventListener('click', addNewTaskInArray);
mainInput.addEventListener('keydown', enterEvent);