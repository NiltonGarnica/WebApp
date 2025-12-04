import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { FormularioConfiguracion } from '../../components/formulario-configuracion/formulario-configuracion';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [Sidebar, FormularioConfiguracion],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion {

}
