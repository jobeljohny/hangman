import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Login } from 'src/app/enums/config';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username: string = '';
  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private toast: ToasterService,
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.userStore.getUserName().subscribe((val) => {
      let uname = this.auth.getUsername();
      this.username = val || uname;
    });
  }

  get Login() {
    return Login;
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  loginSignup(loginType: Login) {
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
