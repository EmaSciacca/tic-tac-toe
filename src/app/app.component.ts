import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Header string
  headerStr: string;
  // turn number (1-9)
  private turnNum: number;
  // current player
  private currPlayer: string;
  // grid view
  gridView: string[][];

  constructor() {
    this.currPlayer = "X";
    this.headerStr = this.currPlayer + " Turn";
    this.turnNum = 1;
    this.gridView = [[], [], []];
    this.initializeGridView();
  }

  playTurn(rowIndex: number, colIndex: number) {
    console.log("Player " + this.currPlayer + " played at (" + rowIndex + ", " + colIndex + ")");
  }

  restartGame() {
    console.log("restartGame invoked");
  }

  private initializeGridView() {
    this.gridView = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  }
}
