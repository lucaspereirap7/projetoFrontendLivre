import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tcc, TccStats } from '../models/models';

@Injectable({ providedIn: 'root' })
export class TccService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}tccs/`;

  list(search?: string): Observable<Tcc[]> {
    const url = search ? `${this.base}?search=${encodeURIComponent(search)}` : this.base;
    return this.http.get<Tcc[]>(url);
  }

  get(id: number): Observable<Tcc> {
    return this.http.get<Tcc>(`${this.base}${id}/`);
  }

  create(data: FormData): Observable<Tcc> {
    return this.http.post<Tcc>(this.base, data);
  }

  update(id: number, data: FormData): Observable<Tcc> {
    return this.http.patch<Tcc>(`${this.base}${id}/`, data);
  }

  updateStatus(id: number, status: string): Observable<Tcc> {
    return this.http.patch<Tcc>(`${this.base}${id}/`, { status });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}${id}/`);
  }

  stats(): Observable<TccStats> {
    return this.http.get<TccStats>(`${this.base}estatisticas/`);
  }
}
