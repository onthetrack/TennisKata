
import {Player} from "./player";
import {Game} from "./game"

let player1 = new Player("player1");
let player2 = new Player("player2");
//let wonGames = 15;
let wonSets = 3;
let game = new Game(player1, player2);

game.displayBegin();

while(game.checkWonSets(wonSets))
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
console.log('Game endend  because the set maximum has been reached');// The game ended

