import { Component, effect, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../module/shared-module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Municipio, MunicipioResponse } from '../../../core/models/Municipio';
import { CandidatoResumo, CandidatosResponse } from '../../../core/models/Candidato';
import { Estado, EstadosResponse } from '../../../core/models/Estado';
import { TseService } from '../../../core/services/tse/tse.service';
import { Cargo } from '../../../core/models/Cargo';
import { UseStatesService } from '../../../core/services/states/use-states.service';

@Component({
  selector: 'app-candidatos-filtro',
  standalone: true,
  imports: [SharedModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './candidatos-filtro.component.html',
  styleUrl: './candidatos-filtro.component.scss'
})
export class CandidatosFiltroComponent {

  selectedMunicipio = signal<string>("")
  selectedEstado = signal<string>("");
  selectedCargo = signal<string>("");

  estados: Estado[] = [];
  municipios: Municipio[] = [];
  cargos: Cargo[] = [];


  constructor(private tseService: TseService, private useStatesService: UseStatesService) {
    this.buscarEstados();
    this.cargos = tseService.getCargos();
    this.signalBeacon();
  }

  private signalBeacon(): void {
    effect(() => {
      if (this.selectedEstado() !== '') {
        console.log('O valor ESTADO foi alterado:', this.selectedEstado());
      }
      if (this.selectedMunicipio() !== '') {
        console.log('O valor MUNICIPIO foi alterado:', this.selectedMunicipio());
      }
      if (this.selectedCargo() !== '') {
        console.log('O valor CARGO foi alterado:', this.selectedCargo());
      }
    });
  }

  private buscarEstados(): void {
    this.tseService.getEstadosEleitorais().subscribe({
      next: (response: EstadosResponse) => {
        response.ues.map((ue: { nome: string; }) => ue.nome !== 'BRASIL');
        this.estados = response.ues.filter((item: { nome: string; }) => item.nome !== 'BRASIL');
      },
      error: (error: any) => {
        console.error('Erro na requisição:', error);
      },
      complete: () => {
        console.info('Requisição completa');
      }
    });
  }

  private buscarMunicipios(): void {
    this.tseService.getMunicipiosDoEstado(this.selectedEstado()).subscribe({
      next: (response: MunicipioResponse) => {
        this.municipios = response.municipios;
      },
      error: (error: any) => {
        console.error('Erro na requisição:', error);
      },
      complete: () => {
        console.info('Requisição completa');
      }
    });
  }

  private buscarCandidatos(): void {
    this.tseService.getCandidatos({ codigo_cargo: this.selectedCargo(), codigo_cidade: this.selectedMunicipio() }).subscribe({
      next: (response: CandidatosResponse) => {
        this.useStatesService.candidatos.set(response.candidatos);
      },
      error: (error: any) => {
        console.error('Erro na requisição:', error);
      },
      complete: () => {
        console.info('Requisição completa');
      }
    });
  }

  onEstadoChange(sigla: string): void {
    this.selectedEstado.set(sigla);

    this.buscarMunicipios();
  }

  onMunicipioChange(municipio: Municipio): void {
    this.selectedMunicipio.set(municipio.codigo);

    if (this.selectedCargo() !== "") this.buscarCandidatos();
  }

  onCargosChange(valor: string): void {
    this.selectedCargo.set(valor);

    this.buscarCandidatos();
  }
}
