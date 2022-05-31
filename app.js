//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput=document.querySelector('.new-task__input'),//Add a new task.
  addButton = document.querySelector('.new-task__btn'),//first button
  incompleteTaskHolder = document.querySelector('.control-tasks__list-tasks'),//ul of #incompleteTasks
  completedTasksHolder = document.querySelector('.result-tasks__list-tasks');//completed-tasks

//New task list item
function createNewTaskElement(taskString) {

  const listItem = document.createElement('li');
  listItem.classList.add('list-tasks__task');
  listItem.classList.add('task');

  //input (checkbox)
  const checkBox = document.createElement('input');
  checkBox.classList.add('task__checkbox'); //checkbx

  //label
  const label = document.createElement('label'); //label
  label.classList.add('task__label');

  //input (text)
  const editInput = document.createElement('input'); //text
  editInput.classList.add('task__input');
  editInput.classList.add('input');

  //button.edit
  const editButton = document.createElement('button'); //edit button
  editButton.classList.add('task__btn');
  editButton.classList.add('btn-edit');


  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  deleteButton.classList.add('task__btn');
  deleteButton.classList.add('task__btn-remove');
  const deleteButtonImg = document.createElement('img'); //delete button image
  deleteButtonImg.classList.add('btn__img-remove')

  label.innerText = taskString;

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  editInput.type = 'text';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.


  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



const addTask = () => {
  console.log('Add Task...');
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';

}

//Edit an existing task.

const editTask = function(event) {
  console.log('Edit Task...');
  console.log(`Change 'edit' to 'save'`);


  const listItem = event.target.closest('.list-tasks__task');

  const editInput = listItem.querySelector('.task__input'),
    label = listItem.querySelector('.task__label'),
    editBtn = listItem.querySelector('.btn-edit'),
    containsClass = listItem.classList.contains('list-tasks__task-mode-edit');
  //If class of the parent is .editmode
  if(containsClass){

    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  }else{
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle('list-tasks__task-mode-edit');
};


//Delete task.
const deleteTask = function (){
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
const taskCompleted = function() {
  console.log('Complete Task...');

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode,
    labelCompled = listItem.querySelector('.task__label'),
    editBtn = listItem.querySelector('.btn-edit');
  
  listItem.classList.remove('list-tasks__task-mode-edit');
  labelCompled.classList.add('task__label-completed');

  editBtn.innerText = 'Edit';

  console.log(this.parentNode);
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function() {
  console.log('Incomplete Task...');
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  const labelCompled = listItem.querySelector('.task__label');
  labelCompled.classList.remove('task__label-completed');

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



const ajaxRequest = () => {
  console.log('AJAX Request');
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click',addTask);
addButton.addEventListener('click',ajaxRequest);


const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  console.log('bind list item events');
  //select ListItems children
  const checkBox = taskListItem.querySelector('.task__checkbox'),
    editButton = taskListItem.querySelector('.btn-edit'),
    deleteButton = taskListItem.querySelector('.task__btn-remove');


  //Bind editTask to edit button.
  editButton.addEventListener('click', editTask);
  //Bind deleteTask to delete button.
  deleteButton.addEventListener('click', deleteTask);
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.