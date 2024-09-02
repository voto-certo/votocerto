import { Component } from '@angular/core';
import { SharedModule } from '../../module/shared-module';
import { UtilService } from '../../services/util.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [SharedModule, MatToolbarModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  
  constructor(private utilService: UtilService) { }
  openDialog() {
    this.utilService.openInfoDialog();
  }
}
