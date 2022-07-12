const $inputValue = document.getElementById('task_input');
const $taskButton = document.getElementById('button');
const taskArray = [];

const addNewTaskInArray = () => {
  const task = {
    content: $inputValue.value,
    isComplete: false,
    id: Date.now,
  };
  taskArray.push(task);
};

const createDiv = (task) => {


}

const createNewLine = function (text) {
  taskArray.forEach(el => createDiv(el))
}
const addTask = () => {
  const value = `${$inputValue.value}`;
  if (value === '') {
    return;
  }

  addNewTaskInArray(value);
  createNewLine();
  $inputValue.value = '';
  console.log(taskArray);
};



$taskButton.addEventListener('click', addTask);
$taskButton.addEventListener('keydown', (event)=> {
  if (event.key === 'Enter') { 
    event.addTask();

  }
});