import { Component } from '@angular/core';
import { ModalService } from '../../../core/services/modal-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standard-vital-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standard-vital-info.html',
  styleUrl: './standard-vital-info.css',
})
export class StandardVitalInfo {

  public activeTab: number = 0;
  public tabs = [
    {
      id: 0,
      title: 'Adult Vital Signs Reference Range'
    },
    {
      id: 1,
      title: 'Vital Status Indicators'
    }
  ];

  constructor(
    public _modalService: ModalService,
  ) {

  }


  public changeTab(index: number) {
    this.activeTab = index;
  }

  public closeModePopup(): void {
    this._modalService.closeComponentModal();
  }


}
