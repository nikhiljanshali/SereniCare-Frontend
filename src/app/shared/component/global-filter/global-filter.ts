import { Component, EventEmitter } from '@angular/core';
import { ModalService } from '../../../core/services/modal-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filterByFields } from '../../methods/filter.method';

@Component({
  selector: 'app-global-filter',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './global-filter.html',
  styleUrl: './global-filter.css',
})
export class GlobalFilter {
  public filterDetails: any | null = null;
  public filterColumns: any | null = null;
  public returnResult = new EventEmitter<any>()
  public searchForm!: FormGroup;
  constructor(
    public _modalService: ModalService,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    console.log(this.filterDetails);
    console.log(this.filterColumns);
    this.searchForm = this.fb.group({
      searchText: ['']
    });
  }

  public closeModePopup(): void {
    this.returnResult.emit(false);
    this._modalService.closeComponentModal();
  }

  public search(): void {
    const result = filterByFields(this.filterDetails, this.searchForm.get('searchText')?.value, this.filterColumns);
    this.returnResult.emit(result);
    this._modalService.closeComponentModal();
  }

}
