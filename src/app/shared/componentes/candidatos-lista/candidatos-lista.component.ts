import { Component, effect, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../module/shared-module';
import { Candidato, CandidatoResumo, CandidatosResponse } from '../../../core/models/Candidato';
import { MatListModule } from '@angular/material/list';
import { CandidatosFiltroComponent } from "../candidatos-filtro/candidatos-filtro.component";
import { UseStatesService } from '../../../core/services/states/use-states.service';
import { TseService } from '../../../core/services/tse/tse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidatos-lista',
  standalone: true,
  imports: [SharedModule, MatListModule, CandidatosFiltroComponent],
  templateUrl: './candidatos-lista.component.html',
  styleUrl: './candidatos-lista.component.scss'
})
export class CandidatosListaComponent {

  candidatos: CandidatoResumo[] = [];


  constructor(private useStatesService: UseStatesService,  private router: Router) {
    this.signalBeacon();
  }

  private signalBeacon(): void {
    effect(() => {
      if (this.useStatesService.candidatos() !== null && this.useStatesService.candidatos().length > 0) {
        this.candidatos = this.useStatesService.candidatos();
      }
    });
  }

  
  detalhesCandidato(candidato: CandidatoResumo): void {
    console.log(`chamar detalhe candidato`, candidato);
    this.router.navigate(['/cidade', this.useStatesService.selectedMunicipio(), 'candidato', candidato.id]);
  }
  
}
