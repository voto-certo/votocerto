import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/module/shared-module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavMenuComponent } from './shared/componentes/nav-menu/nav-menu.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vote_certo';
}
