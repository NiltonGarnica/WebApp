import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { FormularioSubirExcel } from '../../components/formulario-subir-excel/formulario-subir-excel';
@Component({
  selector: 'app-subir-excel',
  standalone: true,
  imports: [Sidebar, FormularioSubirExcel],
  templateUrl: './subir-excel.html',
  styleUrl: './subir-excel.css',
})
export class SubirExcel {

}
