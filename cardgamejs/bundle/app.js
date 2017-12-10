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
/***/ (function(module, exports) {

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
        // Метод инициализации игры
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

/***/ })
/******/ ]);