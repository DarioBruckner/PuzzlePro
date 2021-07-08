import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export interface IUser {
  usern: string;
  token: string;
  highscore: number;
};

@Injectable({
  providedIn: 'root'
})

export class DataService {
  //saves if the user is currently logged in
  loggedin:boolean = false;

  //username of current user
  username:string = "";

  //highscore of current user
  highscore:number = 0;

  //the auttoken needed for communication with the backend
  token:string = "";
  
 

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

  //if a user completes a puzzle and the score is higher than the current highscore, it gets set in the db
  setHighscore(score:number) {
    this.highscore = score;
    let data: IUser = {
      usern: this.username,
      token: this.token,
      highscore: this.highscore,
    };
    this.http.post<{message: string, auttoken: string}>("http://localhost:3000/highscore", data, this.httpOptions)
      .subscribe({
        next: (repsonseData) => {
          
        },
        error: (err) =>{
          console.log(err.message);
        },
      });
  }
}
