const mainInput = document.getElementById('task_input');
const addButton = document.getElementById('button');
const taskListMain = document.getElementById('task_list');
const checkField = document.getElementById('checkField');
const checkBoxAll = document.getElementById('checkAll');
const allTask = document.getElementById('allTask');
const activeTask = document.getElementById('activeTask');
const taskDone = document.getElementById('taskDone');
const pageSwitch = document.getElementById('page_switch');

const tasksArray = [];

let currentPage = 1;
const count = 5;

const paging = (num) => {
  if (!num) {
    currentPage = Math.ceil(tasksArray.length / count);
  } else currentPage = num;
  return currentPage;
};

const render = (num) => {
  paging(num);
  const firstIndex = (currentPage - 1) * count;
  const lastIndex = firstIndex + count;

  const taskVisual = tasksArray.slice(firstIndex, lastIndex);

  let tasks = '';
  taskVisual.forEach((item) => {
    tasks += `<li id=${item.id}>
    <input type=checkbox ${item.status ? 'checked' : ''}>
    <span>${item.content}</span>
    <button class = 'list-button'>X</button>
    </li>`;
  });
  taskListMain.innerHTML = tasks;

  // if (tasksArray.every((item) => item.status === true)) {
  //   checkBoxAll.checked = true;
  // } else {
  //   checkBoxAll.checked = false;
  // }
  checkBoxAll.checked = !!tasksArray.length && tasksArray.every((item) => item.status);

  if (tasksArray.length === 0) {
    checkField.style.display = 'none';
  } else {
    checkField.style.display = 'block';
  }

  const tasksArrayActive = tasksArray.filter((el) => el.status === true);
  const tasksArrayComplete = tasksArray.filter((el) => el.status === false);

  allTask.innerHTML = `All (${tasksArray.length})`;
  activeTask.innerHTML = `Active (${tasksArrayActive.length})`;
  taskDone.innerHTML = `Active (${tasksArrayComplete.length})`;

  if (!tasksArray.length) {
    allTask.style.display = 'none';
  } else {
    allTask.style.display = 'block';
  }

  if (!tasksArray.length) {
    activeTask.style.display = 'none';
  } else {
    activeTask.style.display = 'block';
  }

  if (!tasksArray.length) {
    taskDone.style.display = 'none';
  } else {
    taskDone.style.display = 'block';
  }

  pageSwitch.innerHTML = '';

  for (let i = 1; i <= +currentPage; i += 1) {
    currentPage = Math.ceil(tasksArray.length / count);
    if (tasksArray.length < count + 1) {
      return;
    }
    const button = document.createElement('BUTTON');
    button.innerHTML = i;
    pageSwitch.append(button);
  }
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
  } else if (e.target && e.target.nodeName === 'BUTTON') {
    //  for delete_button
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
    const value = +e.target.innerHTML;
    render(value);
  }
};

pageSwitch.addEventListener('click', changePage);
checkBoxAll.addEventListener('click', checkAllTasks);
taskListMain.addEventListener('click', checkTaskList);
taskListMain.addEventListener('dblclick', editTask);
addButton.addEventListener('click', addNewTaskInArray);
mainInput.addEventListener('keydown', enterEvent);
