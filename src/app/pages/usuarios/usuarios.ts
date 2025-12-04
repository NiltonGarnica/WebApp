import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { TablaUsuarios } from '../../components/tabla-usuarios/tabla-usuarios';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [Sidebar, TablaUsuarios],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {

}
