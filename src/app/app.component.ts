import { Component, HostListener, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from './shared/componentes/nav-menu/nav-menu.component';
import { UtilService } from './shared/utils/services/util.service';
import { isPlatformBrowser } from '@angular/common';
import { LoadingComponent } from './shared/componentes/loading/loading.component';
import { SharedModule } from './shared/module/shared-module';
import { DialogType } from './shared/enums/dialog.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  title = 'vote_certo';

  constructor(private utilService: UtilService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const value = localStorage.getItem('acceptanceDateTime');
      if (value === null) this.utilService.openDialog(DialogType.Info);
    }
  }

}
