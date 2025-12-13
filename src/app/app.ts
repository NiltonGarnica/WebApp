import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NgIf } from '@angular/common';

// Componentes tuyos
import { BotonPruebaComponent } from './components/boton-prueba/boton-prueba.component';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    BotonPruebaComponent,
    Header,
    Sidebar,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  mostrarLayout = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const ruta = this.router.url;

      // Ocultar layout en login
      this.mostrarLayout = ruta !== '/login';
    });
  }
}
