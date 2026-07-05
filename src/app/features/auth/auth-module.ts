import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core-module';
import { AuthRoutingModule } from './auth-routing-module';
import { AuthLayout } from './auth/auth-layout/auth-layout';


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
