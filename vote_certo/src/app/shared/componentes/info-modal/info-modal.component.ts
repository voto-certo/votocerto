import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import { SharedModule } from '../../module/shared-module';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { UtilService } from '../../services/util.service';

// Registra o locale para português
registerLocaleData(localePt);

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [SharedModule, CommonModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' } // Define o locale como português do Brasil
  ],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss'
})
export class InfoModalComponent implements OnInit{
  isChecked: boolean = false;
  lastAcceptedDateTime: string | null = null;

  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    this.lastAcceptedDateTime = localStorage.getItem('acceptanceDateTime');
    console.log(`Last acepted: `, this.lastAcceptedDateTime);
  }

  onConfirm(): void {
    if (this.isChecked) {
      const currentDateTime = new Date().toISOString();
      localStorage.setItem('acceptanceDateTime', currentDateTime);
      this.utilService.closeDialog();
    }
  }

  onClose(): void {
    this.utilService.closeDialog();
  }

}
