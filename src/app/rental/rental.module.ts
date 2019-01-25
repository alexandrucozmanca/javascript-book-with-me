import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToasterModule } from 'angular2-toaster';
import { Daterangepicker } from 'ng2-daterangepicker';
import { NgPipesModule } from 'ngx-pipes';

import { MapModule } from '../common/map/map.module';

import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';


import { AuthGuardService } from '../auth/shared/auth.guard';
import { RentalService } from './shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { HelperService } from "../common/service/helper.service";
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component'

const routes: Routes = [
    {path: 'rentals', 
     component: RentalComponent,
     children: [
         {path:'', component: RentalListComponent},
         {path:'new', component: RentalCreateComponent, canActivate: [AuthGuardService]},         
         {path:':rentalId', component: RentalDetailComponent},
         {path:':city/homes', component: RentalSearchComponent},
        ]
    }
  ]

@NgModule({
    declarations: [ 
        RentalListComponent,
        RentalListItemComponent,
        RentalComponent,
        RentalDetailComponent,
        RentalDetailBookingComponent,
        RentalSearchComponent,
        RentalCreateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker,
        ToasterModule.forRoot()
    ],
    providers: [
        RentalService,
        HelperService,
        BookingService
    ]
})

export class RentalModule {

}