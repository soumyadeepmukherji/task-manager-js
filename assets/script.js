//
const addBtn = document.getElementById('addBtn')
const taskInput = document.getElementById('taskInput')
const priority = document.getElementById('priority')
const filterPriority = document.getElementById("filterPriority");

const table = document.querySelector('tbody')

let tasks = []
let editingId = null;

// Add Task
function addTask(){
    let val = taskInput.value 
    let choise = priority.value

    if(editingId === null) {
    const task = {
        id: tasks.length + 1,
        taskName: val,
        priority: choise
    }
    tasks.push(task);
    } else {
        updateTask()
    }
    saveTasks();
    renderTask();
    console.log(tasks)
    taskInput.value = "";
    priority.selectedIndex = 0;
    taskInput.focus()
}

// Save the task on Local Storage
function saveTasks() {
    console.log("saved");
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTask(taskList = tasks) {
    table.innerHTML = "";

    taskList.forEach((task, index) => {
        table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${task.taskName}</td>
            <td>${task.priority}</td>
            <td>
                <button class="edit" data-id ="${task.id}">Update</button>
                <button class="clr" data-id ="${task.id}">Remove</button>
            </td>
        </tr>`;

    });

}


// Render what is there in Localstorage
(function loadTask() {
    const storedValue = localStorage.getItem("tasks");
    if (storedValue) {
        tasks = JSON.parse(storedValue);
    }
    renderTask();
})();

// Edit
table.addEventListener("click", (e) => {

    if (e.target.classList.contains("edit")) {

        const id = Number(e.target.dataset.id);

        const task = tasks.find(task => task.id === id);

        taskInput.value = task.taskName;
        priority.value = task.priority;

        editingId = id;

        console.log(editingId)

        addBtn.textContent = "Update Task";
    }

});

// Update
function updateTask() {

    const val = taskInput.value;
    const choice = priority.value;

    const task = tasks.find(task => task.id === editingId);

    if (!task) return;

    task.taskName = val;
    task.priority = choice;

    editingId = null;

    addBtn.textContent = "Add Task";
}


// Filter
filterPriority.addEventListener("change", () => {

    const selectedPriority = filterPriority.value;

    // Show all tasks
    if (selectedPriority === "All") {
        renderTask();
        return;
    }

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        return task.priority === selectedPriority;
    });

    // console.log(filteredTasks)
    renderTask(filteredTasks);

});

// Remove task
table.addEventListener("click", (e) => {
    if(e.target.classList.contains('clr')){
        const answer = confirm('Are you sure?')
        
        if(answer !== true) {
            return;
        }

        const id = Number(e.target.dataset.id)
        console.log(typeof id)


        tasks = tasks.filter((task) => task.id !== id )

        saveTasks()

        renderTask()
    }
})