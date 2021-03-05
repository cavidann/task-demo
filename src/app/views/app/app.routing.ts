import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ErrorComponent } from '../error/error.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
      path: '',
      component: AppComponent,
      children: [
          { path: '', pathMatch: 'full', redirectTo: 'statement' },
          { path: 'statement', loadChildren: () => import('./statement/statement.module').then(m => m.StatementModule) },
          // { path: '**', redirectTo: 'error' },
          // { path: 'not-found', component: ErrorComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }