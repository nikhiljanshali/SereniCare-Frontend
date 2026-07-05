import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared-module';
import { LayoutRoutingModule } from './layout-routing-module';
import { LayoutComponent } from './layout/layout';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    ModalModule.forRoot()
  ]
})
export class LayoutModule { }
