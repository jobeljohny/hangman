import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Login } from 'src/app/enums/config';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidationService } from 'src/app/services/custom-validation.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
  page: Login = Login.LOGIN;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  registerSubmitted: boolean = false;
  loginSubmitted: boolean = false;

  get Login() {
    return Login;
  }
  constructor(
    private fb: FormBuilder,
    private validator: CustomValidationService,
    private auth: AuthService,
    private dialogRef: MatDialogRef<LoginSignupComponent>,
    @Inject(MAT_DIALOG_DATA) data: Login
  ) {
    this.page = data;
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: [
          '',
          [Validators.required, Validators.minLength(4)],
          this.validator.userNameValidator.bind(this.validator),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.validator.patternValidator(),
          ]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.validator.MatchPassword('password', 'confirmPassword'),
      } as AbstractControlOptions
    );

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onRegisterSubmit() {
    this.registerSubmitted = true;
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.registerForm.reset();
          this.page = Login.LOGIN;
        },
        error: (err) => {
          console.log(err);

          alert(err?.error.message);
        },
      });
    }
  }
  onLoginSubmit() {
    this.loginSubmitted = true;
    if (this.loginForm.valid) {
      console.log('valid');
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    }
  }
}
