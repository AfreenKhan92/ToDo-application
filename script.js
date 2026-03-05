//after the HTML gets loaded ,the JS will run 
document.addEventListener("DOMContentLoaded", () => {
  //grab each element 
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");
 //to get task from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
 //display all prev tasks
  tasks.forEach((task) => renderTask(task));
 //on click the add task btn
  addTaskButton.addEventListener("click", () => {
    //.trim removes any spaces in input 
    const taskText = todoInput.value.trim();
    //on empty input return 
    if (taskText === "") return;
    //create a task object
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    //adds to the array
    tasks.push(newTask);
    //after pushing save tasks into local storage
    saveTasks();
    //displays on ui
    renderTask(newTask);
    //clear input
    todoInput.value = ""; 
    //prints in the console portion of inspect
    console.log(tasks);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    //if completed css class added 
    if (task.completed) li.classList.add("completed");
    //Add Content
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;
    //Clicking a Task to Mark it Completed
    li.addEventListener("click", (e) => {
    //If the user clicks delete, we do NOT want the task to toggle completed...
    // so we checkif its btn then return
      if (e.target.tagName === "BUTTON") return;
    //switch bet true n false (like inversion)
      task.completed = !task.completed;
      //add css linethro
      li.classList.toggle("completed");
      //update all changes
      saveTasks();
    });
   //working on del btn
    li.querySelector("button").addEventListener("click", (e) => {
      //Stop parent click event line46
      e.stopPropagation(); //prevent toggle from firing event bubbling concept
      //removes the task from the tasks array.
      tasks = tasks.filter((t) => t.id !== task.id);
      //removes the task from the webpage UI
      li.remove();
      //update local storage
      saveTasks();
    });
     //places the task on the page
    todoList.appendChild(li);
  }
//add array to local storage 
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
