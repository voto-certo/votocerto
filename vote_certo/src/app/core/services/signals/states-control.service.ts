import { effect, Injectable, signal } from '@angular/core';
import { TseService } from '../tse/tse.service';
import { LocalStorageService } from '../storage/local-storage.service';
import { EstadosResponse } from '../../models/Estado';
import { MunicipioResponse } from '../../models/Municipio';
import { CandidatosRequest, CandidatosResponse } from '../../models/Candidato';

@Injectable({
  providedIn: 'root'
})
export class StatesControlService {

  estados = signal<EstadosResponse>({ ues: [] });
  municipios = signal<MunicipioResponse>({ municipios: [], sigla: '' });
  candidatos = signal<CandidatosResponse>({ candidatos: [] });

  private estadosLoaded = false;
  private municipiosLoaded = false;
  private candidatosLoaded = false;

  constructor(
    private tseService: TseService,
    private localStorageService: LocalStorageService
  ) {
    // Efeito para carregar estados
    effect(() => {
      if (!this.estadosLoaded) {
        this.loadEstados();
      }
    }, { allowSignalWrites: true });

    // Efeito para carregar municípios
    effect(() => {
      if (!this.municipiosLoaded && this.municipios().sigla) {
        this.loadMunicipios(this.municipios().sigla);
      }
    }, { allowSignalWrites: true });

    // Efeito para carregar candidatos
    // effect(() => {
    //   const request = this.candidatos()?.request;
    //   if (!this.candidatosLoaded && request) {
    //     this.loadCandidatos(request);
    //   }
    // }, { allowSignalWrites: true });
  }

  private loadEstados() {
    const cachedEstados = this.localStorageService.getItem<EstadosResponse>('estados');
    if (cachedEstados) {
      console.log('antes: ', this.estados());
      this.estados.set(cachedEstados);
      console.log('depois: ', this.estados());

    } else {
      this.tseService.getEstadosEleitorais().subscribe(data => {
        data.ues = data.ues.filter(item => item.nome !== 'BRASIL');
        this.estados.set(data);
        this.localStorageService.setItem('estados', data);
      });
    }
    this.estadosLoaded = true;  // Previne carregamento múltiplo
  }

  private loadMunicipios(sigla: string) {
    const cachedMunicipios = this.localStorageService.getItem<MunicipioResponse>(`municipios-${sigla}`);
    if (cachedMunicipios) {
      console.log('antes: ', this.municipios());
      this.municipios.set(cachedMunicipios);
      console.log('depois: ', this.municipios());
    } else {
      this.tseService.getMunicipiosDoEstado(sigla).subscribe(data => {
        this.municipios.set(data);
        this.localStorageService.setItem(`municipios-${sigla}`, data);
      });
    }
    this.municipiosLoaded = true;  // Previne carregamento múltiplo
  }

  // private loadCandidatos(request: CandidatosRequest) {
  //   const cachedCandidatos = this.localStorageService.getItem<CandidatosResponse>(`candidatos-${request.codigo_cidade}-${request.codigo_cargo}`);
  //   if (cachedCandidatos) {
  //     this.candidatos.set(cachedCandidatos);
  //   } else {
  //     this.tseService.getCandidatos(request).subscribe(data => {
  //       this.candidatos.set(data);
  //       this.localStorageService.setItem(`candidatos-${request.codigo_cidade}-${request.codigo_cargo}`, data);
  //     });
  //   }
  //   this.candidatosLoaded = true;  // Previne carregamento múltiplo
  // }

  // Métodos para atualizar os requests e disparar os effects
  updateMunicipios(sigla: string) {
    this.municipiosLoaded = false; // Permite o recarregamento
    this.municipios.set({ sigla, municipios: [] });
  }

  // updateCandidatos(req: CandidatosRequest) {
  //   this.candidatosLoaded = false; // Permite o recarregamento
  //   this.candidatos.set({ request: req, candidatos: [] });
  // }

}
