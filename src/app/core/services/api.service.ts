import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = `${environment.apiUrl}/words`;

  constructor(private http: HttpClient) { }

  search(query: string, mode: 'precise' | 'suggestions' = 'suggestions'): Observable<Word[]> {
    const q = encodeURIComponent(query);
    return this.http.get<Word[]>(`${this.apiUrl}/search?q=${q}&mode=${mode}`);
  }

  getRandom(): Observable<Word> {
    return this.http.get<Word>(`${this.apiUrl}/random`);
  }

  getCommon(limit = 10): Observable<Word[]> {
    return this.http.get<Word[]>(`${this.apiUrl}/common?limit=${limit}`);
  }

  getDiscover(limit = 10): Observable<Word[]> {
    return this.http.get<Word[]>(`${this.apiUrl}/discover?limit=${limit}`);
  }

  getAnimals(limit = 100): Observable<Word[]> {
    return this.http.get<Word[]>(`${this.apiUrl}/animals?limit=${limit}`);
  }

  vote(id: string): Observable<Word> {
    return this.http.post<Word>(`${this.apiUrl}/${id}/vote`, {});
  }

  uploadAudio(id: string, file: File): Observable<{ audioUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ audioUrl: string }>(`${this.apiUrl}/${id}/audio`, formData);
  }

  getQuiz(): Observable<{ question: any, options: any[] }> {
    return this.http.get<{ question: any, options: any[] }>(`${this.apiUrl}/quiz`);
  }

  login(username: string, password: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl.replace('/words', '')}/auth/login`, { username, password });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl.replace('/words', '')}/auth/register`, { username, password });
  }

  setToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('tha_token', token);
    }
  }

  getToken(): string | null {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return localStorage.getItem('tha_token');
  }

  clearToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('tha_token');
    }
  }

  private authHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  listUsers(): Observable<any[]> {
    const url = `${this.apiUrl.replace('/words', '')}/users`;
    return this.http.get<any[]>(url, { headers: this.authHeaders() });
  }

  updateUserRole(id: string, role: 'admin' | 'user'): Observable<any> {
    const url = `${this.apiUrl.replace('/words', '')}/users/${id}/role`;
    return this.http.patch<any>(url, { role }, { headers: this.authHeaders() });
  }

  resolveUrl(path: string): string {
    if (!path) return path;
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    return `${environment.apiUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }
}

export interface Word {
  _id: string;
  term: string;
  type?: string;
  definitions?: string[];
  conjugations?: string[];
  examples?: string[];
  notes?: string;
  isVariant?: boolean;
  votes?: number;
  audioUrl?: string;
}
