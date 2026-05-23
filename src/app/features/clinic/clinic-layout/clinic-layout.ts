import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-clinic-layout',
  standalone: false,
  templateUrl: './clinic-layout.html',
  styleUrl: './clinic-layout.css',
})
export class ClinicLayout {

  quotes: string[] = [
    "Wherever the art of medicine is loved, there is also a love of humanity.",
    "The good physician treats the disease; the great physician treats the patient.",
    "Healing is a matter of time, but it is sometimes also a matter of opportunity.",
    "To cure sometimes, to relieve often, to comfort always.",
    "Medicine is not only a science; it is also an art."
  ];
  currentQuote: string = '';
  buttons = [
    { label: 'Clinic Type', action: 'clinicType' },
    { label: 'Speciality', action: 'speciality' },
    { label: 'Role', action: 'role' },
    { label: 'Blood Group', action: 'bloodGroup' },
    { label: 'Primary Condition', action: 'primaryCondition' },
    { label: 'Allergies', action: 'allergies' },
  ];
  activeAction = ''; // default active

  constructor(
    public router: Router
  ) { }


  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      console.log('Current URL:', event.url);
      if (event.url == '/clinic/registration') {
        this.activeAction = '';
      }
    });

    this.currentQuote = this.quotes[0]; // fallback

    setTimeout(() => {
      const index = Math.floor(Math.random() * this.quotes.length);
      this.currentQuote = this.quotes[index];
    }, 0);
  }

  setRandomQuote() {
    const index = Math.floor(Math.random() * this.quotes.length);
    this.currentQuote = this.quotes[index];
  }

  onAction(action: string) {
    this.activeAction = action;
    if (action == 'clinicType') {
      this.router.navigate(['/clinic/clinictype']);
    } else if (action == 'speciality') {
      this.router.navigate(['/clinic/speciality']);
    } else if (action == 'role') {
      this.router.navigate(['/clinic/role']);
    } else if (action == 'bloodGroup') {
      this.router.navigate(['/clinic/bloodgroup']);
    } else if (action == 'primaryCondition') {
      this.router.navigate(['/clinic/primarycondition']);
    } else if (action == 'allergies') {
      this.router.navigate(['/clinic/allergies']);
    }
  }
}
