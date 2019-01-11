import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular2-toaster';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalModule} from './rental/rental.module';
import { AuthModule} from './auth/auth.module';

const routes: Routes = [
  {path: '', redirectTo: '/rentals', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    RentalModule,
    AuthModule,
    NgbModule.forRoot(),    
    BrowserAnimationsModule,
    ToasterModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
