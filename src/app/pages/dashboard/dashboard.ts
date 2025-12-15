import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Componentes
import { Sidebar } from '../../components/sidebar/sidebar';
import { TarjetasResumen } from '../../components/tarjetas-resumen/tarjetas-resumen';
import { PanelCentral } from '../../components/panel-central/panel-central';
import { TablaUsuarios } from '../../components/tabla-usuarios/tabla-usuarios';
import { TablaMovimientos } from '../../components/tabla-movimientos/tabla-movimientos';
import { GraficoRealVsPrediccion } from '../../components/grafico-real-vs-prediccion/grafico-real-vs-prediccion';

// Servicios
import { UserSessionService } from '../../services/user-session.service';
import { DashboardDataService } from '../../services/dashboard-data.service';
import { MlService } from '../../services/ml.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,       // 👈 NECESARIO para ngIf, ngFor, ngClass, pipes
    FormsModule,        // 👈 NECESARIO para ngModel
    Sidebar,
    TarjetasResumen,
    PanelCentral,
    TablaUsuarios,
    TablaMovimientos,
    GraficoRealVsPrediccion
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  // ======================
  // 👤 Usuario
  // ======================
  user: any = null;

  // ======================
  // 📊 Datos del Excel
  // ======================
  usuariosActivos = 0;
  ingresosMes = 0;
  gastosMes = 0;
  datosParaGrafico: any[] = [];

  // ======================
  // 🤖 Machine Learning
  // ======================
  prediccionIngresos: number | null = null;
  cargandoPrediccion = false;
  errorPrediccion: string | null = null;

  // ======================
  // 🎛️ Inputs IA
  // ======================
  inputGastos = 0;
  inputClientes = 0;
  inputPromociones = 2;

  // ======================
  // 📜 Historial
  // ======================
  historialPredicciones: any[] = [];

  constructor(
    private userSession: UserSessionService,
    private dashboardData: DashboardDataService,
    private mlService: MlService
  ) {}

  ngOnInit(): void {

    // 👤 Usuario
    this.user = this.userSession.getUser();

    // 📊 Escuchar Excel
    this.dashboardData.data$.subscribe((data) => {
      this.usuariosActivos = data.usuariosActivos || 0;
      this.ingresosMes = data.totalIngresos || 0;
      this.gastosMes = data.totalGastos || 0;
      this.datosParaGrafico = data.datos || [];

      // Inicializar inputs IA
      this.inputGastos = this.gastosMes;
      this.inputClientes = this.usuariosActivos;
    });

    // 📜 Historial
    this.cargarHistorial();
  }

  // ======================
  // 🤖 Predicción
  // ======================
  predecirIngresos(): void {
    this.cargandoPrediccion = true;
    this.errorPrediccion = null;
    this.prediccionIngresos = null;

    const payload = {
      gastos: this.inputGastos,
      clientes: this.inputClientes,
      promociones: this.inputPromociones,
      ingresosReales: this.ingresosMes
    };

    this.mlService.predecirIngresos(payload).subscribe({
      next: (res) => {
        this.prediccionIngresos = Number(res.prediccion_ingresos);
        this.cargandoPrediccion = false;
        this.cargarHistorial();
      },
      error: () => {
        this.errorPrediccion = 'No se pudo calcular la predicción';
        this.cargandoPrediccion = false;
      }
    });
  }

  // ======================
  // 📜 Historial
  // ======================
  cargarHistorial(): void {
    this.mlService.getHistorial().subscribe({
      next: (data) => this.historialPredicciones = data,
      error: () => console.warn('No se pudo cargar historial')
    });
  }

  // ======================
  // 🧮 Getter seguro (EVITA ERRORES DE NULL)
  // ======================
  get diferenciaIngresos(): number {
    if (this.prediccionIngresos === null) return 0;
    return this.prediccionIngresos - this.ingresosMes;
  }
}
