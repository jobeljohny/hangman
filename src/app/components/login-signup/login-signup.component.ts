import { Component } from '@angular/core';
import { Login } from 'src/app/enums/config';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent {
  page: Login = Login.LOGIN;
  get Login() {
    return Login;
  }
  constructor() {}
}
