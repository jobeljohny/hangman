import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Login } from 'src/app/enums/config';
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

  get Login() {
    return Login;
  }
  constructor(
    private fb: FormBuilder,
    private validator: CustomValidationService,
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
      }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.registerSubmitted = true;
    if (this.registerForm.valid) {
      alert(
        'Form Submitted succesfully!!!\n Check the values in browser console.'
      );
      console.table(this.registerForm.value);
    }
  }
}
