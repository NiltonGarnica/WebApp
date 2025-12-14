import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelService } from '../../services/excel.service';
import { DashboardDataService } from '../../services/dashboard-data.service';

@Component({
  selector: 'app-formulario-subir-excel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formulario-subir-excel.html',
  styleUrl: './formulario-subir-excel.css',
})
export class FormularioSubirExcel implements OnInit {

  archivo: File | null = null;
  datosExcel: any[] = [];

  msgSuccess: string | null = null;
  msgError: string | null = null;

  constructor(
    private excelService: ExcelService,
    private dashboardData: DashboardDataService,
    private cdr: ChangeDetectorRef
  ) {}

  // 🔥 Cargar datos desde MongoDB al iniciar
  ngOnInit() {
    this.excelService.obtenerDatasets().subscribe({
      next: (datasets: any[]) => {
        if (datasets.length > 0) {
          const ultimo = datasets[0]; // dataset más reciente

          this.datosExcel = ultimo.filas;

          this.dashboardData.setTablaExcel(ultimo.filas);
          this.dashboardData.setData({
            usuariosActivos: ultimo.filas.length,
            totalIngresos: this.calcularIngresos(ultimo.filas),
            totalGastos: this.calcularGastos(ultimo.filas),
            datos: ultimo.filas
          });

          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error("Error cargando datasets desde BD", err);
      }
    });
  }

  seleccionarArchivo(event: any) {
    this.archivo = event.target.files[0];
  }

  subir() {
    if (!this.archivo) {
      this.mostrarError("Selecciona un archivo primero");
      return;
    }

    this.excelService.subirExcel(this.archivo).subscribe({
      next: (res) => {
        this.datosExcel = res.datos;

        this.dashboardData.setTablaExcel(res.datos);
        this.dashboardData.setData({
          usuariosActivos: res.datos.length,
          totalIngresos: this.calcularIngresos(res.datos),
          totalGastos: this.calcularGastos(res.datos),
          datos: res.datos
        });

        this.cdr.detectChanges();
        this.mostrarSuccess("Archivo cargado y guardado correctamente ✔");
      },
      error: (err) => {
        console.error(err);
        this.mostrarError("Error al subir el archivo ❌");
      }
    });
  }

  mostrarSuccess(msg: string) {
    this.msgSuccess = msg;
    setTimeout(() => this.msgSuccess = null, 3000);
  }

  mostrarError(msg: string) {
    this.msgError = msg;
    setTimeout(() => this.msgError = null, 3000);
  }

  calcularIngresos(datos: any[]): number {
    return datos
      .filter(f => f.tipo?.toLowerCase() === 'ingreso')
      .reduce((acc, f) => acc + Number(f.monto || 0), 0);
  }

  calcularGastos(datos: any[]): number {
    return datos
      .filter(f => f.tipo?.toLowerCase() === 'gasto')
      .reduce((acc, f) => acc + Number(f.monto || 0), 0);
  }
}
