import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Sidebar {
  isOpen = signal<boolean>(false);
  title = signal<string>('');
  content = signal<string>('');
  details = signal<any>(null);

  open(title: string, content: string, details?: any) {
    this.title.set(title);
    this.content.set(content);
    if (details) {
      this.details.set(details);
    }
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}
