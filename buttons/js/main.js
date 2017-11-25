;(function () {
    let timerBtn = document.querySelector('.btn1');
    let timeoutBtn = document.querySelector('.btn2');
    let switchBtn = document.querySelector('.btn3');

    //1. Таймер
    let timer = (e) => {
        let timerBox = document.querySelector('.taimer');
        let target = e.target;
        let count = 0;
        let timerId = 0;

        switch (target.dataset.status) {
            case 'off':
                target.dataset.status = 'on';
                timerBtn.innerText = 'Остановить таймер';
                timerBox.innerHTML = '0';
                timerBtn.classList.add('active');

                timerId = setInterval(function () {
                    if (target.dataset.status == 'off') {
                        clearInterval(timerId);
                        return;
                    }
                    timerBox.innerHTML = ++count;
                }, 100);
            break;
            case 'on':
                timerBtn.classList.remove('active');
                timerBtn.innerText = 'Запустить таймер';
                target.dataset.status = 'off';
            break;
        }
    };

    // 2. Кнопка с задержкой
    let timeout = (e) => {
        let target = e.target;
        let timeBox = document.querySelector('.time');
        let time = 5000;
        let ms = Math.floor(time / 1000);
        let timerId = 0;

        target.classList.add('active');

        setTimeout(function () {
            target.classList.remove('active');
        }, time);

        timerId = setInterval(function () {
            timeBox.innerHTML = --ms;
            if (!ms) {
                clearInterval(timerId);
                timeBox.innerHTML = "OFF";
            }
        }, 1000);

    };

    // 3. Переключатель
    let switcher = (e) => {
        let switchBox = document.querySelector('.switch');
        let target = e.target;

        target.classList.toggle('active');

        switch (target.classList.contains('active')) {
            case true: switchBox.innerHTML = 'ON'; break;
            case false: switchBox.innerHTML = 'OFF'; break;
        }
    };

    timerBtn.addEventListener('click', timer);
    timeoutBtn.addEventListener('click', timeout);
    switchBtn.addEventListener('click', switcher);
})();