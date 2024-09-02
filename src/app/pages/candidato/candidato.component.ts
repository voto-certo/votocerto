import { Component } from '@angular/core';
import { TseService } from '../../core/services/tse/tse.service';
import { UseStatesService } from '../../core/services/states/use-states.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidato } from '../../core/models/Candidato';

@Component({
  selector: 'app-candidato',
  standalone: true,
  imports: [],
  templateUrl: './candidato.component.html',
  styleUrl: './candidato.component.scss'
})
export class CandidatoComponent {

  /**
   *
   */
  constructor(private tseService: TseService, private useStatesService: UseStatesService, private route: ActivatedRoute, private router: Router) {
    const idCandidato = this.route.snapshot.paramMap.get('id_candidato');
    const idCidade = this.route.snapshot.paramMap.get('id_cidade');
    if (!idCandidato || !idCidade) {
      this.router.navigate(['/']);

      throw new Error('ID da cidade ou do candidato não encontrado na rota');
    }
    this.tseService.getCandidatoDetalhe({ codigo_cidade: idCidade, id_candidato: idCandidato }).subscribe({
      next: (response: Candidato) => {
        console.log(`Candidato detalhe: `, response);
      },
      error: (error: any) => {
        console.error('Erro na requisição:', error);
      },
      complete: () => {
        console.info('Requisição completa');
      }
    });
  }
}
