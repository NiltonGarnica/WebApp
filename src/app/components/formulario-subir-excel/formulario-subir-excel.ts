import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ExcelService } from '../../services/excel.service';
import { CommonModule } from '@angular/common';
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

  ngOnInit() {
    // 🔥 Restaurar la tabla si ya se subió antes
    const guardados = this.dashboardData.getTablaExcel();
    if (guardados.length > 0) {
      this.datosExcel = guardados;
    }
  }

  seleccionarArchivo(event: any) {
    this.archivo = event.target.files[0];
  }

  mostrarSuccess(msg: string) {
    this.msgSuccess = msg;
    setTimeout(() => this.msgSuccess = null, 3000);
  }

  mostrarError(msg: string) {
    this.msgError = msg;
    setTimeout(() => this.msgError = null, 3000);
  }

  subir() {
    if (!this.archivo) {
      this.mostrarError("Selecciona un archivo primero");
      return;
    }

    this.excelService.subirExcel(this.archivo).subscribe({
      next: (res) => {
        console.log("Excel procesado:", res);

        this.datosExcel = res.datos;

        // 👉 Guardar tabla global
        this.dashboardData.setTablaExcel(res.datos);

        this.cdr.detectChanges();

        // 👉 Actualizar Dashboard
        this.dashboardData.setData({
          usuariosActivos: res.datos.length,
          totalIngresos: this.calcularIngresos(res.datos),
          totalGastos: this.calcularGastos(res.datos),
          datos: res.datos
        });

        this.mostrarSuccess("Archivo cargado correctamente ✔");
      },
      error: (err) => {
        console.error(err);
        this.mostrarError("Error al subir el archivo ❌");
      }
    });
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
