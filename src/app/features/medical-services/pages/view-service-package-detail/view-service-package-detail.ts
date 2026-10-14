import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-service-package-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './view-service-package-detail.html',
  styleUrl: './view-service-package-detail.css',
})
export class ViewServicePackageDetail {
  @Input() patientDetails: any | null = null;
  public selectedServicePackageDtl: any = null;

  constructor() {}

  ngOnInit(): void {
    this.setSelectedPackage();
  }

  ngOnChanges(): void {
    this.setSelectedPackage();
  }

  private setSelectedPackage(): void {
    this.selectedServicePackageDtl = this.patientDetails?.servicepackage ?? null;
  }
}
