import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicRoutingModule } from './clinic-routing-module';
import { ClinicLayout } from './clinic-layout/clinic-layout';


@NgModule({
  declarations: [ClinicLayout],
  imports: [
    CommonModule,
    ClinicRoutingModule
  ]
})
export class ClinicModule { }
