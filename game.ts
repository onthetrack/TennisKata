import {Player} from "./player"

export class Game
{
    players: Player[];

    constructor(player1: Player, player2: Player) {
        this.players = [];
        this.players.push(player1);
        this.players.push(player2);
    }

    public checkWonGames(won: number)
    {
       return !(this.players[0].score.game === won || this.players[1].score.game === won)
    }

    public checkWonSets(won: number)
    {
        return !(this.players[0].score.set + this.players[1].score.set == won)
    }

    public obviousWin()
    {
        if(this.players[0].score.game == 6 && this.players[1].score.game <= 4)
        {
            this.players[0].score.set++;
            this.resetGame();
            console.log(`${this.players[0].name} won the set.`);
            return 'yes';
        }
        else if(this.players[1].score.game == 6 && this.players[0].score.game <= 4)
        {
            this.players[1].score.set++;
            this.resetGame();
            console.log(`${this.players[1].name} won the set.`);
            return 'yes';
        }
        else if(this.players[0].score.game == 6 || this.players[1].score.game == 6)
            {
            return 'notObvious';
        }
        else
        {
            return 'continue';
        }
    }

    public checkWonSet()
    {

        if(this.obviousWin() == 'notObvious')
        {
            while(this.players[0].score.game == 7 || this.players[1].score.game == 7)
            {
                this.dispatchPoints();
                if(this.players[0].score.game == 6 && this.players[1].score.game == 6)
                {
                    console.log('There is a Tie-Break!!');
                    this.runTieBreak();
                    return;
                }
            }

            if(this.players[0].score.game == 7 )
            {
                this.players[0].score.set++;
                console.log(`${this.players[0].name} won the set.`);
            }
            else if(this.players[1].score.game == 7 )
            {
                this.players[1].score.set++;
                console.log(`${this.players[1].name} won the set.`);
            }
            this.resetGame();
        }
    }

    public runTieBreak()
    {
        while(!this.dispatchTieBreakPoints())
        {
            this.dispatchTieBreakPoints();
        }
    }

    public dispatchPoints() {
        const playerIndex = Math.round(Math.random()); //Returns 0 or 1
        if (this.players[playerIndex].score.pointIndex === 3) {
            this.resetPointIndex();
            this.players[playerIndex].score.game++; //Incrementation of game for the players[playerIndex]
            console.log(`${this.players[playerIndex].name} won the game.`);
            this.checkWonSet();
        } else {
            this.players[playerIndex].score.pointIndex++;
            console.log(`${this.players[playerIndex].name} won a point.`);
        }
        this.displayScore();
    }

    public dispatchTieBreakPoints() {
        const playerIndex = Math.round(Math.random()); //Returns 0 or 1
        const otherIndex = 1 - playerIndex;
        this.players[playerIndex].score.tieBreakPoints++;
        if ((this.players[playerIndex].score.tieBreakPoints == 6 && this.players[otherIndex].score.tieBreakPoints <= 4) ||
            this.players[playerIndex].score.tieBreakPoints >= 6 && ( this.players[playerIndex].score.tieBreakPoints - this.players[otherIndex].score.tieBreakPoints > 2)) {
            console.log(`${this.players[playerIndex].name} won the tie break.`);
            this.players[playerIndex].score.set++;
            this.resetGame();
            return true;
        } else if ((this.players[otherIndex].score.tieBreakPoints == 6 && this.players[playerIndex].score.tieBreakPoints <= 4) ||
            this.players[otherIndex].score.tieBreakPoints >= 6 && ( this.players[otherIndex].score.tieBreakPoints - this.players[playerIndex].score.tieBreakPoints > 2)) {
            console.log(`${this.players[otherIndex].name} won the tie break.`);
            this.players[otherIndex].score.set++;
            this.resetGame();
            return true;
        } else
        {
            return false;
        }
    }

    public resetPointIndex() {
        //Reset the pointIndex of both players
        this.players[0].score.pointIndex = 0;
        this.players[1].score.pointIndex = 0;
    }

    public resetGame() {
        //Reset the number of won games for the two players
        this.players[0].score.game = 0;
        this.players[1].score.game = 0;
    }

    public resetAdvantage() {
        //Reset the Advantage of both players
        this.players[0].advantage = 0;
        this.players[1].advantage = 0;
    }

    public displayScore() {
        let tab = [0, 15, 30, 40];
        /*let ad0 = (this.players[0].advantage > this.players[1].advantage);
        let none = (this.players[1].advantage == this.players[0].advantage);*/
        //if(none) {
            console.log(`${this.players[0].name} -> S:${this.players[0].score.set} - G:${this.players[0].score.game} - P:${tab[this.players[0].score.pointIndex]}`);
            console.log(`${this.players[1].name} -> S:${this.players[1].score.set} - G:${this.players[1].score.game} - P:${tab[this.players[1].score.pointIndex]}`);
        /*}
        else if (ad0)
        {
            console.log(`${this.players[0].name} -> S:${this.players[0].score.set} - G:${this.players[0].score.game} - P:${tab[this.players[0].score.pointIndex]} - AD`);
            console.log(`${this.players[1].name} -> S:${this.players[1].score.set} - G:${this.players[1].score.game} - P:${tab[this.players[1].score.pointIndex]}`);
        }
        else
        {
            console.log(`${this.players[0].name} -> S:${this.players[0].score.set} - G:${this.players[0].score.game} - P:${tab[this.players[0].score.pointIndex]}`);
            console.log(`${this.players[1].name} -> S:${this.players[1].score.set} - G:${this.players[1].score.game} - P:${tab[this.players[1].score.pointIndex]} - AD`);
        }*/
    }

    public displayBegin() {
        let tab = [0, 15, 30, 40];
        console.log('Game started with :');
        console.log(`${this.players[0].name} -> S:0 - G:${this.players[0].score.game} - P:${tab[this.players[0].score.pointIndex]}`);
        console.log(`${this.players[1].name} -> S:0 - G:${this.players[1].score.game} - P:${tab[this.players[1].score.pointIndex]}`);
    }

    public checkDeuce() {
        if(this.players[0].score.pointIndex === 3 && this.players[1].score.pointIndex === 3) {
            this.resetPointIndex();
            return true;
        }
        return false;
    }

    public serveForAdvantage() {
        const playerIndex = Math.round(Math.random()); //Returns 0 or 1
        this.players[playerIndex].advantage++;
        console.log(`${this.players[playerIndex].name} has the advantage.`);
    }

    public deuceWinner() {
        const playerIndex = Math.round(Math.random()); //Returns 0 or 1
        const otherIndex = Math.abs(playerIndex - 1);
        let advantageDif = Math.abs(this.players[playerIndex].advantage - this.players[otherIndex].advantage);

        console.log('There is a deuce!!');
        while(advantageDif < 2)
        {
            this.serveForAdvantage();
            advantageDif = Math.abs(this.players[playerIndex].advantage - this.players[otherIndex].advantage);
        }

        if(this.players[playerIndex].advantage < this.players[otherIndex].advantage)
        {
            this.players[otherIndex].score.game++;
            console.log(`${this.players[otherIndex].name} won the deuce.`);
        }
        else
        {
            this.players[playerIndex].score.game++;
            console.log(`${this.players[playerIndex].name} won the deuce.`);
        }
        this.checkWonSet();
        this.resetAdvantage();
    }
}