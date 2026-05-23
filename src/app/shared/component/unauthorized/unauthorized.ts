import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  // imports: [],
  standalone: false,
  templateUrl: './unauthorized.html',
  styleUrl: './unauthorized.css',
})
export class Unauthorized {

  constructor(private router: Router) { }
  goToSignin() {
    this.router.navigate(['/signin']);
  }

}
