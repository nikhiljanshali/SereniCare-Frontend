import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalServicesRoutingModule } from './medical-services-routing-module';
import { MedicalServicesLayout } from './medical-services-layout/medical-services-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { FocusTrapDirective } from 'ngx-bootstrap/focus-trap';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RightSidebar } from '../../shared/component/right-sidebar/right-sidebar';
import { MedicalServiceDashboard } from './pages/medical-service-dashboard/medical-service-dashboard';
import { MedicalServiceMaster } from './pages/medical-service-master/medical-service-master';
import { AddMedicalService } from './pages/add-medical-service/add-medical-service';
import { InsuranceTariffsMaster } from './pages/insurance-tariffs-master/insurance-tariffs-master';
import { AddTpaOverrideRate } from './pages/add-tpa-override-rate/add-tpa-override-rate';
import { ServicesPackageMaster } from './pages/services-package-master/services-package-master';
import { AddPackages } from './pages/add-packages/add-packages';
import { ViewServiceDetail } from './pages/view-service-detail/view-service-detail';


@NgModule({
  declarations: [
    MedicalServicesLayout,
    MedicalServiceDashboard,
    MedicalServiceMaster,
    AddMedicalService,
    InsuranceTariffsMaster,
    AddTpaOverrideRate,
    ServicesPackageMaster,
    AddPackages
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MedicalServicesRoutingModule,
    FocusTrapDirective,
    RightSidebar,
    DayPilotModule,
    PopoverModule
  ]
})
export class MedicalServicesModule { }
