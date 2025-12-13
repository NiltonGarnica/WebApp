import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-grafico-ingresos-gastos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafico-ingresos-gastos.html',
})
export class GraficoIngresosGastosComponent implements AfterViewInit {

  @Input() ingresos: number = 0;
  @Input() gastos: number = 0;

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit() {
    this.generarGrafico();
  }

  generarGrafico() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ingresos', 'Gastos'],
        datasets: [
          {
            label: 'Total (Bs)',
            data: [this.ingresos, this.gastos],
            backgroundColor: ['#4F46E5', '#DC2626'],
            borderColor: ['#4338CA', '#B91C1C'],
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
