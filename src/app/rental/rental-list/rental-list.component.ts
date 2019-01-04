import { Component, OnInit } from '@angular/core';

import { RentalService } from '../shared/rental.service';

@Component({
  selector: 'bwn-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {

  rentals: any[] = [];

  restVariable: string = "1";
  testNumber: number = 2;

  constructor(private rentalService: RentalService) {   
  
  }

  ngOnInit() {
    const rentalObservable = this.rentalService.getRentals();
    
    rentalObservable.subscribe(
      (rentals) =>{
        
        this.rentals = rentals;
      },
      (err) =>{
        
      },
      () =>{
        
      }
    )
  }

}
