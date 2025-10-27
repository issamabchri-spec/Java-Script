const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addTaskButton = document.getElementById("button");

addTaskButton.addEventListener("click", function addTask() {
  if(inputBox.value === "") { 
    alert('YOU HAVE TO ENTER SOMETHING!');
  }
   else {
    let li = document.createElement("li"); 
    li.textContent = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "&#x2716;";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
})


listContainer.addEventListener("click", function(e) {
  if(e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function displayTasks() {
  listContainer.innerHTML = localStorage.getItem("data");
}

displayTasks();
