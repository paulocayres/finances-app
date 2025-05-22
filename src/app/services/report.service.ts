import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private baseUrl = environment.apiUrl;
  private auth = getAuth();

  constructor(private http: HttpClient) {}

private waitForUser(): Promise<any> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(this.auth, user => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Usuário não autenticado'));
      }
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


getAnaliticoMensal(year: number, month: number): Observable<any> {
  console.log('Enviando ano:', year, 'mês:', month);

  return this.getAuthHeaders().pipe(
    switchMap(headers => {
      console.log('Headers:', headers);

      return this.http.get(`${this.baseUrl}/reports/monthly-agenda`, {
        headers: headers.headers,
        params: new HttpParams()
          .set('year', year.toString())
          .set('month', month.toString())
      });
    })
  );
}


  getEvolucaoPorPeriodo(inicio: string, fim: string): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get(`${this.baseUrl}/reports/sumary`, {
          headers: headers.headers,
          params: new HttpParams()
            .set('inicio', inicio)
            .set('fim', fim)
        })
      )
    );
  }
}
