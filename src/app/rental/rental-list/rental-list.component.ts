import { Component, OnInit } from '@angular/core';

import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'bwn-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {

  rentals: Rental[] = [];

  restVariable: string = "1";
  testNumber: number = 2;

  constructor(private rentalService: RentalService) {   
  
  }

  ngOnInit() {
    const rentalObservable = this.rentalService.getRentals();
    
    rentalObservable.subscribe(
      (rentals: Rental[]) =>{
        this.rentals = rentals;
      },
      (err) =>{
        
      },
      () =>{
        
      }
    )
  }

}
