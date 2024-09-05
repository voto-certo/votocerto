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
import { Eleicao } from '../../../core/models/Ordinaria';

@Component({
  selector: 'app-candidatos-filtro',
  standalone: true,
  imports: [SharedModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './candidatos-filtro.component.html',
  styleUrl: './candidatos-filtro.component.scss'
})
export class CandidatosFiltroComponent {
  estados: Estado[] = [];
  municipios: Municipio[] = [];
  cargos: Cargo[] = [];
  cargos_filtrados: Cargo[] = [];
  eleicoes: Eleicao[] = [];
  atual_eleicao: Eleicao = {} as Eleicao;


  constructor(private tseService: TseService, private useStatesService: UseStatesService, private utilService: UtilService) {
    this.buscarCargos();
    // this.buscarEleicoesOrdinarias();
    this.buscarEstados();
  }

  private buscarCargos(): void {
    this.cargos = this.tseService.getCargos();
    this.cargos_filtrados = this.cargos.filter(cargo => cargo.abrangencia === this.useStatesService.eleicao_selecionada().tipoAbrangencia);
  }

  private selecionarEleicaoAtual(): void {
    this.useStatesService.eleicao_selecionada.set(this.eleicoes.reduce((maisRecente, eleicaoAtual) => {
      return eleicaoAtual.ano > maisRecente.ano ? eleicaoAtual : maisRecente;
    }, this.eleicoes[0]));
    this.onAnoEleicaoChange(this.useStatesService.eleicao_selecionada());
  }

  private buscarEleicoesOrdinarias(): void {
    this.tseService.getEleicoes().subscribe({
      next: (eleicoes: Eleicao[]) => {
        console.log(eleicoes);
        this.eleicoes = eleicoes;
        this.selecionarEleicaoAtual();
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

  private buscarEstados(): void {
    this.tseService.getEstadosEleitorais(this.useStatesService.eleicao_selecionada().id).subscribe({
      next: (response: EstadosResponse) => {
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
    this.tseService.getMunicipiosDoEstado({ id_eleicao: this.useStatesService.eleicao_selecionada().id, sigla: this.useStatesService.selectedEstado()}).subscribe({
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
    this.tseService.getCandidatos({ ano_eleicao: this.useStatesService.eleicao_selecionada().ano, id_eleicao: this.useStatesService.eleicao_selecionada().id, codigo_cargo: this.useStatesService.selectedCargo(), codigo_cidade: this.useStatesService.selectedMunicipio() }).subscribe({
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

  onAnoEleicaoChange(eleicao: Eleicao): void {
    console.log(`Ano Eleição: `, eleicao);
    this.useStatesService.eleicao_selecionada.set(eleicao);
    this.cargos_filtrados = this.cargos.filter(cargo => cargo.abrangencia === eleicao.tipoAbrangencia);
  };


  onCargosChange(valor: string): void {
    this.useStatesService.selectedCargo.set(valor);

    if (this.useStatesService.selectedMunicipio() !== "") this.buscarCandidatos();
  }
}
