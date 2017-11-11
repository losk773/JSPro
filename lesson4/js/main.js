;(() => {
    let taskSumBtn = document.querySelector('.task-btn[data-task="sum"]');
    
    let getInputValue = (target) => {
        let taskBox = target.closest('.task');
        let inputValue = taskBox.querySelector('.task-input').value;

        return inputValue;
    };
    let getResultBox = (target) => {
        let taskBox = target.closest('.task');
        let resultBox = taskBox.querySelector('.task-result');

        return resultBox;
    };
    // Задание 1:
    let task1 = function (e) {
        let n = getInputValue(e.target);
        let resultBox = getResultBox(e.target);
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum += Math.pow(i, 3);
        }
        resultBox.innerHTML = sum;
    }
    taskSumBtn.addEventListener('click', task1);
})();