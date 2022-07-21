// document.addEventListener('DOMContentLoaded', () => {
const { _ } = window;
const mainInput = document.getElementById('task-input');
const addButton = document.getElementById('add-task-button');
const taskListMain = document.getElementById('task-list');
// const checkField = document.getElementById('field-for-check-all-tasks');
const checkBoxAll = document.getElementById('check-all-tasks');
const allTask = document.getElementById('all-task-counter');
const activeTasks = document.getElementById('active-task-counter');
const completeTasks = document.getElementById('complete-task-counter');
const pageSwitch = document.getElementById('pagination-buttons');
const deleteCompleteTasksButtonSpace = document.getElementById('for-delete-complete-tasks-button');

let tasksArray = [];
let currentPage;
let currentPageList;
const count = 5;

const getCurrentPage = () => {
  currentPage = Math.ceil(tasksArray.length / count);
};

const filterTasksArray = () => {
  let currentTasksArray = tasksArray.slice();

  if (activeTasks.classList.contains('red')) {
    currentTasksArray = tasksArray.filter((el) => el.status === false);
  } else if (completeTasks.classList.contains('red')) {
    currentTasksArray = tasksArray.filter((el) => el.status === true);
  }
  const tasksArrayActive = tasksArray.filter((el) => el.status === false);
  const tasksArrayComplete = tasksArray.filter((el) => el.status === true);

  allTask.innerHTML = `All (${tasksArray.length})`;
  activeTasks.innerHTML = `Active (${tasksArrayActive.length})`;
  completeTasks.innerHTML = `Complete (${tasksArrayComplete.length})`;

  currentPageList = Math.ceil(currentTasksArray.length / count);

  if (tasksArrayComplete.length) {
    deleteCompleteTasksButtonSpace.innerHTML = '';
    const deleteAllTasksButton = document.createElement('button');
    deleteAllTasksButton.classList.add('input-group-text');
    deleteAllTasksButton.innerHTML = 'delete complete tasks';
    deleteCompleteTasksButtonSpace.append(deleteAllTasksButton);
  } else {
    deleteCompleteTasksButtonSpace.innerHTML = '';
  }

  return currentTasksArray;
};

const paging = () => {
  const paginationArray = filterTasksArray();
  const firstIndex = (currentPage - 1) * count;
  const lastIndex = firstIndex + count;
  const tasksOnPage = paginationArray.slice(firstIndex, lastIndex);
  return tasksOnPage;
};

const render = () => {
  const currentTasks = paging();

  let tasks = '';

  currentTasks.forEach((item) => {
    tasks += `<li class="input-group mb-3" id=${item.id}>
    <input class="form-check-input mt-2" type=checkbox ${item.status ? 'checked' : ''}>
    <span class="input-group-text text-wrap">${_.escape(item.content)}</span>
    <button class="btn btn-outline-secondary">X</button>
    </li>`;
  });

  taskListMain.innerHTML = tasks;

  // if (taskListMain.innerHTML === '') {
  //   taskListMain.innerHTML = 'Add some tasks, my friend!';
  // }

  checkBoxAll.checked = !!tasksArray.length && tasksArray.every((item) => item.status);

  pageSwitch.innerHTML = '';

  for (let i = 1; i <= +currentPageList; i += 1) {
    const button = document.createElement('BUTTON');
    button.innerHTML = i;
    pageSwitch.append(button);
  }
};

const addNewTaskInArray = () => {
  const content = _.escape(mainInput.value.trim());
  if (!content) return;
  const task = {
    content,
    status: false,
    id: Date.now(),
  };
  mainInput.value = '';
  tasksArray.push(task);
  getCurrentPage();
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
  if (taskListMain.innerHTML === '') {
    getCurrentPage();
    render();
  }
};

const checkTaskList = (e) => {
  const currentId = e.target.parentElement.id;
  if (e.target && e.target.type === 'checkbox') {
    //  for checkbox
    changeStat(currentId);
  } else if (e.target && e.target.nodeName === 'BUTTON') {
    deleteTask(currentId);
  }
};

const checkAllTasks = () => {
  if (checkBoxAll.checked) {
    tasksArray.forEach((item) => {
      const task = item;
      task.status = true;
    });
  } else {
    tasksArray.forEach((item) => {
      const task = item;
      task.status = false;
    });
  }
  render();
};

const editTask = (e) => {
  if (e.target && e.target.nodeName === 'SPAN') {
    const currentId = e.target.parentElement.id;
    const thisEl = document.getElementById(currentId);
    const listItem = thisEl.getElementsByTagName('SPAN')[0];
    const inputText = document.createElement('input');
    inputText.classList.add('form-control');
    inputText.value = `${listItem.innerHTML}`;
    inputText.id = 'editable';
    listItem.parentNode.replaceChild(inputText, listItem);

    const editableTask = document.getElementById('editable');
    editableTask.focus();

    const createNewTask = () => {
      const newContent = editableTask.value.trim();
      const taskId = editableTask.parentElement.id;
      const taskItemIndex = tasksArray.findIndex((task) => task.id === +taskId);
      if (!newContent) {
        render();
      } else {
        tasksArray[taskItemIndex].content = newContent;
      }
      render();
    };

    const reWrite = (event) => {
      if (event.key === 'Enter') {
        editableTask.removeEventListener('blur', createNewTask);
        createNewTask();
      } else if (event.key === 'Escape') {
        editableTask.removeEventListener('blur', createNewTask);
        render();
      }
    };

    editableTask.addEventListener('keydown', reWrite);
    editableTask.addEventListener('blur', createNewTask);
  }
};

const changePage = (e) => {
  if (e.target.nodeName === 'BUTTON') {
    currentPage = +e.target.innerHTML;
    render();
  }
};

const showActiveTasks = (e) => {
  if (e.target.classList.contains('red') && mainInput.innerHTML !== '') {
    return;
  }
  allTask.classList.remove('red');
  completeTasks.classList.remove('red');
  e.target.classList.add('red');
  currentPage = 1;
  render();
};

const showDoneTasks = (e) => {
  if (e.target.classList.contains('red') && mainInput.innerHTML !== '') {
    return;
  }
  allTask.classList.remove('red');
  activeTasks.classList.remove('red');
  e.target.classList.add('red');
  currentPage = 1;
  render();
};
const showAllTasks = (e) => {
  if (e.target) {
    activeTasks.classList.remove('red');
    completeTasks.classList.remove('red');
    render();
  }
};

const clear = () => {
  const newArray = tasksArray.filter((el) => el.status === false);
  tasksArray = newArray;
};

const deleteCompleteTask = (e) => {
  if (e.target.nodeName === 'BUTTON') {
    clear();
    render();
  }
};

deleteCompleteTasksButtonSpace.addEventListener('click', deleteCompleteTask);
allTask.addEventListener('click', showAllTasks);
completeTasks.addEventListener('click', showDoneTasks);
activeTasks.addEventListener('click', showActiveTasks);
pageSwitch.addEventListener('click', changePage);
checkBoxAll.addEventListener('click', checkAllTasks);
taskListMain.addEventListener('click', checkTaskList);
taskListMain.addEventListener('dblclick', editTask);
addButton.addEventListener('click', addNewTaskInArray);
mainInput.addEventListener('keydown', enterEvent);
// });
