import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPaginationComponent } from './custom-pagination.component';
import { PaginationConfig, PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
  ],
  declarations: [CustomPaginationComponent],
  exports: [
    CustomPaginationComponent
  ]
})
export class CustomPaginationModule { }
