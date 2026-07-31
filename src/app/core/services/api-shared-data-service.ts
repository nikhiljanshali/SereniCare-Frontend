import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiSharedDataService {
  private patientSubject = new BehaviorSubject<any>(null);

  patient$ = this.patientSubject.asObservable();

  setPatient(data: any) {
    this.patientSubject.next(data);
  }
}
