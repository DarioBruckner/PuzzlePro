import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-puzzle',
  templateUrl: './choose-puzzle.component.html',
  styleUrls: ['./choose-puzzle.component.css']
})
export class ChoosePuzzleComponent implements OnInit {

  @Output() choiseEvent = new EventEmitter<number>();
  choise: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.choiseEvent.emit(0);
  }
  puzzle_1(){
    this.choise = 1;
    this.choiseEvent.emit(1);
  } 
  puzzle_2() {
    this.choise = 2;
    this.choiseEvent.emit(2);
  }

}
