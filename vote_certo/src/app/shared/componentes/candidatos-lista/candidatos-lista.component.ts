import { Component, effect, signal } from '@angular/core';
import { SharedModule } from '../../module/shared-module';
import { TseService } from '../../../core/services/tse.service';
import { Estado, EstadosResponse } from '../../../core/models/Estado';
import { Municipio, MunicipioResponse } from '../../../core/models/Municipio';
import { Cargo } from '../../../core/models/Cargo';
import { CandidatoResumo, CandidatosResponse } from '../../../core/models/Candidato';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-candidatos-lista',
  standalone: true,
  imports: [SharedModule, MatFormFieldModule,
    MatSelectModule,
    MatListModule],
  templateUrl: './candidatos-lista.component.html',
  styleUrl: './candidatos-lista.component.scss'
})
export class CandidatosListaComponent {

  selectedMunicipio = signal<string>("")
  selectedEstado = signal<string>("");
  selectedCargo = signal<string>("");

  estados: Estado[] = [];
  municipios: Municipio[] = [];
  candidatos: CandidatoResumo[] = [];

  // 11 - prefeito
  // 12 - vice
  // 13 - vereador
  cargos: Cargo[] = [
    {
      nome: "Prefeito",
      valor: "11",
    },
    {
      nome: "Vice-Prefeito",
      valor: "12",
    },
    {
      nome: "Vereador",
      valor: "13",
    }
  ]


  constructor(private tseService: TseService) {
    this.buscarEstados();
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
        response.ues.map(ue => ue.nome !== 'BRASIL');
        this.estados = response.ues.filter(item => item.nome !== 'BRASIL');
      },
      error: (error) => {
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
      error: (error) => {
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
        this.candidatos = response.candidatos;
        console.log('candidatos: ', this.candidatos);
      },
      error: (error) => {
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

  detalhesCandidato(candidato: CandidatoResumo): void {
    console.log(`chamar detalhe candidato`, candidato);
  }
  
}
