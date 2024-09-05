import { Component } from '@angular/core';
import { SharedModule } from '../../module/shared-module';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-erro-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './erro-dialog.component.html',
  styleUrl: './erro-dialog.component.scss'
})
export class ErroDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ErroDialogComponent>,
    private router: Router
  ) { }

  onBackToHome(): void {
    this.dialogRef.close();
    this.router.navigate(['/']); // Redireciona para a home page
  }
}
