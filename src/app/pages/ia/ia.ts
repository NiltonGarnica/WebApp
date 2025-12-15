import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as Plotly from 'plotly.js-dist-min';

import { MlService } from '../../services/ml.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-ia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ia.html'
})
export class IA {

  // =========================
  // 📂 EXCEL
  // =========================
  excelData: {
    mes: number;
    gastos: number;
    clientes: number;
    promociones: number;
    ingresos: number;
  }[] = [];

  // =========================
  // ⏱ CONFIG
  // =========================
  meses = 6;
  cargando = false;
  error: string | null = null;

  // =========================
  // 📊 DATOS REALES
  // =========================
  mesesReales: string[] = [];
  gastosReales: number[] = [];
  clientesReales: number[] = [];
  ingresosReales: number[] = [];

  // =========================
  // 🔮 DATOS ML
  // =========================
  mesesFuturos: string[] = [];
  gastosML: number[] = [];
  clientesML: number[] = [];
  ingresosML: number[] = [];

  // =========================
  // 💬 CHAT IA
  // =========================
  mensajes: { rol: 'user' | 'ia'; texto: string }[] = [];
  mensajeUsuario = '';

  // =========================
  // 🌋 MODO 3D
  // =========================
  modoSuperficie = false;

  constructor(
    private mlService: MlService,
    private chatService: ChatService
  ) {}

  // =========================
  // 📂 SUBIR EXCEL
  // =========================
  cargarExcel(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      this.excelData = XLSX.utils.sheet_to_json(sheet);

      this.mesesReales = this.excelData.map(d => `Mes ${d.mes}`);
      this.gastosReales = this.excelData.map(d => Number(d.gastos));
      this.clientesReales = this.excelData.map(d => Number(d.clientes));
      this.ingresosReales = this.excelData.map(d => Number(d.ingresos));

      this.mesesFuturos = [];
      this.gastosML = [];
      this.clientesML = [];
      this.ingresosML = [];

      this.grafica2D();
      this.grafica3D();
    };

    reader.readAsBinaryString(file);
  }

  // =========================
  // 🤖 EJECUTAR ML
  // =========================
  ejecutarML() {
    if (!this.excelData.length) {
      this.error = 'Primero sube un Excel';
      return;
    }

    this.cargando = true;
    this.error = null;

    this.mlService.predecirFuturo(this.excelData, this.meses).subscribe({
      next: (res) => {
        this.mesesFuturos = res.meses.map(m => `Mes ${m} (ML)`);
        this.gastosML = res.gastos;
        this.clientesML = res.clientes;
        this.ingresosML = res.ingresos;

        this.grafica2D();
        this.grafica3D();
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error ejecutando ML';
        this.cargando = false;
      }
    });
  }

  // =========================
  // 📊 GRAFICA 2D
  // =========================
  grafica2D() {
    Plotly.newPlot('grafica2D', [
      {
        x: this.mesesReales,
        y: this.gastosReales,
        name: 'Gastos (reales)',
        mode: 'lines+markers'
      },
      {
        x: this.mesesReales,
        y: this.clientesReales,
        name: 'Clientes (reales)',
        mode: 'lines+markers'
      },
      {
        x: this.mesesReales,
        y: this.ingresosReales,
        name: 'Ingresos (reales)',
        mode: 'lines+markers'
      },
      {
        x: this.mesesFuturos,
        y: this.ingresosML,
        name: 'Ingresos (ML)',
        mode: 'lines+markers',
        line: { dash: 'dot' }
      }
    ], {
      title: 'Histórico + Predicción',
      xaxis: { title: 'Mes' },
      yaxis: { title: 'Valor' }
    });
  }

  // =========================
  // 🌋 GRAFICA 3D
  // =========================
  grafica3D() {

    const x = this.mesesReales.concat(this.mesesFuturos);

    const z = [
      this.gastosReales.concat(this.gastosML),
      this.clientesReales.concat(this.clientesML),
      this.ingresosReales.concat(this.ingresosML)
    ];

    let data: any[] = [];

    if (this.modoSuperficie) {
      data = [{
        type: 'surface',
        x: x,
        y: ['Gastos', 'Clientes', 'Ingresos'],
        z: z,
        colorscale: 'Viridis'
      }];
    } else {
      data = [
        {
          type: 'scatter3d',
          mode: 'lines+markers',
          name: 'Gastos',
          x: x,
          y: this.gastosReales.concat(this.gastosML),
          z: this.ingresosReales.concat(this.ingresosML),
          marker: { color: 'blue', size: 4 }
        },
        {
          type: 'scatter3d',
          mode: 'lines+markers',
          name: 'Clientes',
          x: x,
          y: this.clientesReales.concat(this.clientesML),
          z: this.ingresosReales.concat(this.ingresosML),
          marker: { color: 'green', size: 4 }
        },
        {
          type: 'scatter3d',
          mode: 'lines+markers',
          name: 'Ingresos',
          x: x,
          y: this.ingresosReales.concat(this.ingresosML),
          z: this.ingresosReales.concat(this.ingresosML),
          marker: { color: 'red', size: 4 }
        }
      ];
    }

    Plotly.newPlot('grafica3D', data, {
      title: this.modoSuperficie ? 'Superficie 3D con relieve' : 'Gráfica 3D (puntos)',
      scene: {
        xaxis: { title: 'Mes' },
        yaxis: { title: 'Variable / Valor' },
        zaxis: { title: 'Ingresos' }
      }
    });
  }

  // =========================
  // 💬 CHAT IA
  // =========================
  enviarChat() {
    if (!this.mensajeUsuario.trim()) return;

    this.mensajes.push({ rol: 'user', texto: this.mensajeUsuario });

    this.chatService.enviarMensaje(
      this.mensajeUsuario,
      this.excelData
    ).subscribe(res => {
      this.mensajes.push({ rol: 'ia', texto: res.respuesta });
    });

    this.mensajeUsuario = '';
  }
}
