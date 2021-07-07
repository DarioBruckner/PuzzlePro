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


  Username = this.data.username;

  highscore = this.data.highscore;

}
