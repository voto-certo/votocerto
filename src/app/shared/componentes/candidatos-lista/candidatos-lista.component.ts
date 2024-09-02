import { Component, effect, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../module/shared-module';
import { CandidatoResumo, CandidatosResponse } from '../../../core/models/Candidato';
import { MatListModule } from '@angular/material/list';
import { CandidatosFiltroComponent } from "../candidatos-filtro/candidatos-filtro.component";
import { UseStatesService } from '../../../core/services/states/use-states.service';

@Component({
  selector: 'app-candidatos-lista',
  standalone: true,
  imports: [SharedModule, MatListModule, CandidatosFiltroComponent],
  templateUrl: './candidatos-lista.component.html',
  styleUrl: './candidatos-lista.component.scss'
})
export class CandidatosListaComponent {

  candidatos: CandidatoResumo[] = [];


  constructor(private useStatesService: UseStatesService) {
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
  }
  
}
