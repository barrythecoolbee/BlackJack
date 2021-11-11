// pcm 20172018a Blackjack oop

let game = null;

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization(){
    document.getElementById("card").disabled     = false;
    document.getElementById("stand").disabled     = false;
    document.getElementById("new_game").disabled = true;
}

function finalize_buttons(){
    document.getElementById("card").disabled     = true;
    document.getElementById("stand").disabled     = true;
    document.getElementById("new_game").disabled = false;
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
function new_game(){

    game = new BlackJack();

    dealer_new_card();
    dealer_new_card();
    player_new_card();
    player_new_card();


    buttons_initialization();    
    
    //debug(game);
    //debug(game.get_cards_value([8,1,1,1,]));
    //debug(game.get_player_cards());
}

function update_dealer(state){
    game.cardImg("dealerhand", game.get_dealer_cards());
    let cartas = "";
     
    if(state.gameEnded === true){
        if(state.dealerWon){
            cartas = "Dealer Won";
            finalize_buttons();
        } else {
            cartas = "Player Won";
            finalize_buttons();
        }
    }
    document.getElementById("dealer").innerHTML = cartas;

}

function update_player(state){
    game.cardImg("playerhand", game.get_player_cards());
    let cartas = "";

    if(state.gameEnded === true){
        if(state.playerWon){
            cartas = "Player Won";
            finalize_buttons();
        } else {
            cartas = "Bust";
            finalize_buttons();
        }
    }
    document.getElementById("player").innerHTML = cartas;

}

function dealer_new_card(){
    game.dealer_move();
    update_dealer(game.get_game_state());
    return game.get_game_state();
}

function player_new_card(){
    game.player_move();
    update_player(game.get_game_state());
    return game.get_game_state();
}

function dealer_finish(){
    game.setDealerTurn (true);
    let state = game.get_game_state();
    while(!game.state.gameEnded){
        update_dealer(state);
        if(game.get_cards_value(game.get_dealer_cards()) < game.get_cards_value(game.get_player_cards())){
            dealer_new_card(state);
        }
        game.get_game_state();
    }
    game.state.gameEnded;
    update_dealer(state);
}

