import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service.service';

@Injectable({ providedIn: 'root' })
export class ContaInvestimentoService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): Observable<{ headers: HttpHeaders }> {
    return from(this.authService.getIdToken()).pipe(
      map(token => {
        if (!token) {
          throw new Error('Usuário não autenticado ou token indisponível');
        }
        return {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`
          })
        };
      })
    );
  }

  get(): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get(`${this.baseUrl}/investment-balance`, headers)
      )
    );
  }

  upsert(data: { valor: number; data: string }): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.put(`${this.baseUrl}/investment-balance`, data, headers)
      )
    );
  }
}
