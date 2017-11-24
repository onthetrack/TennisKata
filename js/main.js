"use strict";
exports.__esModule = true;
var player_1 = require("./player");
var game_1 = require("./game");
var player1 = new player_1.Player("player1");
var player2 = new player_1.Player("player2");
var wonGames = 15;
var game = new game_1.Game(player1, player2);
game.displayBegin();
while (game.checkWonGames(wonGames)) {
    if (game.checkDeuce()) {
        game.deuceWinner();
    }
    else {
        game.dispatchPoints();
    }
}
console.log('Game endend  because all the game have been played'); // The game ended
