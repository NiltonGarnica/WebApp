import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 🔥 URL DIRECTA AL BACKEND EN RENDER (SIN environment)
  private apiUrl = 'https://dashboard-backend-tgww.onrender.com/api/usuarios';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    // 🧪 LOG CLAVE: esto nos dice qué URL REAL usa Angular
    console.log('🚀 URL REAL USADA PARA LOGIN:', `${this.apiUrl}/login`);
    console.log('📨 Datos enviados:', data);

    return this.http.post(`${this.apiUrl}/login`, data);
  }
}
