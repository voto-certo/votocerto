import { Injectable, signal } from '@angular/core';
import { CandidatoResumo } from '../../models/Candidato';

@Injectable({
  providedIn: 'root'
})
export class UseStatesService {
  candidatos = signal<CandidatoResumo[]>([]);

  constructor() { }
}
