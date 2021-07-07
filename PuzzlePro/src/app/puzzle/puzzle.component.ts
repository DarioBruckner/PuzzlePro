import { Component, Input, OnInit } from '@angular/core';


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
  game: any;

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 9; i++) {
      this.puzzle[i] = i + 1;
    }
    this.shufflePuzzleParts()
    console.log(this.puzzle);
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
    if (this.part_1 == 0) {
      this.part_1 = part;
    } else {
      this.part_2 = part;
      let index_1: number = this.puzzle.findIndex(x => x == this.part_1);
      let index_2: number = this.puzzle.findIndex(x => x == this.part_2);
      let temp: any = this.puzzle[index_2];
      this.puzzle[index_2] = this.puzzle[index_1];
      this.puzzle[index_1] = temp;
      this.part_1 = 0;
      this.part_2 = 0;
      if (this.checkPuzzle()) {
        this.ps = true;
        console.log(this.ps);
      }
      
    }
  }
}
