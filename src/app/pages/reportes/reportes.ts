import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { TablaReportes } from '../../components/tabla-reportes/tabla-reportes';
import { TarjetasResumen } from '../../components/tarjetas-resumen/tarjetas-resumen';
@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [Sidebar, TablaReportes, TarjetasResumen],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes {

}
