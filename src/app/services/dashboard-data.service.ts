import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  // 👉 Estado del dashboard
  private dataSubject = new BehaviorSubject<any>({
    usuariosActivos: 0,
    totalIngresos: 0,
    totalGastos: 0,
    datos: []
  });

  // 👉 Estado exclusivo para la tabla de Subir Excel
  private tablaExcelSubject = new BehaviorSubject<any[]>([]);

  // Observables
  data$ = this.dataSubject.asObservable();
  tablaExcel$ = this.tablaExcelSubject.asObservable();

  constructor() {}

  // --------------------------------------------
  // 🔥 Guardar datos del dashboard
  // --------------------------------------------
  setData(data: any) {
    this.dataSubject.next({
      usuariosActivos: data.usuariosActivos,
      totalIngresos: data.totalIngresos,
      totalGastos: data.totalGastos,
      datos: data.datos || []
    });
  }

  // --------------------------------------------
  // 🔥 Guardar tabla del Excel para no perderla
  // --------------------------------------------
  setTablaExcel(tabla: any[]) {
    this.tablaExcelSubject.next(tabla);
  }

  // Obtener tabla en un componente
  getTablaExcel() {
    return this.tablaExcelSubject.getValue();
  }
}
