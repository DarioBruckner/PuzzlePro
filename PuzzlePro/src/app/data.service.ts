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

  loggedin:boolean = false;

  username:string = "";

  highscore:number = 0;

  token:string = "";
  
 

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

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
