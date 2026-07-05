import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageOperation } from '../../core/services/storage-operation';

@Component({
  selector: 'app-layout',
  // imports: [],
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class LayoutComponent {


  constructor(
    private router: Router,
    private _storageOperation: StorageOperation
  ) {
  }


  ngOnInit(): void {
  }

}
