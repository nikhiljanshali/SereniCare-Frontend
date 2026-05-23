import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StorageOperation } from './core/services/storage-operation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  constructor(
    private router: Router,
    private _storageOperation: StorageOperation
  ) {

  }

}
