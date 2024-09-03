import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatPipe } from '../utils/pipes/transforms/cnpj/format.pipe';
import { CaptalizePipe } from '../utils/pipes/transforms/palavras/captalize.pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    FormsModule, ReactiveFormsModule,
    FormatPipe,
    CaptalizePipe,
    DatePipe,
    CurrencyPipe
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    FormsModule, ReactiveFormsModule,
    FormatPipe,
    CaptalizePipe,
    DatePipe,
    CurrencyPipe
  ]
})
export class SharedModule { }
