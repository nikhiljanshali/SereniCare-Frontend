import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

type MasterAction =
  | 'clinicType'
  | 'speciality'
  | 'role'
  | 'bloodGroup'
  | 'primaryCondition'
  | 'allergies'
  | 'diseases'
  | 'surgery';

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
  preRequiredDetails = [
    { id: 1, label: 'Clinic Type', action: 'clinicType' },
    { id: 2, label: 'Speciality', action: 'speciality' },
    { id: 3, label: 'Role', action: 'role' },
    { id: 4, label: 'Blood Group', action: 'bloodGroup' },
    { id: 5, label: 'Primary Condition', action: 'primaryCondition' },
    { id: 6, label: 'Diseases', action: 'diseases' },
    { id: 7, label: 'Allergies', action: 'allergies' },
    { id: 8, label: 'Surgery', action: 'surgery' },
  ];
  activeAction = ''; // default active

  constructor(
    public router: Router
  ) { }


  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
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

  onAction(action: string): void {
    this.activeAction = action;

    const routeMap: Record<string, string> = {
      clinicType: '/clinic/clinictype',
      speciality: '/clinic/speciality',
      role: '/clinic/role',
      bloodGroup: '/clinic/bloodgroup',
      primaryCondition: '/clinic/primarycondition',
      allergies: '/clinic/allergies',
      diseases: '/clinic/diseases',
      surgery: '/clinic/surgeries'
    };

    const route = routeMap[action];

    if (route) {
      this.router.navigate([route]);
    }
  }
}
