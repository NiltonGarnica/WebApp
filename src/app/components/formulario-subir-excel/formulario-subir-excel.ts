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

  // 📁 Archivo seleccionado
  archivo: File | null = null;

  // 📊 Datos mostrados en tabla
  datosExcel: any[] = [];

  // 📚 Historial de datasets
  datasets: any[] = [];

  // 📌 Dataset activo
  datasetActivo: any = null;

  // 🔔 Mensajes
  msgSuccess: string | null = null;
  msgError: string | null = null;

  constructor(
    private excelService: ExcelService,
    private dashboardData: DashboardDataService,
    private cdr: ChangeDetectorRef
  ) {}

  // 🔥 Cargar datasets al iniciar
  ngOnInit() {
    this.cargarDatasets();
  }

  // =========================
  // 📤 Seleccionar archivo
  // =========================
  seleccionarArchivo(event: any) {
    this.archivo = event.target.files[0];
  }

  // =========================
  // ⬆️ Subir Excel
  // =========================
  subir() {
    if (!this.archivo) {
      this.mostrarError('Selecciona un archivo primero');
      return;
    }

    this.excelService.subirExcel(this.archivo).subscribe({
      next: () => {
        this.mostrarSuccess('Archivo cargado correctamente ✔');
        this.archivo = null;
        this.cargarDatasets(); // 🔄 refrescar lista
      },
      error: () => {
        this.mostrarError('Error al subir el archivo ❌');
      }
    });
  }

  // =========================
  // 📚 Cargar historial
  // =========================
  cargarDatasets() {
    this.excelService.obtenerDatasets().subscribe({
      next: (data: any[]) => {
        this.datasets = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mostrarError('Error cargando datasets');
      }
    });
  }

  // =========================
  // ▶️ Usar dataset
  // =========================
  usarDataset(dataset: any) {
    this.datasetActivo = dataset;
    this.datosExcel = dataset.filas;

    this.dashboardData.setTablaExcel(dataset.filas);
    this.dashboardData.setData({
      usuariosActivos: dataset.filas.length,
      totalIngresos: this.calcularIngresos(dataset.filas),
      totalGastos: this.calcularGastos(dataset.filas),
      datos: dataset.filas
    });

    this.cdr.detectChanges();
  }

  // =========================
  // 🧹 Limpiar vista
  // =========================
  limpiarVista() {
    this.datasetActivo = null;
    this.datosExcel = [];
  }

  // =========================
  // 🧮 Cálculos
  // =========================
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

  // =========================
  // 🔔 Mensajes
  // =========================
  mostrarSuccess(msg: string) {
    this.msgSuccess = msg;
    setTimeout(() => this.msgSuccess = null, 3000);
  }

  mostrarError(msg: string) {
    this.msgError = msg;
    setTimeout(() => this.msgError = null, 3000);
  }
}
