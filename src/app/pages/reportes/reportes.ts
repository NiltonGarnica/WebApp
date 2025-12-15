import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Servicios
import { MlService } from '../../services/ml.service';
import { ExcelService } from '../../services/excel.service';

// Componentes
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    CommonModule,
    Sidebar
  ],
  templateUrl: './reportes.html',
})
export class Reportes implements OnInit {

  // ======================
  // 🤖 Reportes IA
  // ======================
  historialIA: any[] = [];
  cargandoIA = true;

  // ======================
  // 📁 Reportes Excel
  // ======================
  historialExcel: any[] = [];
  cargandoExcel = true;

  constructor(
    private mlService: MlService,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {

    // 🤖 Historial de predicciones IA
    this.mlService.getHistorial().subscribe({
      next: (data) => {
        this.historialIA = data;
        this.cargandoIA = false;
      },
      error: () => {
        this.cargandoIA = false;
      }
    });

    // 📁 Historial de Excels subidos
    this.excelService.obtenerDatasets().subscribe({
      next: (data) => {
        this.historialExcel = data;
        this.cargandoExcel = false;
      },
      error: () => {
        this.cargandoExcel = false;
      }
    });

  }
}
