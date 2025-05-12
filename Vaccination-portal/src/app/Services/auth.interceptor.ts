import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = localStorage.getItem('auth');
  console.log('Authorization header:', auth);  // Debugging line
  if (auth) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Basic ${auth}`)
    });
    return next(cloned);
  }
  return next(req);
};
