import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';



@Component({
  selector: 'bwm-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.css']
})
export class RentalSearchComponent implements OnInit {

  city: string;
  searchRentals: Rental [] = [];
  errors: any[] = [];

  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.city = (params.get('city'));
        this.getRentalsBySearch(this.city);
        console.log(`Getting rentals for city: ${this.city}`);
      });

}
  getRentalsBySearch(city: string){
    // reset arrays
    this.errors = [];
    this.searchRentals = [];

    // get rentals if any
    this.rentalService.getRentalsByCity(city).subscribe(
      (rentals: Rental[]) =>{
        this.searchRentals = rentals;
        console.log(this.searchRentals);
      },
      (errorResponse: HttpErrorResponse) =>{
          this.errors = errorResponse.error.errors;
      }
    );
  }
}