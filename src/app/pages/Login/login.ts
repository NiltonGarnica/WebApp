import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Sidebar],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
          constructor(private router: Router) {}

  login() {
    // Aquí luego pondremos validaciones reales
    this.router.navigate(['/dashboard']);
  }


}

