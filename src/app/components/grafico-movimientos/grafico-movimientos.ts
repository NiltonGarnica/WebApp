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

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

@Component({
  selector: 'app-grafico-movimientos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafico-movimientos.html',
})
export class GraficoMovimientosComponent implements AfterViewInit, OnChanges {

  @Input() datos: any[] = [];
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit() {
    this.generarGrafico();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datos'] && !changes['datos'].firstChange) {
      this.generarGrafico();
    }
  }

  generarGrafico() {
    if (!this.datos || this.datos.length === 0) {
      console.warn("No hay datos para graficar");
      return;
    }

    // Si ya existe un gráfico previo, eliminarlo
    if (this.chart) {
      this.chart.destroy();
    }

    const fechas = this.datos.map(d => {
    const excelSerial = Number(d.fecha_creacion);
    const jsDate = new Date((excelSerial - 25569) * 86400 * 1000);

    return jsDate.toISOString().split("T")[0]; // devuelve 2025-01-07
    });
    const montos = this.datos.map(d => Number(d.monto || 0));

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        labels: fechas,
        datasets: [
          {
            label: 'Movimiento del día',
            data: montos,
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
