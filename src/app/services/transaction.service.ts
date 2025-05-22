import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private baseUrl = environment.apiUrl;
  private auth = getAuth();

  constructor(private http: HttpClient) {}

  private waitForUser(): Observable<User> {
    return new Observable<User>((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, user => {
        unsubscribe();
        if (user) {
          observer.next(user);
          observer.complete();
        } else {
          observer.error(new Error('Usuário não autenticado'));
        }
      });
    });
  }

  private getAuthHeaders(): Observable<{ headers: HttpHeaders }> {
    return this.waitForUser().pipe(
      switchMap(user => from(user.getIdToken())),
      map(token => ({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      }))
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
