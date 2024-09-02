import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CandidatoComponent } from './pages/candidato/candidato.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Rota para a página inicial
    { path: 'cidade/:id_cidade/candidato/:id_candidato', component: CandidatoComponent }, // Rota para a página de candidato
    { path: '**', redirectTo: '', pathMatch: 'full' }, // Redireciona qualquer rota inexistente para a página inicial
];
