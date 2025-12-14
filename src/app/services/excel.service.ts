import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  // ✅ Backend LOCAL
  private apiUrl = 'http://localhost:3000/api/excel';

  constructor(private http: HttpClient) {}

  subirExcel(archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
  obtenerDatasets(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
