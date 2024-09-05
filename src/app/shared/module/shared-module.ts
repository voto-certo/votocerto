import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatPipe } from '../utils/pipes/transforms/cnpj/format.pipe';
import { CaptalizePipe } from '../utils/pipes/transforms/palavras/captalize.pipe';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatFormField,
    MatInputModule,
    FormsModule, ReactiveFormsModule,
    FormatPipe,
    CaptalizePipe,
    DatePipe,
    CurrencyPipe,
    MatCardModule, MatDividerModule, MatTooltipModule,
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatCheckboxModule,
    MatToolbarModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatFormField,
    MatInputModule,
    FormsModule, ReactiveFormsModule,
    FormatPipe,
    CaptalizePipe,
    DatePipe,
    CurrencyPipe,
    MatCardModule, MatDividerModule, MatTooltipModule,
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatCheckboxModule,
    MatToolbarModule

  ]
})
export class SharedModule { }
