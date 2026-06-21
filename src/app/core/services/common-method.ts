import { FormGroup, FormArray } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonMethod {


  getExperience(startDate: string | Date): string {
    const start = new Date(startDate);
    const today = new Date();
    let years = today.getFullYear() - start.getFullYear();
    let months = today.getMonth() - start.getMonth();
    if (today.getDate() < start.getDate()) {
      months--;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return `${years} Year${years !== 1 ? 's' : ''} ${months} Month${months !== 1 ? 's' : ''}`;
  }

  formatDateMMDDYYYY(dateString: string): string {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  formatDateForInput(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }


  logInvalidControls(form: FormGroup | FormArray, parent = '') {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      const path = parent ? `${parent}.${key}` : key;

      if (control?.invalid) {
        console.log(`${path} is invalid`, control.errors);
      }

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.logInvalidControls(control, path);
      }
    });
  }

}
