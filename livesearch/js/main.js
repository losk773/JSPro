var LiveSearch = (() => {
    var data = ['Москва', 'Минск', 'Молодечно', 'Киев', 'Нью Йорк', 'Амстердам'];
    return {
        search: function() {
            let input = document.querySelector('input[data-type="search"]');
            let elements = document.querySelectorAll('.search-item');

            input.addEventListener('keyup', function(){
                let val = input.value.toLowerCase();
                for(let i = 0; i < data.length; i++) {
                    let pos = data[i].toLowerCase().indexOf(val);
                    if( pos >= 0 && val !== '') {
                        elements[i].classList.add('active');
                    } else {
                        elements[i].classList.remove('active');
                    }
                }
            });
        },
        init: function() {
            let listElements = document.querySelector('.search-data-list');
            
            for (let i = 0; i < data.length; i++) {
                let item = document.createElement('div');
                item.classList.add('search-item');
                item.textContent = data[i];
                listElements.appendChild(item);
            }
            this.search();
        }
    };
})();
