import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  loggedin:boolean = false;

  username:string = "";

  highscore:number = 0;

  token:string = "";


  constructor() { }
}
