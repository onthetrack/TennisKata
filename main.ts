
import {Player} from "./player";
import {Game} from "./game"

let player1 = new Player("player1");
let player2 = new Player("player2");
let wonGames = 15;
let game = new Game(player1, player2);

game.displayBegin();

while(game.checkWonGames(wonGames))
{
    if(game.checkDeuce())
    {
        game.deuceWinner();
    }
    else
    {
        game.dispatchPoints();
    }
}
console.log('Game endend  because all the game have been played');// The game ended

