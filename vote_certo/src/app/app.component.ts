import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from './shared/componentes/nav-menu/nav-menu.component';
import { InfoModalComponent } from './shared/componentes/info-modal/info-modal.component';
import { UtilService } from './shared/services/util.service';
import { SharedModule } from './shared/module/shared-module';
import { isPlatformBrowser } from '@angular/common';
import { CandidatosListaComponent } from "./shared/componentes/candidatos-lista/candidatos-lista.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent, InfoModalComponent, SharedModule, CandidatosListaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'vote_certo';

  constructor(private utilService: UtilService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const value = localStorage.getItem('acceptanceDateTime');
      if (value === null) this.utilService.openInfoDialog();  
    }
  }

}
