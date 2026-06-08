import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IClinicList, IClinics, ISupplierDetails } from '../../../../core/interface/basic.interface';
import { Clinics } from '../../../../core/services/clinics';
import { LocationService } from '../../../../core/services/location-service';
import { SupplierService } from '../../../../core/services/supplier-service';

@Component({
  selector: 'app-supplier-list',
  standalone: false,
  // imports: [],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css',
})
export class SupplierList {
  public supplierList: ISupplierDetails[] = [];

  constructor(
    private _supplierService: SupplierService,
    public _locationService: LocationService
  ) {
  }

  ngOnInit(): void {
    this.getClinics();
  }

  private getClinics(): void {
    this._supplierService.getAllSuppliers().subscribe((res: any) => {
      if (res.success) {
        this.supplierList = res.data;
      }
    });
  }

}
