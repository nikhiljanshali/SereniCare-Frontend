import { Component, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: false,
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {

  public isMenuOpen: boolean = false;
  public isClinicItem: boolean = false;

  quotes: string[] = [
    "Wherever the art of medicine is loved, there is also a love of humanity.",
    "The good physician treats the disease; the great physician treats the patient.",
    "Healing is a matter of time, but it is sometimes also a matter of opportunity.",
    "To cure sometimes, to relieve often, to comfort always.",
    "Medicine is not only a science; it is also an art."
  ];
  currentQuote: string = '';
  public preRequiredDetails = [
    { id: 1, label: 'Clinic Type', action: 'clinicType' },
    { id: 2, label: 'Speciality', action: 'speciality' },
    { id: 3, label: 'Role', action: 'role' },
    { id: 4, label: 'Blood Group', action: 'bloodGroup' },
    { id: 5, label: 'Primary Condition', action: 'primaryCondition' },
    { id: 6, label: 'Diseases', action: 'diseases' },
    { id: 7, label: 'Allergies', action: 'allergies' },
    { id: 8, label: 'Surgery', action: 'surgery' },
    { id: 9, label: 'Department', action: 'department' },
    // { id: 10, label: 'Facility', action: 'facility' },
  ];

  constructor(
    public router: Router,
    private elementRef: ElementRef,
    public activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
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

  // Toggle Account menu and ensure Master menu closes
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isClinicItem = false;
    }
  }

  // Toggle Master menu and ensure Account menu closes
  toggleMasterMenu(): void {
    this.isClinicItem = !this.isClinicItem;
    if (this.isClinicItem) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isMenuOpen = false;
      this.isClinicItem = false;
    }
  }

  navigateTo(route: string) {
    this.isMenuOpen = false;
    this.router.navigate(['/auth', route]);
  }

  onAction(action: string): void {
    const routeMap: Record<string, string> = {
      clinicType: '/clinic/clinictype',
      speciality: '/clinic/speciality',
      role: '/clinic/role',
      bloodGroup: '/clinic/bloodgroup',
      primaryCondition: '/clinic/primarycondition',
      allergies: '/clinic/allergies',
      diseases: '/clinic/diseases',
      surgery: '/clinic/surgeries',
      risk: '/clinic/riskes',
      department: '/clinic/department',
      facility: '/clinic/facility'
    };
    const route = routeMap[action];
    if (route) {
      this.router.navigate([route]);
    }
  }
}
