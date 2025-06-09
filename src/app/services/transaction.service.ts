import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service.service';


@Injectable({ providedIn: 'root' })
export class TransactionService {
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

  getAll(): Observable<any[]> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<any[]>(`${this.baseUrl}/transactions/`, headers)
      )
    );
  }

  atualizar(id: string, dados: any): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.put(`${this.baseUrl}/transactions/${id}`, dados, headers)
      )
    );
  }

  buscarPorId(id: string): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get(`${this.baseUrl}/transactions/${id}`, headers)
      )
    );
  }

  create(transacao: any): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.post(`${this.baseUrl}/transactions`, transacao, headers)
      )
    );
  }

  update(id: string, data: any): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.put(`${this.baseUrl}/transactions/${id}`, data, headers)
      )
    );
  }

  delete(id: string): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.delete(`${this.baseUrl}/transactions/${id}`, headers)
      )
    );
  }
}
