import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MlService } from '../../services/ml.service';
import { GraficoRealVsPrediccion } from '../../components/grafico-real-vs-prediccion/grafico-real-vs-prediccion';
import { Sidebar } from '../../components/sidebar/sidebar';
@Component({
  selector: 'app-ia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GraficoRealVsPrediccion,
    Sidebar
  ],
  templateUrl: './ia.html'
})
export class IA {

  // Inputs
  gastos = 0;
  clientes = 0;
  promociones = 0;

  // Resultados
  prediccion: number | null = null;
  cargando = false;
  error: string | null = null;

  constructor(private mlService: MlService) {}

  predecir() {
    this.cargando = true;
    this.error = null;

    this.mlService.predecirIngresos({
      gastos: this.gastos,
      clientes: this.clientes,
      promociones: this.promociones
    }).subscribe({
      next: (res) => {
        this.prediccion = res.prediccion_ingresos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error en la predicción';
        this.cargando = false;
      }
    });
  }
}
