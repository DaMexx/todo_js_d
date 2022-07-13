const $mainInput = document.getElementById('task_input');
const $taskButton = document.getElementById('button');
const taskArray = [];

const addNewTaskInArray = () => {
  const task = {
    content: $mainInput.value,
    isComplete: false,
    id: Date.now,
  };
  taskArray.push(task);
};

const createDiv = (task) => {


}

const createNewLine = (text) => {
  taskArray.forEach(el => createDiv(el))
}
const addTask = () => {
  const value = `${$mainInput.value}`;
  if (value === '') {
    return;
  }

  addNewTaskInArray(value);
  createNewLine();
  $mainInput.value = '';
  console.log(taskArray);
};



$taskButton.addEventListener('click', addTask);

$mainInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    return addTask();
  }
});