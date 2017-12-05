var Game = (() => {
    let board = new Board();
    let cardPack = new CardPack();
    let player = new Player(board.playerPlaceCards, 'player');
    let bot = new Player(board.computerPlaceCards);
    let startButton = document.querySelector('.name-input');
    let restartButton = document.querySelector('.restart-card-btn');

    return {
        tossCardsOnBoard: function () {
            board.computerPlace.classList.remove('active');
            cardPack.generateCardsPack();
            board.createPackOnBoard(cardPack.cards);

            for (let i = 0; i < 2; i++) {
                player.getCard();
                bot.getCard();
            }
        },
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
        restart: function() {
            board.buttonGetCard.removeAttribute('disabled');
            board.buttonStopCard.removeAttribute('disabled');
            board.result.classList.remove('active');
            player.score = 0;
            bot.score = 0;
            this.tossCardsOnBoard();
        },
        init: function () {
            if (localStorage.getItem('player_name')) {
                board.playerNameBox.innerHTML = localStorage.getItem('player_name');
                board.computerNameBox.innerHTML = localStorage.getItem('bot_name');
                console.log(cardPack);
                board.createPackOnBoard(JSON.parse(localStorage.getItem('cards')));
                console.log(JSON.parse(localStorage.getItem('cards')));
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