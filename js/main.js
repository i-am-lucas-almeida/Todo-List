// FUNCTION TODO LIST

const listTasks = document.querySelector('.list');
const inputTask = document.getElementById('inputItem');
const counterTasks = document.querySelector('.counter-tasks');
const btnClear = document.getElementById('btnClear');

const modal = document.querySelector(".modal");
const textArea = document.getElementById("textArea");
const btnConfirm = document.getElementById("btnConfirm");
const btnCancel = document.getElementById("btnCancel");
const dateTask = document.querySelector('.date-task');

createTask();
inputTask.focus();

function currentDateTask() {

    let date = new Date();
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    let hour = String(date.getHours()).padStart(2, '0');
    let min = String(date.getMinutes()).padStart(2, '0');
    let currentDate = day + '/' + month + '/' + year + ' ' + hour + ':' + min + 'h';

    return currentDate;

}

function addTask() {

    const taskValue = inputTask.value;

    if(taskValue) {

        let dataTask = {task: taskValue, status: '', date: currentDateTask()};
        let taskArray = getTask();
        taskArray.push(dataTask);
        localStorage.setItem('taskArray', JSON.stringify(taskArray));

    }

}

function getTask() {

    let taskArray;

    if(localStorage.getItem('taskArray') === null) {

        taskArray = [];

    } else {

        taskArray = JSON.parse(localStorage.getItem('taskArray'));

    }

    return taskArray;

}

function createTask() {

    let taskArray = getTask();

    numberOfTasks();

    let x = 0;

    taskArray.forEach(i => {

        const newTask = document.createElement('li');
        newTask.classList.add('task');

        newTask.innerHTML = `
        
            <div class="task-c">

                <span class="circle btn-check ${i.status}" date-checkkey="${x}"></span>

                <span class="task-text edit-task ${i.status}" date-taskkey="${x}">${i.task}</span>

            </div>
                
            <img src="../images/icon-cross.svg" class="delete-task" date-taskkey="${x}">

        `

        x++;

        listTasks.insertAdjacentElement('afterbegin', newTask);

        // check the task
    
        const checkBtn = newTask.querySelector('.btn-check');
        
        checkBtn.addEventListener('click', function() {

            const checkkey = checkBtn.getAttribute("date-checkkey");

            checkTask(checkkey);
            renderTasks();

        });

        //delete the task

        const btnDelete = newTask.querySelector('.delete-task');

        btnDelete.addEventListener('click', () => {

            const taskkey = btnDelete.getAttribute("date-taskkey");
            deleteTask(taskkey);
            renderTasks();

        });

        //edit the task

        const btnEdit = newTask.querySelector(".edit-task");

        btnEdit.addEventListener('click', () => {

            const taskkey = btnEdit.getAttribute("date-taskkey");
            modal.classList.add('show-modal');
            textArea.focus();
            editTask(taskkey);

        });

    });

}

function renderTasks() {

    listTasks.innerHTML = '';
    createTask();

}

function checkTask(checkkey) {

    let taskArray = JSON.parse(localStorage.getItem('taskArray'));

    if(taskArray[checkkey].status === 'checked-task') {

        taskArray[checkkey].status = '';

    } else {

        taskArray[checkkey].status = 'checked-task';

    }

    localStorage.setItem('taskArray', JSON.stringify(taskArray));
  
}

function deleteTask(taskkey) {

    let taskArray = JSON.parse(localStorage.getItem('taskArray'));
    taskArray.splice(taskkey, 1);

    localStorage.setItem('taskArray', JSON.stringify(taskArray));

}

function editTask(taskkey) {

    const taskArray = JSON.parse(localStorage.getItem('taskArray'));

    textArea.value = taskArray[taskkey].task;
    dateTask.textContent = taskArray[taskkey].date;

    btnConfirm.setAttribute("date-taskkey", taskkey);

}

btnConfirm.addEventListener('click', e => {

    e.preventDefault();
    const taskkey = btnConfirm.getAttribute("date-taskkey");
    confirmEdit(taskkey);
    textArea.value = '';

});

function confirmEdit(taskkey) {

    const taskArray = JSON.parse(localStorage.getItem('taskArray'));

    const editedTask = textArea.value;

    if(editedTask === '') {

        textArea.classList.add('error');
        textArea.focus();

    } else {

        taskArray[taskkey].task = editedTask;
        localStorage.setItem('taskArray', JSON.stringify(taskArray));
        closeModal();

        renderTasks();

    }

}

function numberOfTasks() {

    const taskArray = getTask();

    let numberTasks = 0;

    for(let x=0; x < taskArray.length; x++) {

        if(taskArray[x].status === '') {

            numberTasks++;

        }

    }

    if(numberTasks === 0) {

        counterTasks.textContent = 'adicione novas tarefas';

    } else if (numberTasks === 1) {

        counterTasks.textContent = numberTasks + ' tarefa restante';

    } else {

        counterTasks.textContent = numberTasks + ' tarefas restantes';

    }

}

function clearLocalStorage() {

    localStorage.removeItem('taskArray');
    renderTasks();

}

function closeModal() {

    modal.classList.remove('show-modal');
    textArea.classList.remove('error');

}

btnCancel.addEventListener('click', e => {

    e.preventDefault();
    closeModal();

});

modal.addEventListener('click', function(e) {

    if(e.target === this){

        closeModal();

    }

});

btnClear.addEventListener('click', e => {

    e.preventDefault();

    const taskArray = getTask();

    if(taskArray.length !== 0) {

        confirm('Deseja deletar todas as tarefas?') === true && clearLocalStorage();

    }

});

document.addEventListener('keypress', e => {

    const taskValue = inputTask.value;

    const key = e.key;

    if(key === 'Enter' && taskValue) {

        e.preventDefault();
        addTask();
        renderTasks();

        inputTask.value = '';

    }
  
}, false);

// FUNCTION CHANGE THEME

const btnTheme = document.getElementById('btnTheme');

function createThemeLocalStorage() {

    if(localStorage.getItem("theme") === null) {

        localStorage.setItem('theme', 'dark');

    }

}

createThemeLocalStorage();

function addThemeLocalStorage(){

    const theme = localStorage.getItem('theme');

    if(theme === 'dark') {

        localStorage.setItem('theme', 'light');

    } else {

        localStorage.setItem('theme', 'dark');

    }

}

function changeTheme() {

    const theme = localStorage.getItem('theme');

    console.log(theme)

    if(theme === 'dark') {

        document.documentElement.setAttribute('data-theme', 'dark');

    } else if(theme === 'light') {

        document.documentElement.setAttribute('data-theme', 'light');

    }

}

changeTheme();

btnTheme.addEventListener('click', e => {

    e.preventDefault();
    addThemeLocalStorage();
    changeTheme();

});