import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Reportes } from './pages/reportes/reportes';
import { Login } from './pages/Login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Usuarios } from './pages/usuarios/usuarios';
import { SubirExcel } from './pages/subir-excel/subir-excel';
import { authGuard } from './guards/auth-guard';
import { IA } from './pages/ia/ia';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'usuarios', component: Usuarios, canActivate: [authGuard] },
  { path: 'subir-excel', component: SubirExcel, canActivate: [authGuard] },
  { path: 'reportes', component: Reportes , canActivate: [authGuard] },
  { path: 'ia', component: IA, canActivate: [authGuard] },

];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient() // ✅ AQUÍ ES DONDE DEBE IR
  ]
};
