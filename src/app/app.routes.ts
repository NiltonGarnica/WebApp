import { Routes } from '@angular/router';

import { Login } from './pages/Login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { SubirExcel } from './pages/subir-excel/subir-excel';
import { Reportes } from './pages/reportes/reportes';
import { Usuarios } from './pages/usuarios/usuarios';
import { Configuracion } from './pages/configuracion/configuracion';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'subir-excel', component: SubirExcel },
  { path: 'reportes', component: Reportes },
  { path: 'usuarios', component: Usuarios },
  { path: 'configuracion', component: Configuracion },
];
