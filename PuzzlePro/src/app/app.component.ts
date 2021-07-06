import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PuzzlePro';

  logged = false;

  constructor(private data:DataService){
    
  }

  getLoggedin():boolean{
    this.logged = this.data.loggedin;
    return this.logged;
  }
  
  logout():void{
    this.data.loggedin = false;
  }
}
