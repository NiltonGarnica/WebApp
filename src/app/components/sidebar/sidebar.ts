import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserSessionService } from '../../services/user-session.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  // 🔥 Necesario para abrir/cerrar el menú
  isOpen: boolean = false;

  constructor(
    private router: Router,
    private userSession: UserSessionService
  ) {}

  // 🔥 Función para abrir/cerrar sidebar
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  // 🔥 Cerrar sesión
  logout() {
    this.userSession.logout();
    this.router.navigate(['/login']);
  }
}
