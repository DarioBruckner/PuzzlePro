import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-puzzle',
  templateUrl: './choose-puzzle.component.html',
  styleUrls: ['./choose-puzzle.component.css']
})
export class ChoosePuzzleComponent implements OnInit {

  
  choise: number = 0;
  constructor() { }

  ngOnInit(): void {
  }
  puzzle_1(){
    this.choise = 1;
  } 
  puzzle_2() {
    this.choise = 2;
  }

}
