let btn = document.querySelector(".contents .content-inp button");
let form1 = document.forms["form-1"];
let contList = document.querySelector(".content-list");
let hide = document.querySelector(".hide-element input");
let searchBar = document.querySelector(".bottom .search-inp #Search-task-title");
let clearBtn = document.querySelector(".outer-container .clear")
let emptyMessage = document.querySelector(".content-list .empty-message")
const themeToggleBtn = document.querySelector(".icon-display i");
const uselessBtn = document.querySelector(".icon-add i");
const body = document.body;

uselessBtn.addEventListener('click', e => {
    alert("No vex Boss, this icon de useless for now 😂");
});

form1.addEventListener('submit', e =>{
    e.preventDefault();
    let inpTitle = form1.querySelector(".task-title")
    let inpDesc = form1.querySelector(".task-description")
    let inpCont = document.createElement("div")

// To capitalize content
    function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

 let now = new Date()

// let currTime = now.toLocaleDateString()
//  let specificDate = new Date()

// The day 
let currDay = now.getDate();
// the month
let currMonth = now.toLocaleString('default', {month: 'short'});

// the time
let theHour = now.getHours() % 12 || 12;
let theMins = now.getMinutes().toString().padStart(2, '0');
let currTime = `${theHour}:${theMins}`
// AM/PM
let amPm = now.toLocaleTimeString('en-us', {hour12: true}).split(' ')[1]

// The full date
let month = (now.getMonth() + 1).toString().padStart(2, '0');
let day = now.getDate().toString().padStart(2, '0');
let year = now.getFullYear();
let currDate = `${year}-${month}-${day}`

    inpCont.innerHTML = `
                            <div class="todo-item">
                        <div class="time">
                            <span class="day">${currDay}</span>
                            <span class="month">${currMonth}</span>
                            <span class="set-time"><p>${currTime}</p> <p>${amPm}</p></span>
                        </div>
                        <div class="todo-task">
                            <span class="task-title">${capitalize(inpTitle.value)}</span>
                            <span class="task">${inpDesc.value}</span>
                        </div>
                        <div class="controllers">
                            <div class="date">${currDate}</div>
                            <div class="button-controllers">
                                <button type = "button" class="check-comp"><i class="fa-solid fa-check"></i></button>
                                <button type = "button" class="pen"><i class="fa-solid fa-pen"></i></button>
                                <button type = "button" class="trash"><i class="fa-solid fa-trash"></i></button>
                            </div>
                            <p>Edited: <span>02:05 pm</span></p>
                        </div>
                    </div>
                    `           

    if(inpDesc.value == "" || inpTitle.value == ""){
        alert("Please completely fill in the task fields")
    }
    else{
        contList.appendChild(inpCont);
        inpTitle.value = ""
        inpDesc.value = ""
        clearBtn.parentElement.style.display = "flex"
    }
})


contList.addEventListener('click', e => {
    const todoItem = e.target.closest('.todo-item');  // get the nearest .todo-item regardless of which child was clicked
    if (!todoItem) return;  // Exit if the click didn't happen inside a todo-item

    const task = todoItem.querySelector(".todo-task");
    const controllers = todoItem.querySelector(".controllers");
    const taskTitle = task?.querySelector(".task-title");
    const taskDes = task?.querySelector(".task");
    const editTitle = todoItem.querySelector(".edit-task-title");
    const editDesc = todoItem.querySelector(".edit-task-description");
    const editTime = controllers?.querySelector("p span")

    
    if (e.target.classList.contains('pen') || e.target.classList.contains('fa-pen')) {
        task.style.display = "none";
        controllers.style.display = "none";
        todoItemCont = document.createElement("div")
        todoItemCont.innerHTML = `
                                     <div class="edit">
                        
                                        <div class="edit-top">
                                            <input type="text" value = "${taskTitle.textContent}" class ="edit-task-title">
                                            <input type="text" value = "${taskDes.textContent}" class ="edit-task-description">
                                        </div>
                                        <div class="edit-bottom">
                                            <button class="edit-save" type="submit">Save</button>
                                            <button class="edit-cancel" type="button">Cancel</button>
                                        </div>
                           
                                    </div>
                             `                   
        
        todoItem.appendChild(todoItemCont);
    }

    else if (e.target.classList.contains('edit-cancel')){
        const taskEdit = todoItem.querySelector(".edit");
        taskEdit.parentElement.remove();
        // taskEdit.remove();
        task.style.display = "flex";
        controllers.style.display = "flex";
    }

    else if (e.target.classList.contains('edit-save')){

        let now = new Date()

        let theTime = now.toLocaleTimeString('en-us',
            {
                hour: 'numeric',
                minute: '2-digit'
            }
        )

        editTime.innerText = theTime

        const taskEdit = todoItem.querySelector(".edit");
        taskEdit.parentElement.remove();
        taskTitle.innerText = editTitle.value
        taskDes.innerText = editDesc.value
        task.style.display = "flex";
        controllers.style.display = "flex";
        editTime.parentElement.style.display = "inline-block";
        controllers.style.gap = "15px"

        // console.log()
        
    }

    // 🗑️ Trash click
    else if (e.target.classList.contains('trash') || e.target.classList.contains('fa-trash')) {
        todoItem.remove();
    }

    // ✅ Check complete click
    else if (e.target.classList.contains('check-comp')) {
        const taskText = todoItem.querySelector(".task");
        const currentBg = window.getComputedStyle(e.target).backgroundColor;
        const checkIcon = e.target.children[0];

        checkIcon.style.display =
            checkIcon.style.display === "inline-block" ? "none" : "inline-block";

        e.target.style.backgroundColor =
            currentBg === "rgb(83, 223, 88)" ? "#4A4A4A" : "#53DF58";

        if (taskText) {
            taskText.style.textDecoration =
                taskText.style.textDecoration === "line-through" ? "none" : "line-through";
            taskText.style.opacity =
                taskText.style.opacity === "0.5" ? "1" : "0.5";
        }
    }

    else if (e.target.classList.contains('fa-check')) {
        const taskText = todoItem.querySelector(".task");
        const currentBg = window.getComputedStyle(e.target.parentElement).backgroundColor;
        const checkIcon = e.target;

        checkIcon.style.display =
            checkIcon.style.display === "inline-block" ? "none" : "inline-block";

        e.target.parentElement.style.backgroundColor =
            currentBg === "rgb(83, 223, 88)" ? "#4A4A4A" : "#53DF58";

        if (taskText) {
            taskText.style.textDecoration =
                taskText.style.textDecoration === "line-through" ? "none" : "line-through";
            taskText.style.opacity =
                taskText.style.opacity === "0.5" ? "1" : "0.5";
        }
    }

    if(contList.querySelectorAll(".todo-item").length === 0){
        clearBtn.parentElement.style.display = "none"
    }
    // else{clearBtn.parentElement.style.display = "flex"};
});

