import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let role = inject(AuthService).getRole();
  if (role == 'admin') return true;
  return false;
};
