import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

// Registrar componentes de Chart.js
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-grafico-movimientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grafico-movimientos.html',
})
export class GraficoMovimientosComponent
  implements AfterViewInit, OnChanges {

  // 📥 Datos que vienen del dashboard
  @Input() datos: any[] = [];

  // 🎨 Canvas
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  // 🔧 Columnas dinámicas
  columnas: string[] = [];
  columnaX: string = '';
  columnaY: string = '';

  // 🔄 Cuando el componente ya existe
  ngAfterViewInit() {
    if (this.datos.length > 0) {
      this.inicializarColumnas();
      this.generarGrafico();
    }
  }

  // 🔄 Cuando cambian los datos (nuevo Excel)
  ngOnChanges(changes: SimpleChanges) {
    if (changes['datos'] && this.datos.length > 0) {
      this.inicializarColumnas();
      this.generarGrafico();
    }
  }

  // 🧠 Detectar columnas automáticamente
  inicializarColumnas() {
    this.columnas = Object.keys(this.datos[0]);

    // Valores por defecto
    if (!this.columnaX) {
      this.columnaX = this.columnas[0];
    }

    if (!this.columnaY) {
      this.columnaY =
        this.columnas.find(col => !isNaN(Number(this.datos[0][col]))) ||
        this.columnas[0];
    }
  }

  // 📊 Crear / actualizar gráfico
  generarGrafico() {
    if (!this.datos || this.datos.length === 0) {
      console.warn('No hay datos para graficar');
      return;
    }

    // Destruir gráfico anterior si existe
    if (this.chart) {
      this.chart.destroy();
    }

    // 📈 Datos dinámicos según columnas elegidas
    const labels = this.datos.map(d => d[this.columnaX]);
    const values = this.datos.map(d => Number(d[this.columnaY]) || 0);

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: `${this.columnaY} vs ${this.columnaX}`,
            data: values,
            borderColor: '#4F46E5',
            backgroundColor: 'rgba(79,70,229,0.3)',
            borderWidth: 3,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: '#6366F1'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true }
        }
      }
    });
  }
}
