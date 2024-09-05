import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../../componentes/info-modal/info-modal.component';
import { DialogType } from '../../enums/dialog.enum';
import { ErroDialogComponent } from '../../componentes/erro-dialog/erro-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private dialog: MatDialog) { }

  openDialog(dialogType: DialogType): void {
    if (dialogType === DialogType.Error) {
      this.dialog.open(ErroDialogComponent, {
        // Additional data can be passed if needed
      });
    } else if (dialogType === DialogType.Info) {
      this.dialog.open(InfoModalComponent, {
        // Additional data can be passed if needed
      });
    }
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }  
}
