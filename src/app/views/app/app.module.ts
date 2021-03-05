import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from 'src/shared/shared.module';
// import { AppRoutingModule } from 'src/app.routing';

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  declarations: [	AppComponent ]
})
export class AppModule { }
