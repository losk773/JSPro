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