hide.addEventListener('click', e =>{
    contList.style.display = 
                contList.style.display === "none" ? "block" : "none";
    
    e.target.nextElementSibling.innerText =
                e.target.nextElementSibling.innerText === "Hide task" ? "Show task" : "Hide task"
})

searchBar.addEventListener('focus', e =>{
    e.target.parentElement.style.border = "2px solid #abecd3"
    contList.style.backgroundColor = "#221e2e"
})
const currentBg = window.getComputedStyle(contList).backgroundColor;
searchBar.addEventListener('blur', e =>{
    e.target.parentElement.style.border = "none"
    contList.style.backgroundColor = currentBg
    emptyMessage.style.display = "none"
})
   if(searchBar.value == ""){
        emptyMessage.style.display = "none"
    }
searchBar.addEventListener('keyup', e =>{
    if(contList.querySelectorAll(".todo-item").length === 0){
        if(searchBar.value == ""){
        emptyMessage.style.display = "none"
    }else{emptyMessage.style.display = "block"}    
    }
    
   todos = contList.querySelectorAll(".todo-item .task-title");
   Array.from(todos).forEach(todo =>{
    if (todo.textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1){
        todo.closest(".todo-item").style.display = "none";
    }
    else{
        todo.closest(".todo-item").style.display = "flex";
    }
    // console.log(todo.textContent)
   })
})



btn.addEventListener('click', e =>{
    if (btn.className == ""){
        btn.className = "play"
    }
    else if (btn.className == "play"){
        btn.className = "again"
    }
    else{
        btn.className = "play"
    }
    // btn.classList.toggle("play")
})

clearBtn.addEventListener('click', e => {
    if (clearBtn.classList.contains("again")) {
        clearBtn.classList.replace("again", "play");
    } else if (clearBtn.classList.contains("play")) {
        clearBtn.classList.replace("play", "again");
    } else {
        clearBtn.classList.add("play");
    }

    const res = prompt("Are you sure you want to clear all tasks? If Yes select OK, if No Cancel")
    if(res == ""){
        let items = contList.querySelectorAll(".todo-item")
    Array.from(items).forEach(item =>{
        item.remove();
    })
    e.target.parentElement.style.display = "none";
    }
});


// Initialize icon based on default class
if (body.classList.contains("dark")) {
    themeToggleBtn.classList.remove("fa-moon");
    themeToggleBtn.classList.add("fa-sun");
} else {
    themeToggleBtn.classList.remove("fa-sun");
    themeToggleBtn.classList.add("fa-moon");
}

// Toggle dark/light mode on icon click
document.querySelector(".icon-display").addEventListener("click", () => {
    if (body.classList.contains("dark")) {
        body.classList.replace("dark", "light");
        themeToggleBtn.classList.replace("fa-sun", "fa-moon");
    } else {
        body.classList.replace("light", "dark");
        themeToggleBtn.classList.replace("fa-moon", "fa-sun");
    }
});
