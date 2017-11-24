"use strict";
exports.__esModule = true;
var score_1 = require("./score");
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
        this.advantage = 0;
        this.score = new score_1.Score();
    }
    return Player;
}());
exports.Player = Player;
