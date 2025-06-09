import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service.service';
import { take, map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

export const authCanActivateGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await firstValueFrom(
    authService.authState$.pipe(
      take(1),
      map(u => u ?? null)
    )
  );

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
