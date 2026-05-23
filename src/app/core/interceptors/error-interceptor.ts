// interceptor/interceptors/error-interceptor.ts

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { NotificationServices } from '../services/notification-services';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const notificationService = inject(NotificationServices); // ✅ inject here

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Something went wrong';
      if (error.error?.message) {
        message = error.error.message;
      } else if (error.status) {
        message = `Error ${error.status}: ${error.error?.description || error.statusText}`;
      }
      // console.error('Global API Error:', message);
      // ✅ Show notification
      notificationService.toast(message, 'error'); // ✅ Show notification(message);

      return throwError(() => message);
    })
  );
};
