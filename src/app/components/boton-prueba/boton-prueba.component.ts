import { Component } from '@angular/core';

@Component({
  selector: 'app-boton-prueba',
  standalone: true,
  templateUrl: './boton-prueba.component.html',
  styleUrl: './boton-prueba.component.css'
})
export class BotonPruebaComponent {
  saludar() {
    alert('Hola desde Angular 😎🔥');
  }
}
