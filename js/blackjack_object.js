// pcm 20172018a Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;
let suit;
//let naipe = "";
// Classe BlackJack - construtor
class BlackJack {
    constructor() {
        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        

        this.img_cartas = {
            1: "img/AS.png" , //+ naipe +".png", 
            2: "img/2C.png" ,
            3: "img/3D.png" , 
            4: "img/4H.png" ,
            5: "img/5S.png" ,
            6: "img/6C.png" ,
            7: "img/7D.png" ,
            8: "img/8H.png" ,
            9: "img/9S.png" ,
            10: "img/10C.png",
            11: "img/JD.png" ,
            12: "img/QH.png" ,
            13: "img/KS.png" ,
        }
        

        //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {
            const suits = 4;
            const CARDS_PER_SUIT = 13;
            

            let deck = [];
            for (let i = 0; i < suits * CARDS_PER_SUIT; i++) {
                deck[i] = (i % CARDS_PER_SUIT) + 1;
              }
              return deck;
        };

        this.shuffle = function (deck) {
            let indexes = [];
            let shuffled = [];
            let index = null;

            for(let n = 0; n < deck.length; n++){
                indexes.push(n);
            }
            for(let n = 0; n < deck.length; n++){
                index = Math.floor(Math.random() * indexes.length);
                shuffled.push(deck[indexes[index]]);
                indexes.splice(index, 1);
            }
            return shuffled;
        };

        // baralho de cartas baralhado
        this.deck = this.shuffle(this.new_deck());
        //this.deck = this.new_deck();
    }

    // métodos
    // devolve as cartas do dealer num novo array (splice)
    get_dealer_cards() {
        return this.dealer_cards.slice();
    }

    // devolve as cartas do player num novo array (splice)
    get_player_cards() {
        return this.player_cards.slice();
    }

    // Ativa a variável booleana "dealerTurn"
    setDealerTurn (val) {
        this.dealerTurn = val;
    }

    //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
    get_cards_value(cards) {
        let noAces = cards.filter(function(card) { return card != 1; });
        let figtransf = noAces.map(function(c) { return c > 10 ? 10 : c; });
        let sum = figtransf.reduce(function(sum, value) { return sum += value; }, 0);
        let num_aces = cards.length - noAces.length;
        while (num_aces > 0) {
            if (sum + 11 > MAX_POINTS) {
                return sum + num_aces;
            }
            sum += 11;
            num_aces -= 1;

        }
        return sum + num_aces;


    }

    dealer_move() {
        let card = this.deck[0];
        this.deck.splice(0,1);
        this.dealer_cards.push(card);
        return this.get_game_state();
    }

    player_move() {
        let card = this.deck[0];
        this.deck.splice(0,1);
        this.player_cards.push(card);
        return this.get_game_state();
    }

    get_game_state() {
        let playerPoints = this.get_cards_value(this.player_cards);
        let dealerPoints = this.get_cards_value(this.dealer_cards);
        let playerBusted = playerPoints > MAX_POINTS;
        let playerWon = playerPoints === MAX_POINTS;
        let dealerBusted = this.dealerTurn && (dealerPoints > MAX_POINTS);
        let dealerWon = this.dealerTurn && dealerPoints > playerPoints && dealerPoints <=
            MAX_POINTS;

        this.state.gameEnded = playerBusted || playerWon || dealerBusted || dealerWon;
        this.state.dealerWon = dealerWon;
        this.state.playerBusted = playerBusted;
        this.state.playerWon = playerWon;
        return this.state;
    }

    cardImg(id, cards) {

        let cardNode = document.getElementById(id);
        while (cardNode.firstChild) {
            cardNode.removeChild(cardNode.firstChild);
        }

        for (let i = 0; i < cards.length; i++) {
            let src = document.getElementById(id);
            let img = document.createElement("img");
            if ((id === "dealerhand") && (cards.length === 2) && (i === 1) && this.state.gameEnded === false) {
                img.src = "img/purple_back.png"
            } else {
                img.src = this.img_cartas[cards[i]];
            }
            img.setAttribute("id", "img" + i);
            src.appendChild(img);
        }
    }
}

