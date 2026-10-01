let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

document.getElementById("themeBtn").onclick = () => {
    document.body.classList.toggle("dark");
};

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

    const taskText = document.getElementById("taskInput").value;

    if(taskText.trim()==="") return;

    const task = {
        text: taskText,
        completed:false,
        priority:document.getElementById("priority").value,
        dueDate:document.getElementById("dueDate").value,
        dueTime:document.getElementById("dueTime").value,
        created:new Date().toLocaleString()
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    document.getElementById("taskInput").value="";
}

function renderTasks(){

    const taskList=document.getElementById("taskList");

    taskList.innerHTML="";

    let filtered=tasks;

    if(currentFilter==="active"){
        filtered=tasks.filter(t=>!t.completed);
    }

    if(currentFilter==="completed"){
        filtered=tasks.filter(t=>t.completed);
    }

    const search=document.getElementById("searchBox").value.toLowerCase();

    filtered=filtered.filter(t=>
        t.text.toLowerCase().includes(search)
    );

    filtered.forEach((task,index)=>{

        const li=document.createElement("li");

        li.className=
            (task.completed ? "completed ":"") +
            (task.priority==="High"
            ? "priority-high"
            : task.priority==="Medium"
            ? "priority-medium"
            : "priority-low");

        li.innerHTML=`
        <strong>${task.text}</strong><br>

        Priority: ${task.priority}<br>

        Due: ${task.dueDate} ${task.dueTime}<br>

        Created: ${task.created}<br>

        <div class="task-buttons">

        <button onclick="toggleTask(${index})">
        ${task.completed ? "Undo" : "Complete"}
        </button>

        <button onclick="editTask(${index})">
        Edit
        </button>

        <button onclick="deleteTask(${index})">
        Delete
        </button>

        </div>
        `;

        taskList.appendChild(li);
    });

    document.getElementById("taskCount").innerText=tasks.length;
}

function toggleTask(index){
    tasks[index].completed=!tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index){

    let updated=prompt("Edit Task",tasks[index].text);

    if(updated){
        tasks[index].text=updated;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
    renderTasks();
}

function filterTasks(type){

    currentFilter=type;

    renderTasks();
}

document.getElementById("searchBox")
.addEventListener("keyup",renderTasks);

renderTasks();