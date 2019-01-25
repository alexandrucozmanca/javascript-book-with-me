import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Booking } from "../../booking/shared/booking.model";

import { BookingService } from "../../booking/shared/booking.service"

@Component({
  selector: 'bwm-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  
  managedBookings: Booking [] = [];
  errors: any[] = [];

  constructor(
    private bookingService: BookingService,
    ) { }

  ngOnInit() {
    this.getManagedBookings()
}
  getManagedBookings(){
    // reset arrays
    this.errors = [];
    this.managedBookings;

    // get rentals if any
    this.bookingService.getManagedBookings().subscribe(
      (returnedBookings: Booking[]) =>{
        this.managedBookings = returnedBookings;
      },
      (errorResponse: HttpErrorResponse) =>{
          this.errors = errorResponse.error.errors;
      }
    );
  }
}
