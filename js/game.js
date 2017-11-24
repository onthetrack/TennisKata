"use strict";
exports.__esModule = true;
var Game = /** @class */ (function () {
    function Game(player1, player2) {
        this.players = [];
        this.players.push(player1);
        this.players.push(player2);
    }
    Game.prototype.checkWonGames = function (won) {
        return !(this.players[0].score.game === won || this.players[1].score.game === won);
    };
    Game.prototype.dispatchPoints = function () {
        var playerIndex = Math.round(Math.random()); //Returns 0 or 1
        if (this.players[playerIndex].score.pointIndex === 3) {
            this.resetPointIndex();
            this.players[playerIndex].score.game++; //Incrementation of game for the players[playerIndex]
            console.log(this.players[playerIndex].name + " won the game.");
        }
        else {
            this.players[playerIndex].score.pointIndex++;
            console.log(this.players[playerIndex].name + " won a point.");
        }
        this.displayScore();
    };
    Game.prototype.resetPointIndex = function () {
        //Reset the pointIndex of both players
        this.players[0].score.pointIndex = 0;
        this.players[1].score.pointIndex = 0;
    };
    Game.prototype.resetAdvantage = function () {
        //Reset the Advantage of both players
        this.players[0].advantage = 0;
        this.players[1].advantage = 0;
    };
    Game.prototype.displayScore = function () {
        var tab = [0, 15, 30, 40];
        console.log(this.players[0].name + " -> S:" + this.players[0].score.set + " - G:" + this.players[0].score.game + " - P:" + tab[this.players[0].score.pointIndex]);
        console.log(this.players[1].name + " -> S:" + this.players[1].score.set + " - G:" + this.players[1].score.game + " - P:" + tab[this.players[1].score.pointIndex]);
    };
    Game.prototype.displayBegin = function () {
        var tab = [0, 15, 30, 40];
        console.log('Game started with :');
        console.log(this.players[0].name + " -> S:0 - G:" + this.players[0].score.game + " - P:" + tab[this.players[0].score.pointIndex]);
        console.log(this.players[1].name + " -> S:0 - G:" + this.players[1].score.game + " - P:" + tab[this.players[1].score.pointIndex]);
    };
    Game.prototype.checkDeuce = function () {
        if (this.players[0].score.pointIndex === 3 && this.players[1].score.pointIndex === 3) {
            this.resetPointIndex();
            return true;
        }
        return false;
    };
    Game.prototype.serveForAdvantage = function () {
        var playerIndex = Math.round(Math.random()); //Returns 0 or 1
        this.players[playerIndex].advantage++;
        console.log(this.players[playerIndex].name + " has the advantage.");
    };
    Game.prototype.deuceWinner = function () {
        var playerIndex = Math.round(Math.random()); //Returns 0 or 1
        var otherIndex = Math.abs(playerIndex - 1);
        var advantageDif = Math.abs(this.players[playerIndex].advantage - this.players[otherIndex].advantage);
        console.log('There is a deuce!!');
        while (advantageDif < 2) {
            this.serveForAdvantage();
            advantageDif = Math.abs(this.players[playerIndex].advantage - this.players[otherIndex].advantage);
        }
        if (this.players[playerIndex].advantage < this.players[otherIndex].advantage) {
            this.players[otherIndex].score.game++;
            console.log(this.players[otherIndex].name + " won the deuce.");
        }
        else {
            this.players[playerIndex].score.game++;
            console.log(this.players[playerIndex].name + " won the deuce.");
        }
        this.resetAdvantage();
    };
    return Game;
}());
exports.Game = Game;
