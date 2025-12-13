import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-formulario-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-usuarios.html',
})
export class FormularioUsuariosComponent implements OnChanges {
  @Input() modoCrear: boolean = true;
  @Input() usuarioEditar: any = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();

  usuario = {
    nombre: '',
    email: '',
    password: '',
    rol: 'usuario',
    estado: true
  };

  constructor(private userService: UserService) {}

  ngOnChanges() {
  if (this.modoCrear) {
    // Crear
    this.usuario = {
      nombre: '',
      email: '',
      password: '',
      rol: 'usuario',
      estado: true
    };
  } else {
    // Editar
    this.usuario = {
      nombre: this.usuarioEditar.nombre,
      email: this.usuarioEditar.email,
      password: '',
      rol: this.usuarioEditar.rol,
      estado: this.usuarioEditar.estado
    };
  }
}

  guardar() {
  if (this.modoCrear) {
    this.userService.createUser(this.usuario).subscribe({
      next: () => {
        alert("Usuario creado");
        this.onSave.emit();
        this.cerrar.emit();
      }
    });
  } else {
    this.userService.updateUser(this.usuarioEditar._id, this.usuario).subscribe({
      next: () => {
        alert("Usuario actualizado");
        this.onSave.emit();
        this.cerrar.emit();
      }
    });
  }
}

}
