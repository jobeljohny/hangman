import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
  let status = inject(AuthService).isLoggedIn();
  if (!status) {
    inject(ToasterService).notLoggedIn();
  }
  return status;
};
