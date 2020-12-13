'use strict';

let pendingCount = 0;
let completedCount = 0;
const completedList = document.querySelector('.completed__list');
const pendingList = document.querySelector('.pending__list');

getTasks();
function getTasks() {
    let task;
    let key;
    completedCount = 0;
    pendingCount = 0;
    completedList.textContent = '';
    pendingList.textContent = '';
    for (let i = 0; i < localStorage.length; i++) {
        task = JSON.parse(localStorage.getItem(localStorage.key(i)));
        key = localStorage.key(i);
        if (task.completed) {
            putTask(task.text, completedList, key, task.completed);
            completedCount++;
        } else {
            putTask(task.text, pendingList, key, task.completed);
            pendingCount++;
        }
    }
    taskCounters();
};

(function showDate() {
    const now = new Date();
    const dateArea = document.querySelector('.date');
    dateArea.textContent = now.toLocaleDateString('en');
})();

function taskCounters() {
    const pendingInfo = document.querySelector('.pending__info');
    pendingInfo.textContent = `You have ${pendingCount} pending items.`;
    const completedInfo = document.querySelector('.completed__info');
    completedInfo.textContent = `Completed tasks: ${completedCount==0 ?` 0` : `${parseInt(completedCount/(pendingCount+completedCount)*100)}`}%`;
};

(function saveTask() {
    const inputField = document.querySelector('.input__field');
    const inputButton = document.querySelector('.input__button');
    inputButton.addEventListener('click', () => {
        if (inputField.value) {
            const taskObject = {
                text: inputField.value,
                completed: false
            }
            const randNum = Math.floor(window.performance.now() * 1000);
            localStorage.setItem(`task${randNum}`, JSON.stringify(taskObject));
            inputField.value = '';
            getTasks();    
        }
    });
})();

function putTask(text, list, key, completed) {   
    const code =    `<div class="${key}">
                        <div class="intask__text">
                            <input type="checkbox" class="checkbox"
                            ${completed ? `checked` : ``}> ${text}
                        </div>
                        <div class="intask__delete">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </div>
                    </div>`
    list.insertAdjacentHTML('afterbegin', code);
    checkTask();
}

function checkTask() {
    const tasks = document.querySelectorAll('[class^=task]');
    const checkboxes = document.querySelectorAll('.checkbox');
    for (let i = 0; i < tasks.length; i++) {
        checkboxes[i].addEventListener('change', () => {
            const taskObject = JSON.parse(localStorage.getItem(tasks[i].className));
            taskObject.completed = true;
            localStorage.setItem(tasks[i].className, JSON.stringify(taskObject));
            completedCount++;
            getTasks();
        })       
    }
    
};

(function toggleCompleted() {
    const hideButton = document.querySelector('.buttons__hide');
    hideButton.addEventListener('click', () => {
        const completed = document.querySelector('.completed');
        completed.classList.toggle('completed--hide');
        hideButton.textContent == 'Show Complete' ? hideButton.textContent = 'Hide Complete' : hideButton.textContent = 'Show Complete';
    })
})();

(function clearAll() {
    const clearButton = document.querySelector('.buttons__clear');
    clearButton.addEventListener('click', () => {
        localStorage.clear();
        getTasks();
    })
})();