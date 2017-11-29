var Game = (function () {
    let cardsArray = [];
    let colors = ['♠', '♣', '♥', '♦'];
    let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'В', 'Д', 'К', 'Т'];
    let resultPlayer = 0;
    let resultComputer = 0;
    let getCardBtn = document.querySelector('.get-card-btn');
    let stopCardBtn = document.querySelector('.stop-card-btn');
    let playerBoard = document.querySelector('.player-board');
    let computerBoard = document.querySelector('.computer-board');
    let resultPlayerBox = document.querySelector('.result-player');
    let resultComputerBox = document.querySelector('.result-computer');

    return {
        generatePackCards: function () {
            let Card = function (color, value) {
                this.color = color;
                this.value = value;
            };
            for (let i = 0; i < colors.length; i++) {
                for (let k = 0; k < values.length; k++) {
                    let card = new Card(colors[i], values[k]);
                    cardsArray.push(card);
                }
            }
        },
        shufflePack: function (arr) {
            arr.sort((a, b) => {
                return Math.random() - 0.5;
            });
        },
        createCards: function () {
            let packBox = document.querySelector('.card-pack');
            let zIndex = 52;
            let leftPos = 0;
            let topPos = 0;
            
            for (let i = 0; i < cardsArray.length; i++) {
                let cardElem = document.createElement('div');
                cardElem.classList.add('card');
                cardElem.innerHTML = "<div class='card-content'>" + 
                                     "<span class='value'>" + cardsArray[i].value + "</span>"
                                     +" "+
                                     "<span class='color'>" + cardsArray[i].color + "</span>" +
                                     "</div>";
                cardElem.style.zIndex = --zIndex;
                topPos -= 1.5;
                cardElem.style.top = topPos + 'px';
                packBox.appendChild(cardElem);
            }
        },
        getResult: function (value) {
            let result = 0;
            switch (true) {
                case (parseInt(value) >= 6 || parseInt(value) <= 10): result += parseInt(value); break;
                case value === 'К': result += 4; break;
                case value === 'Д': result += 3; break;
                case value === 'В': result += 2; break;
                case value === 'Т': result += parseInt(prompt('Выберите номинал туза 1/11', '')); break;
            }
            return result;
        },
        stopedGame: function () {
            getCardBtn.setAttribute('disabled', 'true');
            alert('Вы набрали ' + result + ' очков');
        },
        startGame: function () {
            this.generatePackCards();
            this.shufflePack(cardsArray);
            this.createCards();
            
            for (let i = 0; i < 4; i++) {
                let cardItems = Array.from(document.querySelectorAll('.card'));
                let card = cardsArray.shift();
                
                if (i % 2 == 0) {
                    playerBoard.appendChild(cardItems.shift());
                    resultPlayer += this.getResult(card.value);
                    resultPlayerBox.innerText = resultPlayer;
                } else {
                    computerBoard.appendChild(cardItems.shift());
                }
            }
        },
        init: function () {
            this.startGame();
            getCardBtn.addEventListener('click', this.getCard);
            stopCardBtn.addEventListener('click', this.stopedGame);
        }
    }
})();