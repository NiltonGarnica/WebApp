import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { TarjetasResumen } from '../../components/tarjetas-resumen/tarjetas-resumen';
import { PanelCentral } from '../../components/panel-central/panel-central';
import { TablaUsuarios } from '../../components/tabla-usuarios/tabla-usuarios';
import { UserSessionService } from '../../services/user-session.service';
import { TablaMovimientos } from '../../components/tabla-movimientos/tabla-movimientos';
import { DashboardDataService } from '../../services/dashboard-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    Sidebar,
    TarjetasResumen,
    PanelCentral,
    TablaUsuarios,
    TablaMovimientos
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  user: any;

  usuariosActivos = 0;
  ingresosMes = 0;
  gastosMes = 0;
  datosParaGrafico: any[] = [];

  constructor(
    private userSession: UserSessionService,
    private dashboardData: DashboardDataService
  ) {}

  ngOnInit() {

    // Usuario logueado
    this.user = this.userSession.getUser();

    // 🔥 SUSCRIBIRSE A LOS CAMBIOS DEL EXCEL
    this.dashboardData.data$.subscribe((data) => {

      this.usuariosActivos = data.usuariosActivos;
      this.ingresosMes = data.totalIngresos;
      this.gastosMes = data.totalGastos;
      this.datosParaGrafico = data.datos;

      console.log("📊 Dashboard actualizado automáticamente:");
      console.log("Usuarios activos:", this.usuariosActivos);
      console.log("Ingresos:", this.ingresosMes);
      console.log("Gastos:", this.gastosMes);
      console.log("Datos para gráfico:", this.datosParaGrafico);
    });
  }
}
