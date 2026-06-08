import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medicine-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medicine-details.html',
  styleUrl: './medicine-details.css',
})
export class MedicineDetails {

  @Input() medicineDetails: any;

}
