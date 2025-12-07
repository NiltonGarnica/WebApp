import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { FormularioSubirExcel } from '../../components/formulario-subir-excel/formulario-subir-excel';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-subir-excel',
  standalone: true,
  imports: [Sidebar, FormularioSubirExcel],
  templateUrl: './subir-excel.html',
  styleUrl: './subir-excel.css',
})
export class SubirExcel {

  data: any[] = [];

  onFileSelected(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });

      const firstSheet = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheet];

      this.data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log(this.data);
    };

    reader.readAsBinaryString(file);
  }
}
