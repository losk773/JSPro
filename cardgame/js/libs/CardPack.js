;
(() => {
    // Объект колоды карт
    function CardPack() {
        this.colors = ['♠', '♣', '♥', '♦'];
        this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'В', 'Д', 'К', 'Т'];
        this.cards = []; // массив карт
    };

    function Card(color, value) {
        this.color = color;
        this.value = value;
    };

    // Метод генерации колоды карт
    CardPack.prototype.generateCardsPack = function () {
        for (let i = 0; i < this.colors.length; i++) {
            for (let k = 0; k < this.values.length; k++) {
                let card = new Card(this.colors[i], this.values[k]);
                this.cards.push(card);
            }
        }
    };

    // Метод перетасовки колоды
    CardPack.prototype.shuffleCardsPack = function () {
        if (this.cards.length) {
            this.cards.sort((a, b) => {
                return Math.random() - 0.5
            });
        }
    };

    window.CardPack = CardPack;
})();