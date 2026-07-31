import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiStateService {
  // Store API response
  private apiDataSignal = signal<any>(null);

  // Readonly signal for other components
  apiData = this.apiDataSignal.asReadonly();

  // Update data
  setApiData(data: any) {
    this.apiDataSignal.set(data);
  }

  // Clear data
  clear() {
    this.apiDataSignal.set(null);
  }
}
