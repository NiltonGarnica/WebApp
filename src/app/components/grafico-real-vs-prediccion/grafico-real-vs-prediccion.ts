import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
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
  selector: 'app-grafico-real-vs-prediccion',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #canvas></canvas>`
})
export class GraficoRealVsPrediccion implements OnChanges {

  @Input() real: number | null = null;
  @Input() prediccion: number | null = null;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (this.real !== null && this.prediccion !== null) {
      this.renderChart();
    }
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ingresos reales', 'Ingresos predichos'],
        datasets: [{
          label: 'Bs',
          data: [this.real, this.prediccion],
          backgroundColor: ['#2563eb', '#16a34a']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
