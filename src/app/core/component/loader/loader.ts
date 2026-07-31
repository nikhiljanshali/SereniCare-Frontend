import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class LoaderComponent {
  protected loader = inject(LoaderService);
}
