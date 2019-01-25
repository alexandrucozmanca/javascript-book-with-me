import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';
import { ToasterModule } from 'angular2-toaster';

import { ManageComponent } from "./manage.component";
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component'
import { ManageRentalBookingComponent } from './manage-rental/manage-rental-booking/manage-rental-booking.component'

import { AuthGuardService } from '../auth/shared/auth.guard';
import { RentalService } from '../rental/shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';


const routes: Routes = [
    {path: 'manage', 
     component: ManageComponent,
     children: [
         {path:'rentals', component: ManageRentalComponent, canActivate: [AuthGuardService]},
         {path:'bookings', component: ManageBookingComponent, canActivate: [AuthGuardService]},
        ]
    }
  ]

@NgModule({
    declarations: [ 
       ManageComponent,
       ManageRentalComponent,
       ManageBookingComponent,
       ManageRentalBookingComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgPipesModule,
        ToasterModule.forRoot()
    ],
    providers: [
        AuthGuardService,
        RentalService,
        BookingService
    ]
})

export class ManageModule {

}