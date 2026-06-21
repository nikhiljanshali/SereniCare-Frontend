import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicLayout } from './clinic-layout/clinic-layout';
import { Registration } from './page/registration/registration';
import { ClinicType } from './page/clinic-type/clinic-type';
import { PrimarySpeciality } from './page/primary-speciality/primary-speciality';
import { Role } from './page/role/role';
import { BloodGroup } from './page/blood-group/blood-group';
import { PrimaryCondition } from './page/primary-condition/primary-condition';
import { Allergies } from './page/allergies/allergies';
import { Diseases } from './page/diseases/diseases';
import { Surgery } from './page/surgery/surgery';

const routes: Routes = [
  {
    path: '',
    component: ClinicLayout,
    children: [
      { path: '', redirectTo: 'registration', pathMatch: 'full' },
      { path: 'registration', component: Registration },
      { path: 'clinictype', component: ClinicType },
      { path: 'speciality', component: PrimarySpeciality },
      { path: 'role', component: Role },
      { path: 'bloodgroup', component: BloodGroup },
      { path: 'primarycondition', component: PrimaryCondition },
      { path: 'allergies', component: Allergies },
      { path: 'diseases', component: Diseases },
      { path: 'surgeries', component: Surgery },
      { path: '**', redirectTo: 'registration' }
    ]
  },
  // ✅ fallback
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
