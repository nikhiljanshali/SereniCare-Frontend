import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { AuthLayout } from './auth/auth-layout/auth-layout';
import { CoreModule } from '../../core/core-module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AuthLayout],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
