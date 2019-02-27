import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {UserService} from './shared/user.service';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from '../auth/shared/auth.guard';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../auth/shared/auth.service';
import {FormsModule} from '@angular/forms';



const routes: Routes = [
  {path: 'users',
    component: UserComponent,
    children: [
      {path: 'profile', canActivate: [AuthGuardService], component: UserDetailComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule
  ],
  declarations: [UserComponent, UserDetailComponent],
  providers: [
    UserService,
    AuthService
  ]
})
export class UserModule {
}

