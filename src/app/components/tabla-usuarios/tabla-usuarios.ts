import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-usuarios.html'
})
export class TablaUsuarios {

  @Input() usuarios: any[] = [];

  @Output() editarUsuario = new EventEmitter<any>();
  @Output() eliminarUsuario = new EventEmitter<string>();

}
