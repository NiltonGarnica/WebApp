import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { Login } from './pages/Login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Usuarios } from './pages/usuarios/usuarios';
import { Reportes } from './pages/reportes/reportes';
import { Configuracion } from './pages/configuracion/configuracion';
import { SubirExcel } from './pages/subir-excel/subir-excel';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'usuarios', component: Usuarios },
  { path: 'reportes', component: Reportes },
  { path: 'configuracion', component: Configuracion },
  { path: 'subir-excel', component: SubirExcel }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay())
  ]
};
