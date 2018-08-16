;(() => {
    // Объект стола. Содержит основные DOM - элементы
    function Board() {
        this.cardsBox = document.querySelector('.cards-box');
        this.buttonGetCard = document.querySelector('.get-card-btn');
        this.buttonStopCard = document.querySelector('.stop-card-btn');
        this.playerPlaceCards = document.querySelector('.player-place-cards');
        this.computerPlaceCards = document.querySelector('.computer-place-cards');
        this.welcome = document.querySelector('.welcome-box');
        this.result = document.querySelector('.result-box');
        this.computerPlace = document.querySelector('.computer-place');
        this.playerNameBox = document.querySelector('.player-name');
        this.computerNameBox = document.querySelector('.computer-name');
    };

    Board.prototype = Object.create(CardPack.prototype);
    Board.prototype.constructor = Board;

    // Метод создания карт на столе. Аргументы: массив карт и контейнер в котором создать.
    Board.prototype.createCardOnBoard = function (cardsPack, box) {
        let zIndex = cardsPack.length;
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
            box.appendChild(cardElem);
        }
    };
    // Метод подсчета и вывода результатов
    Board.prototype.calcultResult = function(player, bot) {
        if (player.score <= 21 && bot.score <= 21) {
            switch (true) {
                case player.score > bot.score: 
                    this.result.innerHTML = '<h3>' + localStorage.getItem('player_name') + ', Вы выйграли <i class="material-icons">&#xE815;</i></h3>'; break;
                case bot.score > player.score: 
                    this.result.innerHTML = '<h3>' + localStorage.getItem('player_name') + ', Вы проиграли <i class="material-icons">&#xE814;</i></h3>'; break;   
                case bot.score === player.score: this.result.innerHTML = '<h3>Ничья <i class="material-icons">&#xE7F3;</i></h3>'; break;
            }
        } else {
            switch (true) {
                case player.score < bot.score: 
                    this.result.innerHTML = '<h3>' + localStorage.getItem('player_name') + ', Вы выйграли <i class="material-icons">&#xE815;</i></h3>'; break;
                case bot.score < player.score: 
                    this.result.innerHTML = '<h3>' + localStorage.getItem('player_name') + ', Вы проиграли <i class="material-icons">&#xE814;</i></h3>'; break;   
                case bot.score === player.score: this.result.innerHTML = '<h3>Ничья <i class="material-icons">&#xE7F3;</i></h3>'; break;
            }
        }
    }
    // Метод получения данных из локального хранилища
    Board.prototype.getDataFromLocalStorage = function (bot, player) {
    	CardPack.prototype.cards = JSON.parse(localStorage.getItem('cards'));

    	this.playerNameBox.innerHTML = localStorage.getItem('player_name');
    	this.computerNameBox.innerHTML = localStorage.getItem('bot_name');

    	player.score = Math.floor(localStorage.getItem('player_score'));
    	bot.score = Math.floor(localStorage.getItem('bot_score'));

    	this.createCardOnBoard(this.cards, this.cardsBox);
    	this.createCardOnBoard(JSON.parse(localStorage.getItem('player_hand')), this.playerPlaceCards);
    	this.createCardOnBoard(JSON.parse(localStorage.getItem('bot_hand')), this.computerPlaceCards);

    	player.showScore();
    	bot.showScore();
    };
    window.Board = Board;
    module.exports = Board;
})();