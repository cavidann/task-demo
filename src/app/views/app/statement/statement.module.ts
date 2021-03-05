import { NgModule } from '@angular/core';
import { StatementComponent } from './statement.component';
import { StatementRoutingModule } from './statement.routing';
import { StatementListComponent } from './statement-list/statement-list.component';
import { SharedModule } from 'src/shared/shared.module';
import { CustomPaginationModule } from 'src/app/components/custom-pagination/custom-pagination.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    SharedModule,
    StatementRoutingModule,
    CustomPaginationModule,
    BsDropdownModule,
    ReactiveFormsModule,
    ModalModule,
    FormsModule,
    NgSelectModule,
    // BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    StatementComponent,
    StatementListComponent
  ]
})
export class StatementModule { }
