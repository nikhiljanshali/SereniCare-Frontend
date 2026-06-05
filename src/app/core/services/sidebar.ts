import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Sidebar {
  isOpen = signal<boolean>(false);
  title = signal<string>('');
  content = signal<string>('');
  details = signal<any>(null);

  private closeSubject = new Subject<any>();

  close$ = this.closeSubject.asObservable();

  open(title: string, content: string, details?: any) {
    this.title.set(title);
    this.content.set(content);
    this.details.set(details ?? null);
    this.isOpen.set(true);
  }

  close(result?: any) {
    this.isOpen.set(false);

    this.title.set('');
    this.content.set('');
    this.details.set(null);

    this.closeSubject.next(result);
  }
}
