import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private data:DataService) { }

  ngOnInit(): void {
  }

  //sets the username to the currentusers name
  Username = this.data.username;


  //sets the highscore to the currentsusers highest score
  highscore = this.data.highscore;

}
