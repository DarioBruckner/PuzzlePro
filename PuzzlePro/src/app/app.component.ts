import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { DataService } from './data.service';

import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PuzzlePro';

  logged = false;
  choise: number = 0;
  constructor(private data:DataService, private http: HttpClient){
    
  }
  httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

  getLoggedin():boolean{
    this.logged = this.data.loggedin;
    return this.logged;
  }
  
  logout():void{
    
    var payload = {'token': this.data.token};
    this.http.post<{message:string}>("http://localhost:3000/logout", payload, this.httpOptions)
      .subscribe({
        next:(responseData) =>{
        
          this.data.loggedin = false;
        },
        error: (err) =>{
          console.log(err.message);
        },
      });


  }

  
}
