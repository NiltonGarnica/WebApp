import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MlService {

  // 🔗 Base de la API
  private api = 'http://localhost:3000/api/ml';

  constructor(private http: HttpClient) {}

  // =========================
  // 🔮 PREDICCIÓN SIMPLE (YA FUNCIONA)
  // =========================
  predecirIngresos(data: {
    gastos: number;
    clientes: number;
    promociones: number;
  }): Observable<{ prediccion_ingresos: number }> {
    return this.http.post<{ prediccion_ingresos: number }>(
      `${this.api}/predict`,
      data
    );
  }

  // =========================
  // 📜 HISTORIAL (OPCIONAL)
  // =========================
  getHistorial(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/history`);
  }

  // =========================
  // 🤖 PREDICCIÓN FUTURA MULTIVARIABLE (NUEVA 🔥)
  // =========================
  predecirFuturo(
    historial: any[],
    meses: number
  ): Observable<{
    meses: number[];
    gastos: number[];
    clientes: number[];
    ingresos: number[];
  }> {
    return this.http.post<{
      meses: number[];
      gastos: number[];
      clientes: number[];
      ingresos: number[];
    }>(
      `${this.api}/predict-futuro`,
      { historial, meses }
    );
  }
}
