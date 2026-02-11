import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FeedbackPayload {
  type: 'bug' | 'feedback';
  message: string;
  email?: string;
  wordId?: string;
  wordTerm?: string;
}

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private apiUrl = `${environment.apiUrl}/feedback`;
  constructor(private http: HttpClient) { }

  send(payload: FeedbackPayload): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
}
