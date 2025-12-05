import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { FormularioConfiguracion } from '../../components/formulario-configuracion/formulario-configuracion';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [Sidebar, FormularioConfiguracion, FormsModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion {

  nombreSistema = "Mi App Web";
  notificaciones = true;
  temaOscuro = false;

  guardar() {
    console.log("Configuración guardada:");
    console.log({
      nombreSistema: this.nombreSistema,
      notificaciones: this.notificaciones,
      temaOscuro: this.temaOscuro
    });
  }
}
