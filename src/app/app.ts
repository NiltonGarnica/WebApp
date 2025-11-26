import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BotonPruebaComponent } from './boton-prueba/boton-prueba.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BotonPruebaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nilton');
}
