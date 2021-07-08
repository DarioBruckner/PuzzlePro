import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  @Input() puzzleType: number = 0;
  puzzle: Array<number> = new Array;
  part_1: number = 0;
  part_2: number = 0;
  ps: boolean = false;
  time: number = 0;
  interval: any;
  score: number = -1;
  highscore: boolean = false;

  constructor(private dataService: DataService) { }
  //fills puzzle array and shuffles it
  ngOnInit(): void {
    for (let i = 0; i < 9; i++) {
      this.puzzle[i] = i + 1;
    }
    this.shufflePuzzleParts()
  }
  shufflePuzzleParts() {
    let counter = this.puzzle.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = this.puzzle[counter];
      this.puzzle[counter] = this.puzzle[index];
      this.puzzle[index] = temp;
    }
  };
  //starts timer
  startTimer() {
    this.interval = setInterval(() => {
      this.time += .01;
    }, 10)
  }
  //checks if puzzle is solved
  checkPuzzle() {
    let counter: number = 0;
    for (let i = 0; i < 9; i++) {
      if (this.puzzle[i] == (i + 1)) {
        counter++;
      }
    }
    if (counter == 9) {
      return true;
    } else {
      return false;
    }
  };
  swapPieces(part: number) {
    //starts timer when first puzzlepiece is selected
    if (this.time == 0) {
      this.startTimer();
    }
    //makes shure that puzzlepieces can not be moved after it is finished
    if (!this.ps) {
      //checks if first or second part are selected
      if (this.part_1 == 0) {
        this.part_1 = part;
      } else {
        this.part_2 = part;
        //swaps selected puzzlepieces 
        let index_1: number = this.puzzle.findIndex(x => x == this.part_1);
        let index_2: number = this.puzzle.findIndex(x => x == this.part_2);
        let temp: any = this.puzzle[index_2];
        this.puzzle[index_2] = this.puzzle[index_1];
        this.puzzle[index_1] = temp;
        //deselects puzzlepieces
        this.part_1 = 0;
        this.part_2 = 0;
        //checks if puzzle is solved
        if (this.checkPuzzle()) {
          this.ps = true;
          clearInterval(this.interval);
          //checks if user is logged in calculates a score and compares it to the current highscore of a logged in user
          if (this.dataService.loggedin) {
            this.score = Math.round(100 - this.time);
            if (this.score > this.dataService.highscore) {
              this.highscore = true;
              this.dataService.setHighscore(this.score);
            }
          }
        }

      }
    }
  }
}
