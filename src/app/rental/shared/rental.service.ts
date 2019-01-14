import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

import { Rental } from './rental.model';

@Injectable()
export class RentalService {

  constructor (
    private httpClient: HttpClient
  ) {}

  public getRentals(): Observable<Rental[]> {
    
    return <Observable<Rental[]>> this.httpClient.get('/api/v1/rentals');
  }

  public getRentalById(rentalId: string): Observable<Rental> { 
    return <Observable<Rental>> this.httpClient.get(`/api/v1/rentals/${rentalId}`);
  }

  public getRentalsByCity(city: string): Observable<Rental[]> {
    return <Observable<Rental[]>> this.httpClient.get(`api/v1/rentals?city=${city}`);
  }

  public createRental(rental: Rental): Observable<any> {
    return <Observable<any>> this.httpClient.post('api/v1/rentals', rental);
  }
}