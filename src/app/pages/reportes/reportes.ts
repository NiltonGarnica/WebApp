import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { TablaReportes } from '../../components/tabla-reportes/tabla-reportes';
@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [Sidebar, TablaReportes],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes {

}
