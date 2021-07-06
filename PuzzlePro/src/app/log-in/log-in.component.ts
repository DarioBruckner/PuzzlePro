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

  username = 'test@test.at';
  pw = 12345678;

  myForm: FormGroup;
  myStroage = localStorage;



  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  
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


 


  getEmailErrorMessage() {
    if (this.myForm.controls['usern'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.myForm.controls['usern'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

 

  login() {
    this.http.post<{message: string, auttoken: string}>("http://localhost:3000/login", this.myForm.value, this.httpOptions)
      .subscribe({
        next: (repsonseData) => {
          console.log(repsonseData['message']);
          this.token = repsonseData['auttoken'];
          localStorage.setItem("token", this.token);
          
         
        },
        error: (err) =>{
          console.log(err.message);
        },
      });
  }
  

}
