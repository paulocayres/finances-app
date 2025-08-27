import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom, from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service.service';
import { InitialBalanceService } from './initial-balance.service';
import { ContaInvestimentoService } from './conta-investimento.service';



@Injectable({ providedIn: 'root' })
export class ReportService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private initialBalanceService: InitialBalanceService,
    private contaInvestimentoService: ContaInvestimentoService
  ) { }

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

  async getAnaliticoMensal(year: number, month: number): Promise<Observable<any>> {
    console.log('Entrou no serviço: ', year, month);
    console.log('API URL atual:', environment.apiUrl);
    objeto: Object


    try {
      const saldo = await firstValueFrom(this.initialBalanceService.get());
      console.log('Saldo inicial já existe:', saldo);
    } catch (err) {
      console.warn('Saldo inicial não encontrado, criando com valor 0...');
      const data = new Date();
      await firstValueFrom(this.initialBalanceService.upsert({
        valor: 0,
        data: data.toISOString()
      }));
    }

    try {
      const conta = await firstValueFrom(this.contaInvestimentoService.get());
      console.log('Conta investimento já existe:', conta);
    } catch (err) {
      console.warn('Conta investimento não encontrada, criando com valor 0...');
      const data = new Date();
      await firstValueFrom(this.contaInvestimentoService.upsert({
        valor: 0,
        data: data.toISOString()
      }));
    }


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
