var LiveSearch = (() => {
    let data = [];
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
    return {
        loadCities: function(url) {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.responseType = 'json';
                xhr.open('GET', url);
    
                xhr.addEventListener('load', () => resolve(xhr));
                xhr.addEventListener('error', () => reject(xhr));
    
                xhr.send();
            });
        },
        showCities: function(xhr) {
            let listElements = document.querySelector('.search-data-list');
            for (city of xhr.response) {
                let item = document.createElement('div');
                item.classList.add('search-item');
                item.innerHTML = '<i class="material-icons">check</i>' + city.name;
                listElements.appendChild(item);
                data.push(city.name);
            }
        },
        search: function () {
            let input = document.querySelector('input[data-type="search"]');
            let elements = document.querySelectorAll('.search-item');
            let countBox = document.querySelector('.search-count');

            input.addEventListener('keyup', function () {
                let val = input.value.toLowerCase();
                let count = 0;
                for (let i = 0; i < data.length; i++) {
                    let pos = data[i].toLowerCase().indexOf(val);
                    if (pos >= 0 && val !== '') {
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
        init: function () {
            this.loadCities(url)
                .then((xhr) => this.showCities(xhr))
                .then(() => this.search());
        }
    };
})();
LiveSearch.init();
