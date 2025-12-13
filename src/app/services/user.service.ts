import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/usuarios';



  constructor(private http: HttpClient) {}

  // 🔵 Crear usuario
  createUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // 🔵 Obtener usuarios
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // 🔵 Actualizar usuario
  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // 🔵 Eliminar usuario
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

