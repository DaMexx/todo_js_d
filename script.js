(() => {
  const { _ } = window;
  const MainInput = document.getElementById('task-input');
  const AddButton = document.getElementById('add-task-button');
  const TaskListMain = document.getElementById('task-list');

  const CheckBoxAll = document.getElementById('check-all-tasks');
  const AllTask = document.getElementById('all-task-counter');
  const ActiveTasks = document.getElementById('active-task-counter');
  const CompleteTasks = document.getElementById('complete-task-counter');
  const PageSwitch = document.getElementById('pagination-buttons');
  const DeleteCompleteTasksButtonSpace = document.getElementById('for-delete-complete-tasks-button');

  let tasksArray = [];
  let currentPage = 1;
  let currentPageList = 1;
  const count = 5;

  const click = 'click';
  const dblclick = 'dblclick';
  const enter = 'Enter';
  const keydown = 'keydown';
  const blur = 'blur';
  const escape = 'Escape';

  const getCurrentPage = () => {
    currentPage = Math.ceil(tasksArray.length / count);
  };

  const filterTasksArray = () => {
    let currentTasksArray = tasksArray.slice();

    if (ActiveTasks.classList.contains('red')) {
      currentTasksArray = tasksArray.filter((element) => element.status === false);
    } else if (CompleteTasks.classList.contains('red')) {
      currentTasksArray = tasksArray.filter((element) => element.status === true);
    }
    const tasksArrayActive = tasksArray.filter((element) => element.status === false);
    const tasksArrayComplete = tasksArray.filter((element) => element.status === true);

    AllTask.innerHTML = `All (${tasksArray.length})`;
    ActiveTasks.innerHTML = `Active (${tasksArrayActive.length})`;
    CompleteTasks.innerHTML = `Complete (${tasksArrayComplete.length})`;

    currentPageList = Math.ceil(currentTasksArray.length / count);

    if (tasksArrayComplete.length) {
      DeleteCompleteTasksButtonSpace.innerHTML = '';
      const deleteAllTasksButton = document.createElement('button');
      deleteAllTasksButton.classList.add('input-group-text');
      deleteAllTasksButton.innerHTML = 'delete complete tasks';
      DeleteCompleteTasksButtonSpace.append(deleteAllTasksButton);
    } else {
      DeleteCompleteTasksButtonSpace.innerHTML = '';
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

    currentTasks.forEach((element) => {
      tasks += `<li class="list-group-item" id=${element.id}>
    <input class="form-check-input mt-2" aria-label="..." id="addon-wrapping" type=checkbox ${element.status ? 'checked' : ''}>
    <span>${_.escape(element.content)}</span>
    <button class="btn btn-primary">X</button>
    </li>`;
    });

    TaskListMain.innerHTML = tasks;

    CheckBoxAll.checked = !!tasksArray.length && tasksArray.every((element) => element.status);

    PageSwitch.innerHTML = '';

    for (let i = 1; i <= +currentPageList; i += 1) {
      const button = document.createElement('BUTTON');
      button.classList.add('btn');
      button.innerHTML = i;
      PageSwitch.append(button);
    }
  };

  const addNewTaskInArray = () => {
    const content = _.escape(MainInput.value.trim());
    if (!content) return;
    const task = {
      content,
      status: false,
      id: Date.now(),
    };
    MainInput.value = '';
    tasksArray.push(task);
    getCurrentPage();
    render();
  };

  const enterEvent = (event) => {
    if (event.key === enter) {
      addNewTaskInArray();
    }
  };

  const changeStat = (id) => {
    tasksArray.forEach((element) => {
      const task = element;
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
    if (TaskListMain.innerHTML === '') {
      getCurrentPage();
      render();
    }
  };

  const checkTaskList = (event) => {
    const currentId = event.target.parentElement.id;
    if (event.target && event.target.type === 'checkbox') {
      changeStat(currentId);
    } else if (event.target && event.target.nodeName === 'BUTTON') {
      deleteTask(currentId);
    }
  };

  const checkAllTasks = () => {
    tasksArray.forEach((element) => {
      const task = element;
      task.status = CheckBoxAll.checked;
    });
    render();
  };

  const editTask = (event) => {
    if (event.target && event.target.nodeName === 'SPAN') {
      const currentId = event.target.parentElement.id;
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
        if (newContent) {
          tasksArray[taskItemIndex].content = newContent;
        }
        render();
      };

      const reWrite = (taskEvent) => {
        if (taskEvent.key === enter) {
          editableTask.removeEventListener(blur, createNewTask);
          createNewTask();
        } else if (taskEvent.key === escape) {
          editableTask.removeEventListener(blur, createNewTask);
          render();
        }
      };

      editableTask.addEventListener(keydown, reWrite);
      editableTask.addEventListener(blur, createNewTask);
    }
  };

  const changePage = (event) => {
    if (event.target.nodeName === 'BUTTON') {
      currentPage = +event.target.innerHTML;
      render();
    }
  };

  const showActiveTasks = (event) => {
    if (event.target.classList.contains('red') && MainInput.innerHTML !== '') {
      return;
    }
    CompleteTasks.classList.remove('red');
    event.target.classList.add('red');
    currentPage = 1;
    render();
  };

  const showDoneTasks = (event) => {
    if (event.target.classList.contains('red') && MainInput.innerHTML !== '') {
      return;
    }
    ActiveTasks.classList.remove('red');
    event.target.classList.add('red');
    currentPage = 1;
    render();
  };

  const showAllTasks = (event) => {
    if (event.target) {
      ActiveTasks.classList.remove('red');
      CompleteTasks.classList.remove('red');
      render();
    }
  };

  const clear = () => {
    const newArray = tasksArray.filter((element) => element.status === false);
    tasksArray = newArray;
  };

  const deleteCompleteTask = (event) => {
    if (event.target.nodeName === 'BUTTON') {
      clear();
      render();
    }
  };

  DeleteCompleteTasksButtonSpace.addEventListener(click, deleteCompleteTask);
  AllTask.addEventListener(click, showAllTasks);
  CompleteTasks.addEventListener(click, showDoneTasks);
  ActiveTasks.addEventListener(click, showActiveTasks);
  PageSwitch.addEventListener(click, changePage);
  CheckBoxAll.addEventListener(click, checkAllTasks);
  TaskListMain.addEventListener(click, checkTaskList);
  TaskListMain.addEventListener(dblclick, editTask);
  AddButton.addEventListener(click, addNewTaskInArray);
  MainInput.addEventListener(keydown, enterEvent);
})();
