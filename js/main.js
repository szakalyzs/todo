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
            putTask(task.text, completedList, key);
            completedCount++;
        } else {
            putTask(task.text, pendingList, key);
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

function putTask(text, list, key) {   
    const code =    `<div class="${key}">
                        <input type="checkbox">
                        ${text}
                    </div>`
    list.insertAdjacentHTML('afterbegin', code);
    checkTask();
}

function checkTask() {
    const checkBoxes = document.querySelectorAll('[class^=task]');
    for (let i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].addEventListener('click', () => {
            const taskObject = JSON.parse(localStorage.getItem(checkBoxes[i].className));
            taskObject.completed = true;
            localStorage.setItem(checkBoxes[i].className, JSON.stringify(taskObject));
            checkBoxes[i].disabled = true;
            completedCount++;
            getTasks();
        })       
    }
    
};