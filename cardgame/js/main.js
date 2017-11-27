var Game = (function () {
    let cardsArray = [];
    let colors = ['♠', '♣', '♥', '♦'];
    let values = [6, 7, 8, 9, 10, 'валет', 'дама', 'король', 'туз'];
    let result = 0;
    let getCardBtn = document.querySelector('.get-card-btn');
    let stopCardBtn = document.querySelector('.stop-card-btn');

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

            this.shufflePack(cardsArray);
            this.createCards();
        },
        shufflePack: function (arr) {
            arr.sort((a, b) => { return Math.random() - 0.5});
        },
        createCards: function () {
            let packBox = document.querySelector('.card-pack');
            let zIndex = 35;
            let leftPos = 0;
            let topPos = 0;
            for (let i = 0; i < cardsArray.length; i++) {
                let cardElem = document.createElement('div');
                cardElem.classList.add('card');
                cardElem.innerHTML = "<span class='value'>" + cardsArray[i].value + "</span>" +
                    " " +
                    "<span class='color'>" + cardsArray[i].color + "</span>";
                
                cardElem.style.zIndex = --zIndex;
                leftPos += 2;
                topPos -= 2;
                cardElem.style.left = leftPos + 'px';
                cardElem.style.top = topPos + 'px';
                packBox.appendChild(cardElem);
            }
        },
        getCard: function () {
            let playBoard = document.querySelector('.play-board');
            let cardItems = Array.from(document.querySelectorAll('.card'));
            let resultBox = document.querySelector('.result');
            let card = cardsArray.shift();

            playBoard.appendChild(cardItems.shift());

            switch (true) {
                case (parseInt(card.value) >= 6 || parseInt(card.value) <= 10):
                    result += parseInt(card.value);
                    break;
                case card.value === 'король':
                    result += 4;
                    break;
                case card.value === 'дама':
                    result += 3;
                    break;
                case card.value === 'валет':
                    result += 2;
                    break;
                case card.value === 'туз':
                    result += parseInt(prompt('Выберите номинал туза 1/11', ''));
                    break;
            }
            resultBox.innerText = result;
        },
        stopedGame: function() {
            getCardBtn.setAttribute('disabled', 'true');
            alert('Вы набрали ' + result + ' очков');
        },
        start: function () {
            this.generatePackCards();
            getCardBtn.addEventListener('click', this.getCard);
            stopCardBtn.addEventListener('click', this.stopedGame);

        }
    }
})();