import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service.service';

@Injectable({ providedIn: 'root' })
export class ReportService {
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
        console.log(token);
        return {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`
          })
        };
      })
    );
  }

  getAnaliticoMensal(year: number, month: number): Observable<any> {
    console.log('Entrou no serviço: ', year, month);
    console.log('API URL atual:', environment.apiUrl);
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get(`${this.baseUrl}/reports/monthly-agenda`, {
          headers: headers.headers,
          params: new HttpParams()
            .set('year', year.toString())
            .set('month', month.toString())
        })
        
      )
    );
  }

  getResumo(startDate: string, endDate: string): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get(`${this.baseUrl}/reports/summary`, {
          headers: headers.headers,
          params: new HttpParams()
            .set('startDate', startDate)
            .set('endDate', endDate)
        })
      )
    );
  }
}
