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
    console.log(tasks)
    taskInput.value = "";
    priority.selectedIndex = 0;
    taskInput.focus()
}

function saveTasks(){
    console.log('stored')
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function renderTask(){
    console.log(JSON.stringify(tasks))
    tasks.forEach((task,index) => {
    table.innerHTML += `<tr>
        <td>${count += 1 }</td>
        <td>${val}</td>
        <td>${choise}</td>
        <td> 
            <button class="clr">remove</button>
        </td>
    </tr> `;
    })
}

renderTask()

function loadTask(){
    const storedValue = localStorage.getItem(tasks)
    tasks = JSON.parse(storedValue)
}
loadTask()