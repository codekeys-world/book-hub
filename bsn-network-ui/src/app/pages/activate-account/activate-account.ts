import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { CodeInputModule } from 'angular-code-input';

@Component({
  selector: 'app-activate-account',
  imports: [
    CodeInputModule
  ],
  templateUrl: './activate-account.html',
  styleUrl: './activate-account.scss',
})
export class ActivateAccount {
  message = signal<string>('');
  isOkay = signal<boolean>(true);
  submitted = signal<boolean>(false);

  constructor(private router : Router, private authenticationService : AuthenticationService) {


  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  redirectToLogin() {
    void this.router.navigate(['login']);
  }

  private confirmAccount(token: string) {

    this.authenticationService.confirm({
      token: token
    }).subscribe({
      next: (response)=> {
        this.message.set("You have successfully activated.\nNow you can proceed to login");
        this.submitted.set(true);
        this.isOkay.set(true);
      },
      error: (err)=> {
        this.message.set("Token has been expired or invalid");
        this.submitted.set(true);
        this.isOkay.set(false);
      }
    })
  }
}
