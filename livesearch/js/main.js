var LiveSearch = (() => {
    var data = ['Москва', 'Минск', 'Рига', 'Киев', 'Нью Йорк', 'Амстердам',
                'Лондон', 'Прага', 'Будапешт', 'Париж', 'Вильнюс', 'Берлин',
                'Стокгольм', 'Копенгаген', 'Санкт-Питербург', 'Токио', 'Пекин', 'Гонгконг',
                'Сидней', 'Сингапур', 'Варшава', 'Белосток', 'Познань', 'Барселона'];
    return {
        search: function() {
            let input = document.querySelector('input[data-type="search"]');
            let elements = document.querySelectorAll('.search-item');
            let countBox = document.querySelector('.search-count');

            input.addEventListener('keyup', function(){
                let val = input.value.toLowerCase();
                let count = 0;
                for(let i = 0; i < data.length; i++) {
                    let pos = data[i].toLowerCase().indexOf(val);
                    if( pos >= 0 && val !== '') {
                        elements[i].classList.add('active');
                        count++
                        countBox.classList.add('active');
                        countBox.innerHTML = 'Найденных элементов: ' + count;
                    } else {
                        elements[i].classList.remove('active');
                    }  
                }
                if (count === 0) {
                    countBox.classList.remove('active');
                }
                
            });
        },
        init: function() {
            let listElements = document.querySelector('.search-data-list');
            
            for (let i = 0; i < data.length; i++) {
                let item = document.createElement('div');
                item.classList.add('search-item');
                item.innerHTML = '<i class="material-icons">check</i>' + data[i];
                listElements.appendChild(item);
            }
            this.search();
        }
    };
})();
LiveSearch.init();
