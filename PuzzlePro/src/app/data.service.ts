import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  loggedin:boolean = false;

  constructor() { }
}
