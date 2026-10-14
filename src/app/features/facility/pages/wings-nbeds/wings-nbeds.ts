import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-wings-nbeds',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wings-nbeds.html',
  styleUrl: './wings-nbeds.css',
})
export class WingsNBeds {

  constructor() {

  }
  
  ngOnInit(): void {

  }

}
