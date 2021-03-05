import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsComponent } from './views.component';
import { ViewRoutingModule } from './views.routing';
import { SharedModule } from 'src/shared/shared.module';
import { PaginationConfig } from 'ngx-bootstrap/pagination';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ɵs } from '@ng-select/ng-select';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ViewRoutingModule,
  ],
  declarations: [ViewsComponent],
  providers:[PaginationConfig,BsDropdownConfig,NgSelectConfig,ɵs,BsDatepickerConfig]
})
export class ViewsModule { }
