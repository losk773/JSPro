var Game = (() => {
    let board = new Board();
    let cardPack = new CardPack();
    let player = new Player(board.playerPlaceCards, 'player');
    let bot = new Player(board.computerPlaceCards);
    let startButton = document.querySelector('.start-game-btn');
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
        start: function () {
            
            board.welcome.classList.remove('active');

            player.name = document.querySelector('.name-input').value;
            bot.name = 'Искуственный Интелект';

            board.playerNameBox.innerText = player.name;
            board.computerNameBox.innerText = bot.name;

            this.tossCardsOnBoard();
            
        },
        restart: function() {
            board.buttonGetCard.removeAttribute('disabled');
            board.buttonStopCard.removeAttribute('disabled');
            player.score = 0;
            bot.score = 0;
            this.tossCardsOnBoard();
        },
        init: function () {
            board.welcome.classList.add('active');
            board.buttonGetCard.addEventListener('click', player.getCard.bind(player));
            board.buttonStopCard.addEventListener('click', bot.botGame.bind(bot));
            startButton.addEventListener('click', this.start.bind(this));
            restartButton.addEventListener('click', this.restart.bind(this));
        }
    };
})();