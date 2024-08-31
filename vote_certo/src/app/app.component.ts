import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/module/shared-module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavMenuComponent } from './shared/componentes/nav-menu/nav-menu.component';
import { InfoModalComponent } from './shared/componentes/info-modal/info-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from './shared/services/util.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent, InfoModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'vote_certo';

  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
    const value = localStorage.getItem('acceptanceDateTime');
    // Código para inicializar o componente
    if (value === null || value.trim() === '') this.utilService.openInfoDialog();  
  }

}
