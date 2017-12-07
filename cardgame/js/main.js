var Game = (() => {
    let board = new Board();
    let cardPack = new CardPack();
    let player = new Player(board.playerPlaceCards, 'player');
    let bot = new Player(board.computerPlaceCards);
    let startButton = document.querySelector('.name-input');
    let restartButton = document.querySelector('.restart-card-btn');

    return {
    	// Метод выбрасывания карт на стол
        tossCardsOnBoard: function () {
            board.computerPlace.classList.remove('active');
            cardPack.generateCardsPack();
            board.createCardOnBoard(cardPack.cards, board.cardsBox);

            for (let i = 0; i < 2; i++) {
                player.getCard();
                bot.getCard();
            }
        },
        // Метод запуска игры
        start: function (e) {
            if (e.keyCode === 13) {
                board.welcome.classList.remove('active');
                player.name = document.querySelector('.name-input').value || 'Игрок';
                bot.name = 'Джон';
                board.playerNameBox.innerHTML = player.name;
                board.computerNameBox.innerHTML = bot.name;
                localStorage.setItem('player_name', player.name);
                localStorage.setItem('bot_name', bot.name);
                this.tossCardsOnBoard();
            }
        },
        // Метод рестарта партии
        restart: function() {
            board.cardsBox.innerHTML = '';
            board.playerPlaceCards.innerHTML = '';
            board.computerPlaceCards.innerHTML = '';
            board.buttonGetCard.removeAttribute('disabled');
            board.buttonStopCard.removeAttribute('disabled');
            board.result.classList.remove('active');
            player.score = 0;
            bot.score = 0;
            player.hand = [];
            bot.hand = [];
            this.tossCardsOnBoard();
        },
        // Метод инициализации игрыы
        init: function () {
            if (localStorage.getItem('player_name')) {
                board.getDataFromLocalStorage(bot, player);
            } else {
                board.welcome.classList.add('active');
            }
            board.buttonGetCard.addEventListener('click', player.getCard.bind(player));
            board.buttonStopCard.addEventListener('click',function(e) {
                bot.startComputerGame.call(bot,e);
                board.calcultResult.apply(board,[player, bot]);
                board.result.classList.add('active');
                restartButton.style.zIndex = 100;
            });
            startButton.addEventListener('keyup', this.start.bind(this));
            restartButton.addEventListener('click', this.restart.bind(this));
        }
    };
})();