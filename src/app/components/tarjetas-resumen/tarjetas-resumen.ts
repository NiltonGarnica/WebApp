import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjetas-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjetas-resumen.html',
  styleUrl: './tarjetas-resumen.css'
})
export class TarjetasResumen {

  @Input() usuariosActivos: number = 0;
  @Input() ingresosMes: number = 0;
  @Input() gastosMes: number = 0;

}
