import { Component } from '@angular/core';
import { SharedModule } from '../../shared/module/shared-module';
import { CandidatosListaComponent } from '../../shared/componentes/candidatos-lista/candidatos-lista.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, CandidatosListaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
