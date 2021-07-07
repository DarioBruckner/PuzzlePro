import { Component, OnInit , ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { DataService } from '../data.service';
import {MatTable} from '@angular/material/table';




export interface Highscores {
  position: number;
  username: string;
  highscore: number;
}

const ELEMENT_DATA: Highscores[] = [
  {position: 1, username: 'test@test.at', highscore: 100000},

];

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {

  displayedColumns: string[] = ['position', 'username', 'highscore'];
  dataSource = ELEMENT_DATA;

  
  constructor() {

   }

  ngOnInit(): void {
  }
  @ViewChild(MatTable) table!: MatTable<Highscores>;

  addData(){
    let newHighscore = {position: 2, username: "ttt", highscore:11000}

    this.dataSource.push(newHighscore);

    console.log(this.dataSource);
    
    this.table.renderRows();
  }
  

}
