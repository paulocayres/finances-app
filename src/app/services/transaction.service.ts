import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private baseUrl = environment.apiUrl;
  //'http://localhost:3000/transactions';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transactions/`);
  }

  atualizar(id: string, dados: any) {
    console.log(id, dados);
    return this.http.put(`${this.baseUrl}/transactions/${id}`, dados).toPromise();
  }

  buscarPorId(id: string) {
    console.log(id);
    const response = this.http.get(`${this.baseUrl}/transactions/${id}`).toPromise();
    console.log(response);
    return response;
  }

create(transacao: any) {
  console.log('transacao: ',  transacao);
  return this.http.post(`${this.baseUrl}/transactions`, transacao).toPromise();
}

  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/transactions/${id}`, data);
  }

  delete(id: string){
    console.log('servico: ' ,id)
    const response = this.http.delete(`${this.baseUrl}/transactions/${id}`).toPromise();
    console.log('servico response: ' ,response);
    return response;
  }

}
