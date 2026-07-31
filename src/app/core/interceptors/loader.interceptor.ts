// core/interceptors/loader.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { SKIP_LOADER, LOADER_KEY } from '../tokens/loader.tokens';
import { LoaderService } from '../services/loader';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
    const loader = inject(LoaderService);

    if (req.context.get(SKIP_LOADER)) {
        return next(req);
    }

    const key = req.context.get(LOADER_KEY);
    loader.show(key);

    return next(req).pipe(finalize(() => loader.hide(key)));
};