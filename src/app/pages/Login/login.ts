import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Footer } from '../../components/footer/footer';
import { AuthService } from '../../services/auth.service';
import { UserSessionService } from '../../services/user-session.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userSession: UserSessionService
  ) {}

  login() {

    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data).subscribe({
      next: (res) => {

        console.log("Respuesta del login:", res);

        // Guardamos token
        localStorage.setItem('token', res.token);

        // Guardamos usuario usando el servicio
        this.userSession.saveUser(res.usuario);

        alert('Login exitoso');
        this.router.navigate(['/dashboard']);
      },

      error: () => {
        alert('Credenciales incorrectas');
      }
    });

  }
}

export const appConfig = {
  providers: [
    provideHttpClient()
  ]
};
