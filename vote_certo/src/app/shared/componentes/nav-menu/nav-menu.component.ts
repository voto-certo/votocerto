import { Component } from '@angular/core';
import { SharedModule } from '../../module/shared-module';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  opened = true;

  togglenav() {
    this.opened = !this.opened;
  }
}
