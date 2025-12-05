import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-usuarios.html',
  styleUrls: ['./formulario-usuarios.css']
})
export class FormularioUsuariosComponent {

  @Output() cerrar = new EventEmitter<void>();

  usuario = {
    nombre: '',
    email: '',
    rol: 'usuario',
    estado: true
  };

  guardar() {
    console.log("Usuario guardado:", this.usuario);
    this.cerrar.emit();  // para cerrar el formulario después
  }

  cancelar() {
    this.cerrar.emit();
  }
}
