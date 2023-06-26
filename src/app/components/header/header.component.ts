import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Login } from 'src/app/enums/config';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private toast: ToasterService
  ) {
    //TODO remove
    setTimeout(() => this.loginSignup(Login.SIGNUP), 100);
  }

  get Login() {
    return Login;
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  loginSignup(loginType: Login) {
    console.log(loginType);
    const dialogRef = this.dialog.open(LoginSignupComponent, {
      height: '600px',
      width: '450px',
      data: loginType,
    });
  }

  signOut() {
    this.auth.signOut();
    this.toast.signedOut();
  }
}
