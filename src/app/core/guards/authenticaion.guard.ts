import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageOperation } from '../services/storage-operation';

export const authenticaionGuard: CanActivateFn = (route, state) => {
  const storageOperation = inject(StorageOperation);
  const router = inject(Router);

  const token = storageOperation.get<string>('token', 'session');

  if (token) {
    return true;
  }

  // If no token, redirect to signin
  router.navigate(['auth/signin']);
  return false;
};
