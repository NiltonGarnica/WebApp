import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { TablaUsuarios } from '../../components/tabla-usuarios/tabla-usuarios';
import { FormularioUsuariosComponent } from '../../components/formulario-usuarios/formulario-usuarios';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [Sidebar, TablaUsuarios, FormularioUsuariosComponent],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {

  mostrarFormulario = false;

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

}
