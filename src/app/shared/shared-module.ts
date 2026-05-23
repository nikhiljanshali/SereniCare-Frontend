import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from './component/header/header';
import { Sidebar } from './component/sidebar/sidebar';
import { Breadcrumb } from './component/breadcrumb/breadcrumb';
import { Unauthorized } from './component/unauthorized/unauthorized';

@NgModule({
  declarations: [
    Header,
    Sidebar,
    Breadcrumb,
    Unauthorized
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    Header,
    Sidebar,
    Breadcrumb,
    Unauthorized,
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
