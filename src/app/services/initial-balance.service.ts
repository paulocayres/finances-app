// src/app/services/initial-balance.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class InitialBalanceService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`${this.baseUrl}/initial-balance`);
  }

  upsert(data: { valor: number; data: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/initial-balance`, data);
  }
}

