import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MeshTable } from '../services/mesh-table';
import { StorageOperation } from '../services/storage-operation';
import { Roles } from '../enum/common.enum';

export const roleGuard: CanActivateFn = (route, state) => {
  const meshTableService = inject(MeshTable);
  const storageOperation = inject(StorageOperation);
  const router = inject(Router);
  // ✅ Use enum type instead of string[]
  const expectedRoles = route.data?.['roles'] as Roles[];
  // ✅ Get user from localStorage
  const user: { id: string; name: string; email: string } | null = storageOperation.get('user', 'local');
  // ❌ If no user → redirect
  if (!user || !user.id) {
    router.navigate(['/signin']);
    return false;
  }
  const userId = user.id;
  // ✅ Call API with userId
  return meshTableService.getRoleByUserId(userId).pipe(map((res: any) => {
    const userRole = res?.role;
    if (expectedRoles?.includes(userRole)) {
      return true;
    } else {
      router.navigate(['/auth/unauthorized']);
      return false;
    }
  }), catchError((err) => {
    // console.error('Role guard error:', err);
    router.navigate(['/signin']);
    return of(false);
  }));
};
