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
import { UtilService } from '../../utils/services/util.service';
import { DialogType } from '../../enums/dialog.enum';

@Component({
  selector: 'app-candidatos-filtro',
  standalone: true,
  imports: [SharedModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './candidatos-filtro.component.html',
  styleUrl: './candidatos-filtro.component.scss'
})
export class CandidatosFiltroComponent {
  id_eleicao = '2045202024';
  ano_eleicao = '2024';

  estados: Estado[] = [];
  municipios: Municipio[] = [];
  cargos: Cargo[] = [];



  constructor(private tseService: TseService, private useStatesService: UseStatesService, private utilService: UtilService) {
    this.buscarEstados();
    this.cargos = tseService.getCargos();
  }

  private buscarEstados(): void {
    this.tseService.getEstadosEleitorais(this.id_eleicao).subscribe({
      next: (response: EstadosResponse) => {
        response.ues.map((ue: { nome: string; }) => ue.nome !== 'BRASIL');
        this.estados = response.ues.filter((item: { nome: string; }) => item.nome !== 'BRASIL');
      },
      error: (error: any) => {
        this.utilService.openDialog(DialogType.Error);
        console.error('Erro na requisição:', error);
      },
      complete: () => {
        console.info('Requisição completa');
      }
    });
  }

  private buscarMunicipios(): void {
    this.tseService.getMunicipiosDoEstado({ id_eleicao: this.id_eleicao, sigla: this.useStatesService.selectedEstado()}).subscribe({
      next: (response: MunicipioResponse) => {
        this.municipios = response.municipios;
      },
      error: (error: any) => {
        this.utilService.openDialog(DialogType.Error);
        console.error('Erro na requisição:', error);
      },
      complete: () => {
        console.info('Requisição completa');
      }
    });
  }

  private buscarCandidatos(): void {
    this.tseService.getCandidatos({ano_eleicao: this.ano_eleicao, id_eleicao: this.id_eleicao, codigo_cargo: this.useStatesService.selectedCargo(), codigo_cidade: this.useStatesService.selectedMunicipio() }).subscribe({
      next: (response: CandidatosResponse) => {
        this.useStatesService.candidatos.set(response.candidatos.sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto)));
      },
      error: (error: any) => {
        console.error('Erro na requisição:', error);
        this.utilService.openDialog(DialogType.Error);
      },
      complete: () => {
        console.info('Requisição completa');
      }
    });
  }

  onEstadoChange(sigla: string): void {
    this.useStatesService.selectedEstado.set(sigla);

    this.buscarMunicipios();
  }

  onMunicipioChange(municipio: Municipio): void {
    this.useStatesService.selectedMunicipio.set(municipio.codigo);

    if (this.useStatesService.selectedCargo() !== "") this.buscarCandidatos();
  }

  onCargosChange(valor: string): void {
    this.useStatesService.selectedCargo.set(valor);

    if (this.useStatesService.selectedMunicipio() !== "") this.buscarCandidatos();
  }
}
