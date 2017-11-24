import {Score} from "./score";

export class Player
{
    name: string;
    advantage: number;
    score: Score;

    constructor(name: string) {
        this.name = name;
        this.advantage = 0;
        this.score = new Score();
    }
}