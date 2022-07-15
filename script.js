const mainInput = document.getElementById('task_input');
const addButton = document.getElementById('button');
const taskListMain = document.getElementById('task_list');
const checkField = document.getElementById('checkField');
const checkBoxAll = document.getElementById('checkAll');
const allTask = document.getElementById('allTask');
const activeTask = document.getElementById('activeTask');
const taskDone = document.getElementById('taskDone');

const tasksArray = [];

const render = () => {
  let tasks = '';
  tasksArray.forEach((item) => {
    tasks += `<li id=${item.id}>
    <input type=checkbox ${item.status ? 'checked' : ''}>
    <span>${item.content}</span>
    <button class = 'list-button'>X</button>
    </li>`;
    // return null;
  });
  taskListMain.innerHTML = tasks;

  if (tasksArray.every((item) => item.status === true)) {
    checkBoxAll.checked = true;
  } else {
    checkBoxAll.checked = false;
  }

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

  if (tasksArray.length === 0) {
    allTask.style.display = 'none';
  } else {
    allTask.style.display = 'block';
  }

  if (tasksArray.length === 0) {
    activeTask.style.display = 'none';
  } else {
    activeTask.style.display = 'block';
  }

  if (tasksArray.length === 0) {
    taskDone.style.display = 'none';
  } else {
    taskDone.style.display = 'block';
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
    console.log(currentId);
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

// trying edit tasks
const taskEdit = (e) => {
  render();
  if (e.target && e.target.nodeName === 'SPAN') {
    const currentId = e.target.parentElement.id;
    // const taskItemIndex = tasksArray.findIndex((task) => task.id === +currentId);
    const thisEl = document.getElementById(currentId);
    const listItem = thisEl.getElementsByTagName('SPAN')[0];
    const inputText = document.createElement('input');
    inputText.value = `${listItem.innerHTML}`;
    inputText.id = 'editable';
    listItem.parentNode.replaceChild(inputText, listItem);
    // const text = thisEl.getElementsByTagName('SPAN');
    // console.log(text.innerHTML);
    // itemText.classList.add = '.new';
    // alert(`${tasksArray[taskItemIndex].content}`);
    // const newR = prompt(tasksArray[taskItemIndex].content);
    // tasksArray[taskItemIndex].content = newR;
    // e.target.id = taskItemIndex + 1;
  }

  const editableTask = document.getElementById('editable');
  const reWrite = (event) => {
    if (event.key === 'Enter') {
      const newContent = editableTask.value.trim();
      const taskId = editableTask.parentElement.id;
      const taskItemIndex = tasksArray.findIndex((task) => task.id === +taskId);
      tasksArray[taskItemIndex].content = newContent;
      editableTask.removeEventListener('blur', render);
      render();
    }
  };

  const cancelTask = (eventEsc) => {
    if (eventEsc.key === 'Escape') {
      editableTask.removeEventListener('blur', render);
      render();
    }
  };
  // editableTask.onblur = () => {
  //   render();
  // };

  editableTask.addEventListener('keydown', reWrite);
  editableTask.addEventListener('keydown', cancelTask);
  editableTask.addEventListener('blur', render);
};

// items[index].innerHTML = inputText.value;

checkBoxAll.addEventListener('click', checkAllTasks);
taskListMain.addEventListener('click', checkTaskList);
// double-click event
taskListMain.addEventListener('dblclick', taskEdit);
addButton.addEventListener('click', addNewTaskInArray);
mainInput.addEventListener('keydown', enterEvent);