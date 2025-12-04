import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { TarjetasResumen } from '../../components/tarjetas-resumen/tarjetas-resumen';
import { PanelCentral } from '../../components/panel-central/panel-central';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Sidebar, TarjetasResumen, PanelCentral],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
