import { Injectable, signal, computed } from '@angular/core';
import { Observable, finalize } from 'rxjs';

export type LoaderKey = string;

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private globalCount = signal(0);
  private keyedCounts = signal<Map<LoaderKey, number>>(new Map());

  /** True whenever any global (unkeyed) request is in flight */
  readonly loading = computed(() => this.globalCount() > 0);

  show(key?: LoaderKey): void {
    key ? this.updateKeyed(key, 1) : this.globalCount.update(c => c + 1);
  }

  hide(key?: LoaderKey): void {
    key ? this.updateKeyed(key, -1) : this.globalCount.update(c => Math.max(0, c - 1));
  }

  isLoading(key: LoaderKey): boolean {
    return (this.keyedCounts().get(key) ?? 0) > 0;
  }

  /** Reactive signal for a specific key — bind directly in templates */
  loadingFor(key: LoaderKey) {
    return computed(() => (this.keyedCounts().get(key) ?? 0) > 0);
  }

  reset(key?: LoaderKey): void {
    if (key) {
      const map = new Map(this.keyedCounts());
      map.delete(key);
      this.keyedCounts.set(map);
    } else {
      this.globalCount.set(0);
      this.keyedCounts.set(new Map());
    }
  }

  /** Manual wrap for any Observable — for non-interceptor cases */
  wrap<T>(source$: Observable<T>, key?: LoaderKey): Observable<T> {
    this.show(key);
    return source$.pipe(finalize(() => this.hide(key)));
  }

  private updateKeyed(key: LoaderKey, delta: number): void {
    const map = new Map(this.keyedCounts());
    map.set(key, Math.max(0, (map.get(key) ?? 0) + delta));
    this.keyedCounts.set(map);
  }
}