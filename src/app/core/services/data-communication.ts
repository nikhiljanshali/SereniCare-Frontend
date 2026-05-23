import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataCommunication {

  // holds true/false state
  private toggleStateSource = new BehaviorSubject<boolean>(false);

  // observable for subscribers
  toggleState$ = this.toggleStateSource.asObservable();

  // update method
  setToggleState(state: boolean) {
    this.toggleStateSource.next(state);
  }

  // optional: quick toggle helper
  toggle() {
    const current = this.toggleStateSource.value;
    this.toggleStateSource.next(!current);
  }
}
