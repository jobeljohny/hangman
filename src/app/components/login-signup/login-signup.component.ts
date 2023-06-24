import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  constructor(
    private dialogRef: MatDialogRef<LoginSignupComponent>,
    @Inject(MAT_DIALOG_DATA) data: Login
  ) {
    this.page = data;
  }
}
