;
(() => {
    let taskSumBtn = document.querySelector('.task-btn[data-task="sum"]');
    let taskWordBtn = document.querySelector('.task-btn[data-task="word"]');
    let taskRandomBtn = document.querySelector('.task-btn[data-task="random"]');
    let taskMoneyBtn = document.querySelector('.task-btn[data-task="money"]');
    let taskBDayBtn = document.querySelector('.task-btn[data-task="bday"]');

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
        resultBox.innerHTML = '<p class="task-result-text">' + sum + '</p>';
    }
    // Задание 2:
    let task2 = (event) => {
        let taskInput = getInputTask(event.target);
        let resultList = getResultBox(event.target);

        let stringInput = taskInput.value;
        let words = stringInput.split(' ');

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
    // Задание 3/4
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

    // Задание 7
    let task7 = (event) => {
        let taskInput = getInputTask(event.target);
        let resultBox = getResultBox(event.target);

        let rubObj = {
            one: 'рубль',
            many: 'рублей',
            other: 'рубля'
        };
        let centObj = {
            one: 'копейка',
            many: 'копеек',
            other: 'копейки'
        };

        let money = parseFloat(taskInput.value);
        if ( money ) {
            let rub = Math.floor(money);
            let cent = Math.round((money - rub) * 100);
    
            let ostRub = rub % 10;
            let ostCent = cent % 10;
    
            resultBox.innerHTML = '';
    
            // Проверка на рубли
            if (ostRub === 1 && rub !== 11) {
                rub += " " + rubObj.one;
            } else if ((rub >= 10 && rub <= 20) || ostRub === 0 ) {
                rub += " " + rubObj.many;
            } else if ((ostRub >= 2 && ostRub <= 4)) {
                rub += " " + rubObj.other;
            } else if (ostRub >= 5 && ostRub <= 9) {
                rub += " " + rubObj.many;
            }
    
            //Проверка на копейки
            if ((ostCent === 1 && ostCent !== 11)) {
                cent += " " + centObj.one;
            } else if ((ostCent >= 10 && ostCent <= 20) || ostCent === 0) {
                cent += " " + centObj.many;
            } else if ((ostCent >= 2 && ostCent <= 4)) {
                cent += " " + centObj.other;
            } else if ((ostCent >= 5 && ostCent <= 9)) {
                cent += " " + centObj.many;
            }
    
            resultBox.innerHTML = '<p class="task-result-text">' + rub + ' ' + cent + '</p>';
        } else {
            alert('Введите корректную сумму денег!!!');
        }

    };
    // Задание 8
    let task8 = (event) => {
        let taskInput = getInputTask(event.target);
        let resultBox = getResultBox(event.target);
        
        let [dayBday, monthBday] = (taskInput.value).split('.');

        if (parseInt(dayBday) && parseInt(monthBday) && monthBday < 13 && (dayBday > 0 && dayBday <= 31) ) {
            let dateObj = new Date();
            let diffMonth = monthBday - (dateObj.getMonth() + 1);
            let nowYear = dateObj.getFullYear();
            let res = 0;
            let bday = 0;
    
            if ( diffMonth < 0 ) {
                bday = new Date((nowYear + 1), monthBday - 1, dayBday);
            } else {
                bday = new Date(nowYear, monthBday - 1, dayBday);
            }
            res = parseInt((bday - dateObj) / 86400000);
    
            resultBox.innerHTML = '<p class="task-result-text">' + res + ' дней' + '</p>';
        } else {
            alert('Введите корректную дату!!!');
        }
        
    };

    taskSumBtn.addEventListener('click', task1);
    taskWordBtn.addEventListener('click', task2);
    taskRandomBtn.addEventListener('click', task3);
    taskMoneyBtn.addEventListener('click', task7);
    taskBDayBtn.addEventListener('click', task8);
})();