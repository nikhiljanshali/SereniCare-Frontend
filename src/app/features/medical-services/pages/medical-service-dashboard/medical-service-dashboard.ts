import { Component } from '@angular/core';
import { MedicalServices } from '../../../../core/services/medical-services';
import { MedicalServicesDetails } from '../../../../core/interface/basic.interface';

@Component({
  selector: 'app-medical-service-dashboard',
  standalone: false,
  // imports: [],
  templateUrl: './medical-service-dashboard.html',
  styleUrl: './medical-service-dashboard.css',
})
export class MedicalServiceDashboard {

  public activeTab: string = 'servicesmaster';
  public tabs = [
    {
      id: 'servicesmaster',
      label: 'Services Master',
      icon: 'bi-bar-chart-line'
    },
    {
      id: 'insurancetariffs',
      label: 'Insurance Tariffs',
      icon: 'bi-shield-check'
    },
    {
      id: 'servicespackages',
      label: 'Services Packages',
      icon: 'bi-box-seam'
    },
  ];

  constructor(
    public _medicalServices: MedicalServices
  ) {

  }

  ngOnInit(): void {
  }

  public selectTab(tabId: string): void {
    this.activeTab = tabId;
  }
}
