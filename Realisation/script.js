const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);
addBtn.addEventListener('click', addTask);

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    alert('Please enter a task!');
    return;
  }

  const task = { text: text, completed: false };
  createTaskElement(task);
  saveTaskToLocalStorage(task);

  taskInput.value = '';
}

function createTaskElement(task) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    updateTaskStatus(task.text, task.completed);
    if (task.completed) {
      taskText.classList.add('completed');
    } else {
      taskText.classList.remove('completed');
    }
  });

  const taskText = document.createElement('span');
  taskText.textContent = task.text;
  taskText.classList.add('task-text');
  if (task.completed) taskText.classList.add('completed');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    li.remove();
    removeTaskFromLocalStorage(task.text);
  });

  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(t => createTaskElement(t));
}

function removeTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatus(taskText, completed) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(t => {
    if (t.text === taskText) {
      t.completed = completed;
    }
    return t;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
