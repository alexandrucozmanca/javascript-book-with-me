import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';
@Component({
  selector: 'bwm-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit {

  rentalCategories = Rental.CATEGORIES;
  newRental: Rental;
  errors: any[] = [];
  constructor(
    private rentalService: RentalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }


  createRental() {
    this.errors = [];
    console.log(this.newRental);

    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rental) => {
        console.log(rental);
        this.router.navigate([`/rentals/${rental._id}`]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  handleImageChange() {
    this.newRental.image = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg";
  }
  
}
