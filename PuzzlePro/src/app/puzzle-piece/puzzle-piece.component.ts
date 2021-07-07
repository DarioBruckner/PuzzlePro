import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-puzzle-piece',
  templateUrl: './puzzle-piece.component.html',
  styleUrls: ['./puzzle-piece.component.css']
})
export class PuzzlePieceComponent implements OnInit {

  @Input() puzzleType: number = 0;
  @Input() pieceNumber: number = 0;
  @Input() part_1: number = 0;
  @Input() part_2: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
