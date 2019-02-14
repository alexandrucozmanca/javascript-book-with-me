
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService} from 'angular2-toaster';

import { Rental } from "../../rental/shared/rental.model";

import { RentalService } from "../../rental/shared/rental.service"

@Component({
  selector: 'bwm-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

  managedRentals: Rental [];
  rentalDeleteIndex: number;
  errors: any[] = [];


  constructor(
    private rentalService: RentalService,
    private toasterService: ToasterService
    ) {
      this.toasterService = toasterService;
    }

  ngOnInit() {
    this.getManagedBookings()
  }

  getManagedBookings() {
    // reset arrays
    this.errors = [];
    this.managedRentals = [];

    // get rentals if any
    this.rentalService.getManagedRentals().subscribe(
      (returnedRentals: Rental[]) =>{
        this.managedRentals = returnedRentals;
        console.log(this.managedRentals);
      },
      (errorResponse: HttpErrorResponse) =>{
        this.errors = errorResponse.error.errors;
      }
    );
  }

  deleteRental(){
    console.log(`Deleting rental index: ${this.rentalDeleteIndex}, id: ${this.managedRentals[this.rentalDeleteIndex]._id}`)
    this.rentalService.deleteRental(this.managedRentals[this.rentalDeleteIndex]._id).subscribe(
      (succces) => {
        this.managedRentals.splice(this.rentalDeleteIndex, 1);
        this.rentalDeleteIndex = undefined;
      },
      (errorResponse: HttpErrorResponse) => {
          this.errors = errorResponse.error.errors;
          let errorString = '';
          for (const error of this.errors) {
            errorString = errorString.concat(error.detail).concat(" ");
            console.log(errorString);
          }
          console.log(errorString);
          this.toasterService.pop('error', 'Unable to delete!', errorString);
      }
    );
  }

}
