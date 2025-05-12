import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('username');
  if (isLoggedIn) {
    const router = inject(Router);
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
