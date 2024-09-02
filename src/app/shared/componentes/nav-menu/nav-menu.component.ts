import { Component } from '@angular/core';
import { SharedModule } from '../../module/shared-module';
import { UtilService } from '../../utils/services/util.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

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
    this.utilService.openInfoDialog();
  }

  
}
