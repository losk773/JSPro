;(() => {
    // Объект игрока
    function Player(DOMPlaceElement, mode) {
        this.score = 0;
        this.place = DOMPlaceElement; // DOM-елемент контейнера карт игрока
        this.hand = []; // массив карт в руке у игрока
        this.mode = mode || 'bot'; // поле режима: человек или ИИ
    };

    Player.prototype = Object.create(CardPack.prototype);
    Player.prototype.constructor = Player;

    // Метод показа счета игрока
    Player.prototype.showScore = function() {
        let scoreBox = this.place.nextElementSibling;
        scoreBox.innerText = this.score;
    };
    // Метод получения карты из колоды
    Player.prototype.getCard = function (e) {
        let gotCard = this.cards.shift();
        let cardItems = Array.from(document.querySelectorAll('.cards-box .card'));
        let gotElementCard = cardItems.shift();
        this.hand.push(gotElementCard);
        this.place.appendChild(gotElementCard);
        localStorage.setItem('cards', JSON.stringify(this.cards));
        
        switch (true) {
            case (parseInt(gotCard.value) >= 6 || parseInt(gotCard.value) <= 10): 
                this.score += parseInt(gotCard.value); break;
            case gotCard.value === 'К': this.score += 4; break;
            case gotCard.value === 'Д': this.score += 3; break;
            case gotCard.value === 'В': this.score += 2; break;
            case gotCard.value === 'Т':
                if(this.mode === 'bot') {
                    let answer = ((min, max) => { return Math.floor(Math.random() * (max - min)) + min;})(0, 2);
                    answer ? this.score += 11 : this.score += 1;
                    break;
                } else {
                    this.optionAce(gotElementCard);
                    //this.score += parseInt(prompt('Выберите номинал туза 1/11', ''));
                    break;
                }
        }
        if (this.score > 21 && e) e.target.setAttribute('disabled', 'true');
        this.showScore();
    };
    Player.prototype.startComputerGame = function(e) {
        let target = e.target;
        target.setAttribute('disabled', 'true');
        target.previousElementSibling.setAttribute('disabled', 'true');
        let flag = true;
        let computerPlace = document.querySelector('.computer-place');
        computerPlace.classList.add('active');

        while (flag) {
            switch (true) {
                case (this.score >= 2 && this.score < 16): this.getCard(); break;
                case (this.score >= 16 && this.score < 18):
                    let answer = ((min, max) => { return Math.floor(Math.random() * (max - min)) + min; })(0, 2);
                    answer ? this.getCard() : flag = false;
                    break;
                case this.score >= 18: flag = false; break;
            }
        }
    }
    Player.prototype.optionAce = function(card) {
        let option = document.querySelector('.option').cloneNode(true);
        let buttonOption = option.querySelectorAll('.option button');
        let that = this;
        for(let i = 0; i < buttonOption.length; i++) {
            buttonOption[i].addEventListener('click', function(e) {
                that.score += parseInt(e.target.dataset.value);
                that.showScore();
                option.remove(); 
            });
        }
        option.classList.add('active');
        card.appendChild(option);
    }
    window.Player = Player;
})();