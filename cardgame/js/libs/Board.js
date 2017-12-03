;(() => {
    // Объект стола. Содержит основные DOM - элементы
    function Board() {
        this.cardsBox = document.querySelector('.cards-box');
        this.buttonGetCard = document.querySelector('.get-card-btn');
        this.buttonStopCard = document.querySelector('.stop-card-btn');
        this.playerPlace = document.querySelector('.player-place-cards');
        this.computerPlace = document.querySelector('.computer-place');
    };
    // Метод создания карт на столе. В качестве аргумента получает массив карт колоды.
    Board.prototype.createPackOnBoard = function (cardsPack) {
        let zIndex = 52;
        let leftPos = 0;
        let topPos = 0;

        for (let i = 0; i < cardsPack.length; i++) {
            let cardElem = document.createElement('div');
            cardElem.classList.add('card');
            cardElem.innerHTML = "<div class='card-content'>" +
                "<span class='value'>" + cardsPack[i].value + "</span>" +
                " " +
                "<span class='color'>" + cardsPack[i].color + "</span>" +
                "</div>";
            cardElem.style.zIndex = --zIndex;
            topPos -= 1.5;
            cardElem.style.top = topPos + 'px';
            this.cardsBox.appendChild(cardElem);
        }
    };
    
    window.Board = Board;
})();