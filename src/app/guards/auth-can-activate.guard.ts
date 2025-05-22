import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service.service';

export const authCanActivateGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const isLoggedIn = await authService.isLoggedIn();
  
  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  
  return true;
};
