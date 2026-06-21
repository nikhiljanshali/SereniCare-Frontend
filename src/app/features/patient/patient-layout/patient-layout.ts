import { Component } from '@angular/core';
import { slideInAnimation } from '../../../shared/methods/route-animation';
import { RouterOutlet } from '@angular/router';

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
