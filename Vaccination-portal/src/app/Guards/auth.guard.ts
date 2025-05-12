import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('username');
  if (!isLoggedIn) {
    const router = inject(Router);
    router.navigate(['/auth']);
    return false;
  }
  return true;
};
