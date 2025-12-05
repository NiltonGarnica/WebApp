import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { TarjetasResumen } from '../../components/tarjetas-resumen/tarjetas-resumen';
import { PanelCentral } from '../../components/panel-central/panel-central';
import { TablaUsuarios } from '../../components/tabla-usuarios/tabla-usuarios';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { TablaMovimientos } from '../../components/tabla-movimientos/tabla-movimientos';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Sidebar, TarjetasResumen, PanelCentral, TablaUsuarios, Footer, Header, TablaMovimientos],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
