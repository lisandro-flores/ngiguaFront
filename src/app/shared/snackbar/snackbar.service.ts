import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private message$ = new BehaviorSubject<string | null>(null);
  public readonly messages = this.message$.asObservable();

  show(message: string, ms = 2500) {
    this.message$.next(message);
    if (ms > 0) setTimeout(() => this.clear(), ms);
  }

  clear() {
    this.message$.next(null);
  }
}
