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

];

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {

  displayedColumns: string[] = ['position', 'username', 'highscore'];
  dataSource = ELEMENT_DATA;

  data = {};
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

  ngOnInit(): void {
    this.getData();
  }
  //the table
  @ViewChild(MatTable) table!: MatTable<Highscores>;

  //gets data for the top 10 highscores and displays them in the mat-table
  getData(){

    let len:number = this.dataSource.length;

    for(var i = 0; i< len; i++){
      this.dataSource.pop();
    }

    this.http.get<{message: any}>("http://localhost:3000/tophighscores" , this.httpOptions)
      .subscribe({
        next: (repsonseData) => {
          this.data = repsonseData;

          let temp = JSON.stringify(this.data);
          let temp2 = JSON.parse(temp);
          for(var element in repsonseData){
            
            let newHighscore = {position: temp2[element]["position"], username: temp2[element]["username"], highscore: temp2[element]["highscore"]};
            this.dataSource.push(newHighscore);
          }
          this.table.renderRows();
        },
        error: (err) =>{
          console.log(err.message);
        },
      });
  }


}
