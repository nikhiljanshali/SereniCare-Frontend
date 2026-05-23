import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageKey = environment.storageKeys.token
  const token = sessionStorage.getItem(storageKey)?.replace(/^"|"$/g, '') || localStorage.getItem('token')?.replace(/^"|"$/g, '');
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(clonedReq);
  }

  return next(req);
};
