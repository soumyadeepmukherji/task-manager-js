//
const addBtn = document.getElementById('addBtn')
const taskInput = document.getElementById('taskInput')
const priority = document.getElementById('priority')

const table = document.querySelector('tbody')

let tasks = []
let count = 0

function addTask(){
    let val = taskInput.value 
    let choise = priority.value

    const task = {
        id: count + 1,
        taskName: val,
        priority: choise
    }
    tasks.push(task);
    saveTasks();
    renderTask();
    console.log(tasks)
    taskInput.value = "";
    priority.selectedIndex = 0;
    taskInput.focus()
}

function saveTasks() {
    console.log("saved");
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask() {
    table.innerHTML = "";

    tasks.forEach((task, index) => {
        table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${task.taskName}</td>
            <td>${task.priority}</td>
            <td>
                <button class="clr">Remove</button>
            </td>
        </tr>`;

    });

}

function deletTask(){
    if(e.target.classList.contains('clr')){
        var conf = confirm('Are you sure you want to delete ?')
        if(conf === true){
            e.target.closest('tr').remove()
        }

        const allRows = targetElem.querySelectorAll('tr');
        console.log(allRows)
        allRows.forEach((row, index) => {
            row.querySelector('td:first-child').textContent = index + 1;
        });

        count = allRows.length;
    }
}

(function loadTask() {
    const storedValue = localStorage.getItem("tasks");
    if (storedValue) {
        tasks = JSON.parse(storedValue);
    }
    renderTask();
})();