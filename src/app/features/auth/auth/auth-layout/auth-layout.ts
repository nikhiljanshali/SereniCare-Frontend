import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: false,
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {

  quotes: string[] = [
    "Wherever the art of medicine is loved, there is also a love of humanity.",
    "The good physician treats the disease; the great physician treats the patient.",
    "Healing is a matter of time, but it is sometimes also a matter of opportunity.",
    "To cure sometimes, to relieve often, to comfort always.",
    "Medicine is not only a science; it is also an art."
  ];
  currentQuote: string = '';

  constructor(
    public router: Router,
    public activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.currentQuote = this.quotes[0]; // fallback

    setTimeout(() => {
      const index = Math.floor(Math.random() * this.quotes.length);
      this.currentQuote = this.quotes[index];
    }, 0);
  }

  setRandomQuote() {
    const index = Math.floor(Math.random() * this.quotes.length);
    this.currentQuote = this.quotes[index];
  }
}
