import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MlService {

  private apiUrl = 'http://localhost:3000/api/ml/predict';

  constructor(private http: HttpClient) {}

  predecirIngresos(data: {
    gastos: number;
    clientes: number;
    promociones: number;
  }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getHistorial() {
    return this.http.get<any[]>(
      'http://localhost:3000/api/ml/history'
    );
  }
}