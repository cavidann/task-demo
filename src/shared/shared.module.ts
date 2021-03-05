import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/views/error/error.component';
import { HeaderComponent } from 'src/app/views/layout/header/header.component';

@NgModule({
  declarations: [
    ErrorComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ErrorComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
