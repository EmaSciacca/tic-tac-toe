import { Component } from '@angular/core';
import { Coordinate } from './models/coordinate';

// x1,y1-x2,y2-x3,y3
const WINNING_COMBINATIONS = [
  "0,0-0,1-0,2",
  "1,0-1,1-1,2",
  "2,0-2,1-2,2",
  "0,0-1,0-2,0",
  "0,1-1,1-2,1",
  "0,2-1,2-2,2",
  "0,0-1,1-2,2",
  "0,2-1,1-2,0"
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // Header string
  headerStr: string;
  // grid view
  gridView: string[][];
  winner: string;
  // turn number (1-9)
  private turnNum: number;
  // current player
  private currPlayer: string;
  // remaining winnable combinations
  private winnableCombs: string[];

  constructor() {
    this.currPlayer = "X";
    this.headerStr = this.currPlayer + " Turn";
    this.turnNum = 1;
    this.gridView = [[], [], []];
    this.initializeGridView();
    // Copy by value
    this.winnableCombs = WINNING_COMBINATIONS.slice();
    this.winner = '';
  }

  playTurn(rowIndex: number, colIndex: number) {
    console.log("Player " + this.currPlayer + " played at (" + rowIndex + ", " + colIndex + ") at turn " + this.turnNum);
    this.gridView[rowIndex][colIndex] = this.currPlayer;
    const hasWinner = this.computeWinner(rowIndex, colIndex);
    if (hasWinner) {
      this.winner = this.currPlayer;
      this.headerStr = "Game Over";
      return;
    }

    this.turnNum++;
    if (this.turnNum === 10) {
      this.winner = "DRAW";
      this.headerStr = "Game Over";
      return;
    }

    this.currPlayer = this.currPlayer === "X" ? "O" : "X";
    this.headerStr = this.currPlayer + " Turn";
  }

  private computeWinner(rowIndex: number, colIndex: number): boolean {
    // no computations needed at first turn
    if (this.turnNum === 1)
      return false;

    // compute searchStr
    const searchStr = this.fromIndexesToStr(rowIndex, colIndex);
    // search every remaining combination with that point
    const remCombsStrList = this.winnableCombs.filter(comb => comb.includes(searchStr));
    for (let remCombStr of remCombsStrList) {
      // get coordinates list
      const coordsList = this.fromCombToIndexList(remCombStr, rowIndex, colIndex);
      
      let emptyFound = false;
      let toDelete = false;
      for (let coordObj of coordsList) {
        // check empty string
        if (this.gridView[coordObj.x][coordObj.y] === '') {
          emptyFound = true;
          break;
        }
        // check other player 
        if (this.gridView[coordObj.x][coordObj.y] !== this.currPlayer) {
          toDelete = true;
          break;
        }
      }

      if (!emptyFound && !toDelete) {
        // if every other cell in the combination was filled by same player we have a winner
        console.log("Player " + this.currPlayer + " winning with " + remCombStr);
        console.log(this.gridView);
        return true;
      }

      if (toDelete) {
        // delete current combination because not winnable
        console.log("Removing " + remCombStr);
        const remIndex = this.winnableCombs.indexOf(remCombStr);
        this.winnableCombs.splice(remIndex, 1);
        console.log("Remaining winnable combs: " + this.winnableCombs);
      }
    } 
    return false;
  }

  private fromIndexesToStr(row: number, col: number): string {
    return row + "," + col;
  }

  // returns coordinates to check as array
  fromCombToIndexList(comb: string, rowIndex: number, colIndex: number): Coordinate[] {
    let res = [];
    let pointStrArr = comb.split("-");
    for (let coordStr of pointStrArr) {
      const x = parseInt(coordStr[0]);
      const y = parseInt(coordStr[2]);
      if (x !== rowIndex || y !== colIndex) {
        res.push({x: x, y: y});
      }
    }
    return res;
  }

  restartGame() {
    console.log("restartGame invoked");
    this.turnNum = 1;
    this.currPlayer = "X";
    this.initializeGridView();
    this.winnableCombs = WINNING_COMBINATIONS.slice();
    this.winner = "";
    this.headerStr = this.currPlayer + " Turn";
  }

  private initializeGridView() {
    this.gridView = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  }
}
