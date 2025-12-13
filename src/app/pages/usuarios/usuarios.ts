import { Component, ChangeDetectorRef } from '@angular/core';
import { TablaUsuarios } from '../../components/tabla-usuarios/tabla-usuarios';
import { FormularioUsuariosComponent } from '../../components/formulario-usuarios/formulario-usuarios';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [TablaUsuarios, FormularioUsuariosComponent, CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {

  usuarios: any[] = [];
  mostrarFormulario = false;
  usuarioEditando: any = null;
  modoCrear: boolean = true;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        console.log("✔ Usuarios cargados:", res);
        this.usuarios = res;

        // 🔥 SOLUCIÓN CLAVE: obliga a Angular a refrescar la tabla
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error cargando usuarios:", err)
    });
  }

  abrirFormulario() {
    this.modoCrear = true;
    this.usuarioEditando = null;
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  editar(usuario: any) {
    this.modoCrear = false;
    this.usuarioEditando = { ...usuario };
    this.mostrarFormulario = true;
  }

  eliminar(id: string) {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        alert("Usuario eliminado correctamente");
        this.cargarUsuarios();
      },
      error: (err) => console.error(err)
    });
  }

  actualizarTabla() {
    this.cargarUsuarios();
    this.cerrarFormulario();
  }
}
