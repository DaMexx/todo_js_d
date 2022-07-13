const $mainInput = document.getElementById('task_input');
const $taskButton = document.getElementById('button');
const $taskListMain = document.getElementById('task_list');
const taskArray = [];

const addNewTaskInArray = () => {
  const task = {
    content: $mainInput.value,
    isComplete: false,
    id: Date.now,
  };
  taskArray.push(task);
};

const addNewLine = () => {
  $taskListMain.innerHTML = '';
  for (let i = 0; i < taskArray.length; i++) {
    const $line = document.createElement('li');
    $line.innerHTML = taskArray[i].content;
    $taskListMain.append($line);
  }
};

const addTask = () => {
  const newTaskText = `${$mainInput.value}`;
  if (newTaskText === '') {
    return;
  }

  addNewTaskInArray(newTaskText);
  $mainInput.value = '';
  addNewLine();
  console.log(taskArray);
};


$taskButton.addEventListener('click', addTask);
$mainInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    return addTask();
  }
});
