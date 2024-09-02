import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilPipe } from '../utils/pipes/util.pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    FormsModule, ReactiveFormsModule,
    UtilPipe
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    FormsModule, ReactiveFormsModule,
    UtilPipe
  ]
})
export class SharedModule { }
