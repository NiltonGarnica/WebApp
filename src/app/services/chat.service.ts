import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChatService {

  private api = 'http://localhost:3000/api/chat';

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: string, contexto: any[]) {
    return this.http.post<{ respuesta: string }>(this.api, {
      mensaje,
      contexto
    });
  }
}
