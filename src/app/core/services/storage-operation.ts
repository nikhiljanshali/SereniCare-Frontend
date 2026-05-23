import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

type StorageType = 'local' | 'session';

@Injectable({
  providedIn: 'root',
})
export class StorageOperation {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

  }

  private getStorage(type: StorageType): Storage | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return type === 'local' ? localStorage : sessionStorage;
  }

  // =========================
  // 🔹 SET
  // =========================
  set<T>(key: keyof typeof environment.storageKeys, value: T, type: StorageType = 'local'): void {
    const storage = this.getStorage(type);
    if (!storage) return;
    const finalKey = environment.storageKeys[key];

    storage.setItem(finalKey, JSON.stringify(value));
  }

  // =========================
  // 🔹 GET
  // =========================
  get<T>(key: keyof typeof environment.storageKeys, type: StorageType = 'local'): T | null {
    const storage = this.getStorage(type);
    if (!storage) return null;
    const finalKey = environment.storageKeys[key];

    const value = storage.getItem(finalKey);
    return value ? JSON.parse(value) : null;
  }

  // =========================
  // 🔹 REMOVE
  // =========================
  remove(key: keyof typeof environment.storageKeys, type: StorageType = 'local'): void {
    const storage = this.getStorage(type);
    if (!storage) return;
    storage.removeItem(environment.storageKeys[key]);
  }

  // =========================
  // 🔹 CLEAR
  // =========================
  clear(type: StorageType = 'local'): void {
    const storage = this.getStorage(type);
    if (!storage) return;
    storage.clear();
  }
}
