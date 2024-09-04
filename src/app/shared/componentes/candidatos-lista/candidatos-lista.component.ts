import { Component, effect, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../module/shared-module';
import { CandidatoResumo } from '../../../core/models/Candidato';
import { MatListModule } from '@angular/material/list';
import { CandidatosFiltroComponent } from "../candidatos-filtro/candidatos-filtro.component";
import { UseStatesService } from '../../../core/services/states/use-states.service';
import { Router } from '@angular/router';
import { UtilService } from '../../utils/services/util.service';

@Component({
  selector: 'app-candidatos-lista',
  standalone: true,
  imports: [SharedModule, MatListModule, CandidatosFiltroComponent],
  templateUrl: './candidatos-lista.component.html',
  styleUrl: './candidatos-lista.component.scss'
})
export class CandidatosListaComponent {

  candidatos: CandidatoResumo[] = [];
  filteredCandidatos: CandidatoResumo[] = [];


  constructor(private useStatesService: UseStatesService,  private router: Router, private utilService: UtilService) {
    this.signalBeacon();
  }

  private signalBeacon(): void {
    effect(() => {
      if (this.useStatesService.candidatos() !== null && this.useStatesService.candidatos().length > 0) {
        this.candidatos = this.useStatesService.candidatos();
        this.filteredCandidatos = this.candidatos;
      }
    });
  }

  
  detalhesCandidato(candidato: CandidatoResumo): void {
    console.log(`chamar detalhe candidato`, candidato);
    this.router.navigate(['/cidade', this.useStatesService.selectedMunicipio(), 'candidato', candidato.id]);
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.filteredCandidatos = this.candidatos.filter(candidato =>
      candidato.nomeCompleto.toLowerCase().includes(filterValue)
    );
  }
  
}
