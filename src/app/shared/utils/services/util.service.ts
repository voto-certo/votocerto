import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../componentes/info-modal/info-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private dialog: MatDialog) { }

  openInfoDialog(): void {
    this.dialog.open(InfoModalComponent);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }  
}
