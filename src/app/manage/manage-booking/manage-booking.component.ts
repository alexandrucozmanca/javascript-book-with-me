import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Booking } from '../../booking/shared/booking.model';

import { BookingService } from '../../booking/shared/booking.service';
import {PaymentService} from '../../payment/shared/payment.service';


@Component({
  selector: 'bwm-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {
  managedBookings: Booking [] = [];
  errors: any[] = [];
  payments: any [] = [];

  constructor(
    private bookingService: BookingService,
    private paymentService: PaymentService
    ) { }

  ngOnInit() {
    this.getManagedBookings();
}
  getManagedBookings() {
    // reset arrays
    this.errors = [];

    // get rentals if any
    this.bookingService.getManagedBookings().subscribe(
      (returnedBookings: Booking[]) => {
        this.managedBookings = returnedBookings;
      },
      (errorResponse: HttpErrorResponse) => {
          this.errors = errorResponse.error.errors;
      }
    );
    this.getPendingPayments();
  }

  getPendingPayments() {
    this.paymentService.getPendingPayments().subscribe(
      (foundPayments: any) => {
        this.payments = foundPayments;
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  acceptPayment(payment) {
    this.paymentService.acceptPayment(payment).subscribe(
      (foundPayment: any) => {
        payment.status = 'paid';
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  declinePayment(payment) {
    this.paymentService.declinePayment(payment).subscribe(
      (foundPayment: any) => {
        payment.status = 'declined';
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
