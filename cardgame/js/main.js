var Game = (() => {
    let board = new Board();
    let cardPack = new CardPack();
    let player = new Player(board.playerPlaceCards, 'player');
    let bot = new Player(board.computerPlaceCards);
    let startButton = document.querySelector('.start-game-btn');
    let restartButton = document.querySelector('.restart-card-btn');

    return {
        botGame: function(){

        },
        tossCardsOnBoard: function () {
            board.computerPlace.classList.remove('active');
            cardPack.generateCardsPack();
            board.createPackOnBoard(cardPack.cards);

            for (let i = 0; i < 2; i++) {
                player.getCard();
                bot.getCard();
            }
        },
        start: function () {
            
            board.welcome.classList.remove('active');

            player.name = document.querySelector('.name-input').value;
            bot.name = 'Джон';

            board.playerNameBox.innerHTML = '<i class="material-icons">&#xE7FD;</i>' + player.name;
            board.computerNameBox.innerHTML = '<i class="material-icons">&#xE30B;</i>' + bot.name;

            this.tossCardsOnBoard();
            
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
            board.welcome.classList.add('active');
            board.buttonGetCard.addEventListener('click', player.getCard.bind(player));
            board.buttonStopCard.addEventListener('click',function(e) {
                bot.startComputerGame.call(bot,e);
                board.calcultResult.apply(board,[player, bot]);
                board.result.classList.add('active');
                restartButton.style.zIndex = 100;
            });
            startButton.addEventListener('click', this.start.bind(this));
            restartButton.addEventListener('click', this.restart.bind(this));
        }
    };
})();