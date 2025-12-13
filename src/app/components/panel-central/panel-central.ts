import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficoMovimientosComponent } from '../grafico-movimientos/grafico-movimientos';
import { GraficoIngresosGastosComponent } from '../grafico-ingresos-gastos/grafico-ingresos-gastos';

@Component({
  selector: 'app-panel-central',
  standalone: true,
  imports: [
    CommonModule,
    GraficoMovimientosComponent,
    GraficoIngresosGastosComponent
  ],
  templateUrl: './panel-central.html',
  styleUrl: './panel-central.css',
})
export class PanelCentral {
  @Input() datos: any[] = [];
  @Input() ingresos: number = 0;
  @Input() gastos: number = 0;
}
