// core/tokens/loader.tokens.ts
import { HttpContextToken } from '@angular/common/http';

/** Set true to prevent a request from triggering the global loader */
export const SKIP_LOADER = new HttpContextToken<boolean>(() => false);

/** Assign a named loader key instead of the global overlay */
export const LOADER_KEY = new HttpContextToken<string | undefined>(() => undefined);