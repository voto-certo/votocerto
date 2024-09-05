import { Component } from '@angular/core';
import { SharedModule } from '../../module/shared-module';
import { UtilService } from '../../utils/services/util.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { DialogType } from '../../enums/dialog.enum';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [SharedModule, MatToolbarModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  
  constructor(private utilService: UtilService, private router: Router) { }
  navigateToHome() {
    this.router.navigate(['/']);
  }

  openDialog() {
    this.utilService.openDialog(DialogType.Info);
  }

  
}
