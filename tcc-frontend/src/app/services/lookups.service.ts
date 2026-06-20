import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Aluno, Professor } from '../models/models';

@Injectable({ providedIn: 'root' })
export class LookupsService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  list<T>(resource: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.base}${resource}/`);
  }

  alunos(): Observable<Aluno[]> {
    return this.list<Aluno>('alunos');
  }

  professores(): Observable<Professor[]> {
    return this.list<Professor>('professores');
  }
}
