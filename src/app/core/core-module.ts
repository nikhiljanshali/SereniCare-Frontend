import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Authentication } from './services/authentication';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [Authentication],
})
export class CoreModule { }
