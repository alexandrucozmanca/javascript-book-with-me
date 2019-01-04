import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RentalService } from '../shared/rental.service'; 
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

  public currentId: string;
  public currentRental: Rental;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService
    ) { 
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
    (params) => {
      this.getRental(params.get('rentalId'));
      console.log(`Getting rental with id: ${params.get('rentalId')}`);
    });
  }

  getRental(rentalId: string) {
   
    this.rentalService.getRentalById(rentalId).subscribe (
      (rental: Rental) => {
        this.currentRental = rental;
      });
  }

}
