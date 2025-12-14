import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import Plotly from 'plotly.js-dist-min';

@Component({
  selector: 'app-grafico-ingresos-gastos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grafico-ingresos-gastos.html',
})
export class GraficoIngresosGastosComponent
  implements AfterViewInit, OnChanges {

  @Input() datos: any[] = [];

  @ViewChild('plot') plot!: ElementRef<HTMLDivElement>;

  columnas: string[] = [];
  ejeX = '';
  ejeY = '';
  ejeZ = '';

  ngAfterViewInit() {
    if (this.datos.length > 0) {
      this.initColumnas();
      this.render3D();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datos'] && this.datos.length > 0) {
      this.initColumnas();
      this.render3D();
    }
  }

  initColumnas() {
    this.columnas = Object.keys(this.datos[0]);

    if (!this.ejeX) this.ejeX = this.columnas[0];
    if (!this.ejeY) this.ejeY = this.columnas[1] || this.columnas[0];
    if (!this.ejeZ) {
      this.ejeZ =
        this.columnas.find(c => !isNaN(Number(this.datos[0][c]))) ||
        this.columnas[0];
    }
  }

  render3D() {
    if (!this.plot) return;

    const x = this.datos.map(d => d[this.ejeX]);
    const y = this.datos.map(d => d[this.ejeY]);
    const z = this.datos.map(d => Number(d[this.ejeZ]) || 0);

    const trace = {
      x,
      y,
      z,
      mode: 'markers',
      type: 'scatter3d',
      marker: {
        size: 4,
        color: z,
        colorscale: 'Viridis',
        opacity: 0.8
      }
    };

    const layout = {
      title: 'Visualización 3D (X, Y, Z)',
      scene: {
        xaxis: { title: this.ejeX },
        yaxis: { title: this.ejeY },
        zaxis: { title: this.ejeZ }
      },
      margin: { l: 0, r: 0, b: 0, t: 40 }
    };

    Plotly.newPlot(this.plot.nativeElement, [trace], layout);
  }
}
