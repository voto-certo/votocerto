import { Injectable, signal } from '@angular/core';
import { Candidato, CandidatoResumo } from '../../models/Candidato';
import { Eleicao } from '../../models/Ordinaria';

@Injectable({
  providedIn: 'root'
})
export class UseStatesService {
  candidatos = signal<CandidatoResumo[]>([]);
  candidato = signal<Candidato>({} as Candidato);
  eleicao_selecionada = signal<Eleicao>({
    id: 2045202024,
    siglaUF: null,
    localidadeSgUe: null,
    ano: 2024,
    codigo: null,
    nomeEleicao: "Eleições Municipais 2024",
    tipoEleicao: "O",
    turno: null,
    tipoAbrangencia: "M",
    dataEleicao: "",
    codSituacaoEleicao: null,
    descricaoSituacaoEleicao: null,
    descricaoEleicao: "2024"
  });

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
