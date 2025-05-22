import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class InitialBalanceService {
  private baseUrl = environment.apiUrl;
  private auth = getAuth();

  constructor(private http: HttpClient) {}

private waitForUser(): Promise<any> {
  return new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(this.auth, user => {
      unsubscribe();
      resolve(user);
    });
  });
}

private getAuthHeaders(): Observable<{ headers: HttpHeaders }> {
  return from(this.waitForUser()).pipe(
    switchMap(user => from(user.getIdToken())),
    map(token => ({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }))
  );
}

  get(): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get(`${this.baseUrl}/initial-balance`, headers)
      )
    );
  }

  upsert(data: { valor: number; data: string }): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.put(`${this.baseUrl}/initial-balance`, data, headers)
      )
    );
  }
}
