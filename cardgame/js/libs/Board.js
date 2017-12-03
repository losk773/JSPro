;(() => {
    // Объект стола. Содержит основные DOM - элементы
    function Board() {
        this.cardsBox = document.querySelector('.cards-box');
        this.buttonGetCard = document.querySelector('.get-card-btn');
        this.buttonStopCard = document.querySelector('.stop-card-btn');
        this.playerPlaceCards = document.querySelector('.player-place-cards');
        this.computerPlaceCards = document.querySelector('.computer-place-cards');
        this.welcome = document.querySelector('.welcome-box');
        this.computerPlace = document.querySelector('.computer-place');
        this.playerNameBox = document.querySelector('.player-name');
        this.computerNameBox = document.querySelector('.computer-name');
    };
    // Метод создания карт на столе. В качестве аргумента получает массив карт колоды.
    Board.prototype.createPackOnBoard = function (cardsPack) {
        this.cardsBox.innerHTML = '';
        this.playerPlaceCards.innerHTML = '';
        this.computerPlaceCards.innerHTML = '';

        let zIndex = 52;
        let leftPos = 0;
        let topPos = 0;

        for (let i = 0; i < cardsPack.length; i++) {
            let cardElem = document.createElement('div');
            cardElem.classList.add('card');
            cardElem.dataset.color = cardsPack[i].color;
            cardElem.innerHTML = "<div class='card-content'>" +
                "<span class='value'>" + cardsPack[i].value + "</span>" +
                " " +
                "<span class='mode'>" + cardsPack[i].mode + "</span>" +
                "</div>";
            cardElem.style.zIndex = --zIndex;
            topPos -= 1.5;
            cardElem.style.top = topPos + 'px';
            this.cardsBox.appendChild(cardElem);
        }
    };
    window.Board = Board;
})();