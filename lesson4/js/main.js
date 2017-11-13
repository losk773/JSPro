;
(() => {
    let taskSumBtn = document.querySelector('.task-btn[data-task="sum"]');
    let taskWordBtn = document.querySelector('.task-btn[data-task="word"]');
    let taskRandomBtn = document.querySelector('.task-btn[data-task="random"]');

    let getInputTask = (target) => {
        let taskBox = target.closest('.task');
        let taskInput = taskBox.querySelector('.task-input');

        return taskInput;
    };
    let getResultBox = (target) => {
        let taskBox = target.closest('.task');
        let resultBox = taskBox.querySelector('.task-result');

        return resultBox;
    };
    // Задание 1:
    let task1 = (event) => {
        let taskInput = getInputTask(event.target);
        let resultBox = getResultBox(event.target);
        let sum = 0;
        for (let i = 1; i <= taskInput.value; i++) {
            sum += Math.pow(i, 3);
        }
        taskInput.value = 1;
        resultBox.innerHTML = sum;
    }
    // Задание 2:
    let task2 = (event) => {
        let taskInput = getInputTask(event.target);
        let stringInput = taskInput.value;
        let words = stringInput.split(' ');
        let resultList = getResultBox(event.target);

        resultList.innerHTML = '';

        if (!parseInt(stringInput) && stringInput) {
            for (let i = 0; i < words.length; i++) {
                let listItem = document.createElement('li');
                listItem.className = 'task-result-item';
                listItem.innerHTML = words[i]
                resultList.appendChild(listItem);
                taskInput.value = '';
            }
        } else {
            alert('Вводить можно только слова!!!');
        }
    }
    // Задание 3
    let task3 = (event) => {
        let taskInput = getInputTask(event.target);
        let resultList = getResultBox(event.target);
        let radioInput = document.querySelectorAll('.task .type-radio');
        let count = parseInt(taskInput.value);
        let rand = 0;
        let randomContainer = '';
        resultList.innerHTML = '';

        for (let i = 0; i < radioInput.length; i++) {
            if (radioInput[i].checked && radioInput[i].dataset.type == 'array') {
                randomContainer = [];

                for (let k = 0; k < count; k++) {
                    let listItem = document.createElement('li');
                    listItem.className = 'task-result-item';
                    rand = Math.random() * 10;
                    randomContainer.push(Math.floor(rand));
                    listItem.innerHTML = randomContainer[k];
                    resultList.appendChild(listItem);
                }
            } else if (radioInput[i].checked && radioInput[i].dataset.type == 'map') {
                randomContainer = new Map();

                for (let k = 0; k < count; k++) {
                    let listItem = document.createElement('li');
                    listItem.className = 'task-result-item';
                    rand = Math.random() * 10;
                    randomContainer.set(k, Math.floor(rand));
                    listItem.innerHTML = randomContainer.get(k);
                    resultList.appendChild(listItem);
                }
            }
        }
        taskInput.value = '';
    };


    taskSumBtn.addEventListener('click', task1);
    taskWordBtn.addEventListener('click', task2);
    taskRandomBtn.addEventListener('click', task3);
})();