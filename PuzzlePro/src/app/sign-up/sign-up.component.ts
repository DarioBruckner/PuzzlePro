import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
  NgForm,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DataService } from '../data.service';
import {Router} from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    return invalidCtrl || invalidParent;
  }
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  mystorage = localStorage;


  myForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  hideone = true;
  hidetwo = true;
  isLoading = false;
  token = "";
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private data: DataService, private router:Router) {
    this.myForm = this.formBuilder.group(
      {
        usern: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validator: this.checkPasswords}
    );
  }
  httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

  ngOnInit(): void {
  }


  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  signUp(group: FormGroup){
   

    this.http.post<{message: string, auttoken: string}>("http://localhost:3000/signup", group.value, this.httpOptions)
      .subscribe({
        next: (repsonseData) => {
          console.log(repsonseData['message']);
          console.log(repsonseData['auttoken']);
          this.data.loggedin = true;
          this.data.username = group.controls.usern.value;
          this.data.token = repsonseData["auttoken"];
          this.router.navigate(['/']);

        },
        error: (err) =>{
          console.log(err.message);
        },
      });

  }

}
