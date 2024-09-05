import { Component, effect, OnInit } from '@angular/core';
import { TseService } from '../../core/services/tse/tse.service';
import { UseStatesService } from '../../core/services/states/use-states.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidato, CandidatoDetalheRequest, EleicaoAnterior, Vice } from '../../core/models/Candidato';
import { SharedModule } from '../../shared/module/shared-module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { UtilService } from '../../shared/utils/services/util.service';
import { DialogType } from '../../shared/enums/dialog.enum';

@Component({
  selector: 'app-candidato',
  standalone: true,
  imports: [SharedModule, MatGridListModule, MatExpansionModule],
  templateUrl: './candidato.component.html',
  styleUrl: './candidato.component.scss'
})
export class CandidatoComponent implements OnInit {

  candidato: Candidato = {} as Candidato;
  id_eleicao = '2045202024';
  ano_eleicao = '2024';

  constructor(private tseService: TseService, private useStatesService: UseStatesService, private route: ActivatedRoute, private router: Router, private utilService: UtilService) {

  }

  ngOnInit(): void {
    const idCandidato = this.route.snapshot.paramMap.get('id_candidato');
    const idCidade = this.route.snapshot.paramMap.get('id_cidade');
    if (!idCandidato || !idCidade) {
      this.router.navigate(['/']);

      throw new Error('ID da cidade ou do candidato não encontrado na rota');
    }

    this.detalhesDoCandidato({ano_eleicao: this.ano_eleicao, id_eleicao: this.id_eleicao, codigo_cidade: idCidade, id_candidato: idCandidato});

  }


  detalhesDoCandidato(candidatoDetalheRequest: CandidatoDetalheRequest): void {

    this.tseService.getCandidatoDetalhe({ano_eleicao: candidatoDetalheRequest.ano_eleicao, id_eleicao: candidatoDetalheRequest.id_eleicao, codigo_cidade: candidatoDetalheRequest.codigo_cidade, id_candidato: candidatoDetalheRequest.id_candidato }).subscribe({
      next: (response: Candidato) => {
        this.useStatesService.candidato.set(response);
        this.candidato = this.useStatesService.candidato();
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

  visualizarViceCandidato(vice: Vice): void {
    this.detalhesDoCandidato({ ano_eleicao: this.ano_eleicao, id_eleicao: this.id_eleicao, codigo_cidade: vice.sg_UE, id_candidato: vice.sq_CANDIDATO.toString() });
  }

  visualizarCandidaturaRetroativa(eleicaoAnterior: EleicaoAnterior): void {
    console.log(`Consultar eleição anterior: `, eleicaoAnterior);
    this.detalhesDoCandidato({ano_eleicao: eleicaoAnterior.nrAno.toString(), codigo_cidade: eleicaoAnterior.sgUe, id_candidato: eleicaoAnterior.id, id_eleicao: eleicaoAnterior.idEleicao});
  }

  buscarIcone(site: string): string {
    if (site.includes('instagram')) {
      return 'link'; // Substitua com o nome do ícone do Instagram em sua biblioteca de ícones
    } else if (site.includes('facebook')) {
      return 'facebook'; // Substitua com o nome do ícone do Facebook em sua biblioteca de ícones
    } else if (site.includes('tiktok')) {
      return 'tiktok'; // Substitua com o nome do ícone do TikTok em sua biblioteca de ícones
    } else {
      return 'link'; // Substitua com o nome do ícone de link padrão em sua biblioteca de ícones
    }
  }

}
