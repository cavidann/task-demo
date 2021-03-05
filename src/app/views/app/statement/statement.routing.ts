import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatementListComponent } from './statement-list/statement-list.component';
import { StatementComponent } from './statement.component';

const routes: Routes = [
  {
    path: '',
    component: StatementComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'statement-list/1' },
      { path: 'statement-list/:id', component: StatementListComponent },
      // { path: 'blog-detail/:slug', component: BlogDetailComponent },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementRoutingModule { }
