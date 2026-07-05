import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicLayout } from './clinic-layout/clinic-layout';
import { ClinicRoutingModule } from './clinic-routing-module';

@NgModule({
  declarations: [ClinicLayout],
  imports: [
    CommonModule,
    ClinicRoutingModule
  ]
})
export class ClinicModule { }
