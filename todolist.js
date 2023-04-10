
let input = document.getElementById("taskInput");
let submit = document.getElementById("addTaskButton");
let taskElement = document.getElementById("taskList");

let arrayOfTheTasks = [];

if(localStorage.getItem("tasks")){
    arrayOfTheTasks = JSON.parse(localStorage.getItem("tasks"))
};

getDataFromLocalStorage();

// add Task
submit.onclick = function (){
    if (input.value !== ""){
        // adding tasks to array 
        addTasks(input.value); 
        input.value = "";
    }
};

//update and delete
taskElement.addEventListener("click", (event) =>{
    //delete button
    if(event.target.classList.contains("delete")){
        //delete element
        deleteTask(event.target.parentElement.getAttribute("data-id"));
        event.target.parentElement.remove();
    }
    if(event.target.classList.contains("task")){
        //mark task as completed
        completedTask(event.target.getAttribute("data-id"));
        event.target.classList.toggle("done");
    }
});

function addTasks (taskText) {
    //data
    const task = {
        id: Date.now(),
        tittle: taskText,
        completed: false,
    };
    arrayOfTheTasks.push(task);
    //adding the tasks to page
    addElementsToPage(arrayOfTheTasks);
    // adding data to local storage 
    addDataToLocalStorage(arrayOfTheTasks);
};

function addElementsToPage(arrayOfTheTasks){
    //empty tasks
    taskElement.innerHTML = "";
    //checking the array
    arrayOfTheTasks.forEach((task) => {
        // creating div
        let div = document.createElement("div");
        div.className = "task";
        // checking the task
        if(task.completed === true) {
            div.className = "task done";
        }

        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.tittle));
        //create delete button
        let span = document.createElement("span");
        span.classList.add("delete");
        //append delete button to div
        span.appendChild(document.createTextNode("delete"));
        div.appendChild(span);
        // adding task div to tasklist
        taskElement.appendChild(div);

    });
}

function addDataToLocalStorage(arrayOfTheTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTheTasks));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if (data){
        let tasks = JSON.parse(data);
        addElementsToPage(tasks);
    }
}

function deleteTask(taskId){
    arrayOfTheTasks = arrayOfTheTasks.filter((task) => task.id != taskId);
    addDataToLocalStorage(arrayOfTheTasks);
}


function completedTask(taskId) {
    for (let i = 0; i < arrayOfTheTasks.length; i++) {
        if (arrayOfTheTasks[i].id == taskId) {
            arrayOfTheTasks[i].completed == false ? (arrayOfTheTasks[i].completed = true) : (arrayOfTheTasks[i].completed = false);
        }
    }
    addDataToLocalStorage(arrayOfTheTasks);
}
