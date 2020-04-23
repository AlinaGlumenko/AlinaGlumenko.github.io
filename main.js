let tasksArr = [];

const updateTasksArr = () => {
    tasksArr = [];
    let listParentNode = document.querySelector("#listParentNode");
    let childNodes = listParentNode.childNodes;
    for(let el of childNodes) {
        tasksArr.push({
            id: el.querySelector("span").innerHTML,
            title: el.querySelector("h5").innerHTML,
            descr: el.querySelector("p").innerHTML,
        });
    }    
    showExistingEntries();
}

const showExistingEntries = () => {
    let listParentNode = document.querySelector("#listParentNode");
    listParentNode.innerHTML = '';
    let info = document.querySelector("#info");
    if(tasksArr.length === 0) {        
        info.classList.remove("hidden");
    } else {
        info.classList.add("hidden");
    }
    for(let el of tasksArr) {
        listParentNode.insertAdjacentHTML("beforeend", 
            `<div class="card bg-light mb-3">
                <div class="card-header">Task id: <span>${el.id}</span>
                    <button type="button" class="ml-2 mb-1 close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="card-body">
                <h5 class="card-title">${el.title}</h5>
                <p class="card-text">${el.descr}</p>
                </div>
            </div>`
        );
    }
    // delete event
    const closeBtns = document.querySelectorAll(".close");
    [].map.call(closeBtns, function(el) {
        el.addEventListener("click", deleteEntry);
    });
    enableDragSort('drag-sort-enable');
}

const saveTasksToStorage = () => {
    let jsonArr = JSON.stringify(tasksArr);
    localStorage.setItem("jsonTasks", jsonArr);
}

const addNewEntry = (ev) => {
    let titleInput = document.querySelector("#titleInput");
    let descrInput = document.querySelector("#descrInput");
    let obj = {
        id: Math.random().toString(36).substr(2, 9),
        title: titleInput.value,
        descr: descrInput.value,
    };
    tasksArr.push(obj);
    titleInput.value = "";
    descrInput.value = "";
    showExistingEntries();
}

const deleteEntry = (ev) => {
    let itemWithId = ev.target.parentNode.parentNode;
    let id = itemWithId.querySelector("span").innerHTML;
    for(let i in tasksArr) {
        if(tasksArr[i].id === id) {
            tasksArr.splice(i, 1);
        }
    }
    showExistingEntries();
}

const deleteAllTasks = (ev) => {
    tasksArr = [];
    localStorage.clear();
    showExistingEntries();
}


// get data from storage
window.onload = () => {
    tasksArr = JSON.parse(localStorage.getItem("jsonTasks")) || [];
    //show tasks
    showExistingEntries();
};

// don't close unsaved
window.onbeforeunload = () => {
    saveTasksToStorage();
    return true;
};

// add new one event
const addNewTaskBtn = document.querySelector("#newTaskBtn");
addNewTaskBtn.addEventListener("click", addNewEntry);

// delete all tasks
const delAllTasksBtn = document.querySelector("#delAllTasksBtn");
delAllTasksBtn.addEventListener("click", deleteAllTasks);
