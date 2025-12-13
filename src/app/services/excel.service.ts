import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private API_URL = 'http://localhost:3000/api/excel';

  constructor(private http: HttpClient) {}

  subirExcel(archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo); // ✔️ nombre correcto


    return this.http.post(`${this.API_URL}/upload`, formData);
  }
}
