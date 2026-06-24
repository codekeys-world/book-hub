import { Component, signal } from '@angular/core';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { Token } from '../../services/token/token';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authRequest : AuthenticationRequest = {email : '', password: ''};
  //errorMsg : Array<string> = [];

  errorMsg = signal<Array<string>>([]);

  constructor(private router : Router, private authenticationService: AuthenticationService, private tokenService : Token) {
  }

  login() {
    this.errorMsg.set([]);
    this.authenticationService.authenticate({
      body : this.authRequest
    }).subscribe({
      next : (response)=> {
        this.tokenService.token = response.token as string;
        void this.router.navigate(['books']);
      },
      error : (err)=> {
        console.log(err.error.validationErrors);
        if(err.error.validationErrors){
          this.errorMsg.set(err.error.validationErrors);
          console.log(this.errorMsg);
        }else{
          this.errorMsg.set([err.error.error])
        }
      }
    })
  }

  register() {
    void this.router.navigate(['register']);
  }
}
