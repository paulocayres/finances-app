import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private baseUrl = environment.apiUrl;
  //private baseUrl = 'http://localhost:3000/reports';

  constructor(private http: HttpClient) {}

  getAnaliticoMensal(year: number, month: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/reports/monthly-agenda`, {
      params: new HttpParams().set('year', year).set('month', month)
    });
  }

  getEvolucaoPorPeriodo(inicio: string, fim: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/reports/sumary`, {
      params: new HttpParams().set('inicio', inicio).set('fim', fim)
    });
  }
}
