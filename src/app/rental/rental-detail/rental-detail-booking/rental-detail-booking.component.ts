import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToasterService} from 'angular2-toaster';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Rental } from 'src/app/rental/shared/rental.model';
import { Booking } from 'src/app/booking/shared/booking.model';

import { HelperService } from '../../../common/service/helper.service';
import { BookingService } from 'src/app/booking/shared/booking.service';
import { RentalService } from '../../shared/rental.service';
import { AuthService } from '../../../auth/shared/auth.service';

import { DaterangePickerComponent } from 'ng2-daterangepicker';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() currentRental: Rental;
  @ViewChild(DaterangePickerComponent)
    private picker: DaterangePickerComponent;

  newBooking: Booking;
  modalReference: any;

  daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];
  testRental: any;

  options: any = {
    locale: { format: Booking.DATA_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    autoUpdateInput: false,
    isInvalidDate: this.checkForInvalidDates.bind(this),
  };

  constructor(
    private modalService: NgbModal,
    private helper: HelperService,
    private bookingService: BookingService,
    private rentalService: RentalService,
    private toasterService: ToasterService,
    public authService: AuthService
  ) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
    this.newBooking.guests = 1;
  }

  private async getBookedOutDates() {
    await this.updateCurentRental();
    this.bookedOutDates = [];
    const bookings: Booking[] = this.currentRental.bookings;
    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        this.bookedOutDates = this.bookedOutDates.concat(this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt));
      });
    }

    if (this.newBooking.startAt && this.newBooking.endAt) {
      this.bookedOutDates = this.bookedOutDates.concat(this.helper.getBookingRangeOfDates(this.newBooking.startAt, this.newBooking.endAt));
    }
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) ||
      date.diff(moment(), 'days') < 0;
  }

  private async updateCurentRental() {
    await this.rentalService.getRentalById(this.currentRental._id).map(
      receivedRental => {
        this.currentRental = receivedRental;
    })
    .toPromise()
    .catch(
      errorResponse => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  private resetDayPicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  public openConfirmModal(content) {
    this.errors = [];
    this.modalReference = this.modalService.open(content);
  }

  onPaymentConfirmed(paymentToken: any) {
    this.newBooking.paymentToken = paymentToken;
  }

  private async postBooking(booking) {
    await this.bookingService.postBooking(booking).map(
      async (receivedBooking) => {
        console.log(receivedBooking);
        await this.getBookedOutDates();
    })
    .toPromise()
    .catch(
      errorResponse => {
        this.errors = errorResponse.error.errors;
        throw errorResponse;
      }
    );
  }

  public async createBooking() {
    this.newBooking.rental = this.currentRental;
    try {
      await this.postBooking(this.newBooking);
      this.newBooking = new Booking();
      this.newBooking.guests = 1;
      this.modalReference.close();
      this.resetDayPicker();
      this.toasterService.pop('success', 'Successful Booking!',
        'Your booking has been sent, you can review or edit your booking in the Booking Section');
    } catch (errorResponse) {
      console.log(errorResponse);
      this.errors = errorResponse.error.errors;
    }
  }

  public selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = value.end.diff(value.start, 'days');
    this.newBooking.totalPrice = this.newBooking.days * this.currentRental.dailyRate;
  }

}
