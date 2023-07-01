import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toast: ToastrService) {}

  LoginToastSuccess() {
    this.toast.success('Succesfully logged in');
  }

  LoginToastFail(err: any) {
    let error = err.error;
    if (error?.id == 'USER_NOT_FOUND') this.toast.error(error.message);
    else if (error?.id == 'INVALID_PASSWORD') this.toast.error(error.message);
    else this.toast.error('Something went wrong');
  }

  RegisterToastSuccess() {
    this.toast.success('Registered Succesfully!');
  }
  RegisterToastFail(err: any) {
    let error = err.error;
    if (error?.id == 'USER_EXIST') this.toast.warning(error.message);
    else this.toast.error('Something went wrong');
  }

  notLoggedIn() {
    this.toast.error('You are not Logged In');
  }

  signedOut() {
    this.toast.info('You are signed out');
  }

  tokenExpired() {
    this.toast.warning('token expired, Please login again');
  }

  errorLeaderboard() {
    this.toast.error('error fetching the leaderboard');
  }

  errorUserStat() {
    this.toast.error('error fetching user stats');
  }
}
