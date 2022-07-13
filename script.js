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

// const a = () => {
//   let b = document.createElement('li');
//   b.innerHTML = `${$mainInput.value}`;
//   $taskListMain.append(b);
// };

const addTask = () => {
  const newTaskText = `${$mainInput.value}`;
  if (newTaskText === '') {
    return;
  }
  // a();
  addNewTaskInArray(newTaskText);
  $mainInput.value = '';
  console.log(taskArray);
  
};






$taskButton.addEventListener('click', addTask);
$mainInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    return addTask();
  }
});
