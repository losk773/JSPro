/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let Game = (() => {
	let CardPack = __webpack_require__(1);
	let Board = __webpack_require__(2);
	let Player = __webpack_require__(3);

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

// Запуск игры
Game.init();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

;(() => {
    // Объект карта
    function Card(mode, value) {
        this.mode = mode;
        this.value = value;
    };
    // Объект колоды
    function CardPack() {
        this.modes = ['♠', '♥', '♣', '♦'];
        this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'В', 'Д', 'К', 'Т'];
        this.generateCardsPack = function () {  // Метод генерации колоды
            CardPack.prototype.cards = [];
            for (let i = 0; i < this.modes.length; i++) {
                for (let k = 0; k < this.values.length; k++) {
                    let card = new Card(this.modes[i], this.values[k]);
                    i % 2 ? card.color = 'red' : card.color = 'black';
                    this.cards.push(card);
                }
            }
            this.shuffleCardsPack();
            
            localStorage.setItem('cards', JSON.stringify(this.cards));
        };
        this.shuffleCardsPack = function () {   // Метод перетасовки колоды
            if (this.cards.length) {
                this.cards.sort((a, b) => {
                    return Math.random() - 0.5
                });
            }
        };
    };
    window.CardPack = CardPack;
    module.exports = CardPack;
})();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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
    Player.prototype.showScore = function(e) {
        let scoreBox = this.place.nextElementSibling;
        scoreBox.innerText = this.score;
        if (this.score > 21 && e) e.target.setAttribute('disabled', 'true');
    };
    // Метод получения карты из колоды
    Player.prototype.getCard = function (e) {
        let gotCard = this.cards.shift();
        let cardItems = Array.from(document.querySelectorAll('.cards-box .card'));
        let gotElementCard = cardItems.shift();
        this.hand.push(gotCard);
        this.place.appendChild(gotElementCard);

        localStorage.setItem('cards', JSON.stringify(this.cards));
        localStorage.setItem(this.mode + '_hand', JSON.stringify(this.hand));

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
                    break;
                }
        }
        localStorage.setItem(this.mode + '_score', this.score);
        this.showScore(e);
    };
    //Метод игры бота
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
                let answer = ((min, max) => { 
                    return Math.floor(Math.random() * (max - min)) + min; 
                })(0, 2);
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
    module.exports = Player;

})();

/***/ })
/******/ ]);