import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Login } from 'src/app/enums/config';
import { LoginSignupComponent } from '../login-signup/login-signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  get Login() {
    return Login;
  }
  loginSignup(loginType: Login) {
    console.log(loginType);
    const dialogRef = this.dialog.open(LoginSignupComponent, {
      height: '600px',
      width: '1000px',
      data: { type: loginType },
    });
  }
}
