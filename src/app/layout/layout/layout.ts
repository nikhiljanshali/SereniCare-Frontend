import { Component } from '@angular/core';
import { StorageOperation } from '../../core/services/storage-operation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  // imports: [],
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {


  constructor(
    private router: Router,
    private _storageOperation: StorageOperation
  ) {
  }


  ngOnInit(): void {
  }

}
