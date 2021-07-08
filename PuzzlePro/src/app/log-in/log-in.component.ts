import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
  NgForm,
  FormBuilder,
} from '@angular/forms';

import {Router} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  hideone = true;
  hidetwo = true;
  isLoading = false;

  
  token = "";
  myForm: FormGroup;
  myStroage = localStorage;



  constructor(private formBuilder: FormBuilder, private http: HttpClient, private Data: DataService, private router:Router) {
  
    this.myForm = this.formBuilder.group(
      {
        usern: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
       
      },
      
    );
    
  }

  httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };



  ngOnInit(): void {}


 
  setLoggedin(state:boolean):void{
    this.Data.loggedin = state;
  }

  getEmailErrorMessage() {
    if (this.myForm.controls['usern'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.myForm.controls['usern'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

 

  login() {
    this.http.post<{message: string, auttoken: string, highscore: number}>("http://localhost:3000/login", this.myForm.value, this.httpOptions)
      .subscribe({
        next: (repsonseData) => {
          console.log(repsonseData['message']);
          this.token = repsonseData['auttoken'];
          this.Data.token = this.token;
          this.Data.username = this.myForm.controls["usern"].value;
          this.Data.highscore = repsonseData['highscore'];
          console.log(this.Data.highscore);
          this.setLoggedin(true);
          this.router.navigate(['/']);
        },
        error: (err) =>{
          console.log(err.message);
        },
      });
  }
  

}
