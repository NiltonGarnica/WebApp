import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MlService } from '../../services/ml.service';
import { Sidebar } from '../../components/sidebar/sidebar';
@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule ,Sidebar],
  templateUrl: './reportes.html',
})
export class Reportes implements OnInit {

  historial: any[] = [];
  cargando = true;

  constructor(private mlService: MlService) {}

  ngOnInit() {
    this.mlService.getHistorial().subscribe({
      next: (data) => {
        this.historial = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }
}
