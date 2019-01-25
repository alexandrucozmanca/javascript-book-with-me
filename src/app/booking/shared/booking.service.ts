import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

import { Booking } from './booking.model';

@Injectable()
export class BookingService {

  constructor (
    private httpClient: HttpClient
  ) {}

  public postBooking(booking: Booking): Observable<any> {
    
    return this.httpClient.post('/api/v1/bookings', booking);
  }

  public getManagedBookings(): Observable<any> {
    return this.httpClient.get('/api/v1/bookings/manage');
  }

}