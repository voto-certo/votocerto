import { Injectable, signal } from '@angular/core';
import { CandidatoResumo } from '../../models/Candidato';

@Injectable({
  providedIn: 'root'
})
export class UseStatesService {
  candidatos = signal<CandidatoResumo[]>([]);
  selectedMunicipio = signal<string>("")
  selectedEstado = signal<string>("");
  selectedCargo = signal<string>("");
  
  private isLoading = signal(false);

  constructor() { }

  get loading() {
    return this.isLoading.asReadonly();
  }

  show(): void {
    this.isLoading.set(true);
  }

  hide(): void {
    this.isLoading.set(false);
  }

}
