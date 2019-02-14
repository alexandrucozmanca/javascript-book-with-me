import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs';
import { UcWordsPipe } from 'ngx-pipes';

@Component({
  selector: 'bwm-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {

  rentalCategories = Rental.CATEGORIES;
  public currentId: string;
  public currentRental: Rental;
  public errors = [];
  locationSubject: Subject<any> = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private toasterService: ToasterService,
    private upperCaseService: UcWordsPipe
  ) {
    this.stringToUpperCase = this.stringToUpperCase.bind(this);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.getRental(params.get('rentalId'));
        console.log(`Getting rental with id: ${params.get('rentalId')}`);
      });
  }

  stringToUpperCase(rawString: string) {
    return this.upperCaseService.transform(rawString);
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe (
      (rental: Rental) => {
        this.currentRental = rental;
      });
  }

  updateRental(rentalId: string, rentalData: any) {
    console.log(this.currentRental);
    this.rentalService.patchRentalById(rentalId, rentalData).subscribe(
      () => {
        if (rentalData.city || rentalData.street) {
          this.locationSubject.next(this.currentRental.city + ', ' + this.currentRental.street);
        }
        this.toasterService.pop('success', 'Successful edit', `Rental updated`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.getRental(this.currentRental._id);
        this.errors = [];
        this.errors = errorResponse.error.errors;
        this.toasterService.pop('error', 'Unable to edit', this.errors[0].detail);
      }
    );
  }
}
