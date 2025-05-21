import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ContaInvestimentoService {
  private baseUrl = environment.apiUrl
  //http://localhost:3000/conta-investimento';

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`${this.baseUrl}/conta-investimento`);
  }

  upsert(data: { valor: number; data: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/conta-investimento`, data);
  }
}
