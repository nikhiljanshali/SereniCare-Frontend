import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { FocusTrapDirective } from 'ngx-bootstrap/focus-trap';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RightSidebar } from '../../shared/component/right-sidebar/right-sidebar';
import { NurseLayout } from './nurse-layout/nurse-layout';
import { NurseRegistration } from './pages/nurse-registration/nurse-registration';
import { NurseList } from './pages/nurse-list/nurse-list';


@NgModule({
  declarations: [
    NurseLayout,
    NurseRegistration,
    NurseList
  ],
  imports: [
    CommonModule,
    NurseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FocusTrapDirective,
    RightSidebar,
    DayPilotModule,
    PopoverModule
  ]
})
export class NurseModule { }
