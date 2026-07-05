import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../../../shared/methods/route-animation';

@Component({
  selector: 'app-patient-layout',
  standalone: false,
  templateUrl: './patient-layout.html',
  styleUrl: './patient-layout.css',
  animations: [slideInAnimation]
})
export class PatientLayout {

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

}
