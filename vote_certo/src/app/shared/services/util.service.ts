import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../componentes/info-modal/info-modal.component';

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

  // Função genérica para armazenar um valor no localStorage
  setItem<T>(key: string, value: T): void {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }

  // Função genérica para buscar um valor do localStorage
  getItem<T>(key: string): T | null {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue) {
      return JSON.parse(serializedValue) as T;
    }
    return null;
  }
}
