
let input = document.getElementById("taskInput");
let submit = document.getElementById("addTaskButton");
let taskElements = document.getElementById("taskList");

let arrayOfTheTasks = [];

// add Task
submit.onclick = function (){
    if (input.value !== ""){
        // adding tasks to array 
        addTaskToArray(input.value); 
        input.value = "";
    }
};

function addTaskToArray (taskText) {
    //data
    const task = {
        tittle: taskText,
        completed: false,
    };
    arrayOfTheTasks.push(task);
    //console.log(task);
};