import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component'

import { AuthService } from './shared/auth.service';
import { AuthGuardService } from './shared/auth.guard';
import { TokenInterceptor } from './shared/token.interceptor';


const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [AuthGuardService]},
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuardService]}
];

@NgModule({
    declarations: [ 
        LoginComponent,
        RegisterComponent,
        AuthComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AuthService,
        AuthGuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})

export class AuthModule {

}