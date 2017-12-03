;
(() => {
    // Объект игрока
    function Player(DOMPlaceElement, name = 'Bot') {
        this.name = name;
        this.score = 0;
        this.place = DOMPlaceElement; // DOM-елемент контейнера карт игрока
        this.hand = []; // массив карт в руке у игрока
    };

    // Метод показа счета игрока
    Player.prototype.showScore = function() {
        let scoreBox = this.place.nextElementSibling;
        scoreBox.innerText = this.score;
    };

    // Метод получения карты из колоды
    Player.prototype.getCard = function (cards) {
        let gotCard = cards.shift();
        let cardItems = Array.from(document.querySelectorAll('.card'));
        this.hand.push(gotCard);
        this.place.appendChild(cardItems.shift());

        switch (true) {
            case (parseInt(gotCard.value) >= 6 || parseInt(gotCard.value) <= 10):
                this.score += parseInt(gotCard.value);
                break;
            case gotCard.value === 'К':
                this.score += 4;
                break;
            case gotCard.value === 'Д':
                this.score += 3;
                break;
            case gotCard.value === 'В':
                this.score += 2;
                break;
            case gotCard.value === 'Т':
                this.score += parseInt(prompt('Выберите номинал туза 1/11', ''));
                break;
        }
        this.showScore();
    };

    // Метод остановки набора карт игроком
    Player.prototype.stopGame = function(e) {
        let target = e.target;
        target.setAttribute('disabled','true');
    };

    window.Player = Player;
})();