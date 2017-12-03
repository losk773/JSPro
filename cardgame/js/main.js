var Game = (() => {
    let board = new Board();
    let cardPack = new CardPack();
    let welcome = document.querySelector('.welcome-box');
    let startButton = document.querySelector('.start-game-btn');

    return {
        start: function() {
            welcome.classList.remove('active');
            let namePlayer = document.querySelector('.name-input').value;
            let player = new Player(board.playerPlace,namePlayer);
            let bot = new Player(board.computerPlace);

            cardPack.generateCardsPack();
            cardPack.shuffleCardsPack();
            board.createPackOnBoard(cardPack.cards);

            for (let i = 0; i < 2; i++) {
                player.getCard(cardPack.cards);
            }
            
            board.buttonGetCard.addEventListener('click', player.getCard.bind(player, cardPack.cards));
            board.buttonStopCard.addEventListener('click', player.stopGame);
        },
        init: function() {
            welcome.classList.add('active');
            startButton.addEventListener('click', this.start);
        }
    };
})();