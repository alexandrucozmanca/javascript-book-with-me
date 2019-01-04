import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RentalService {

    private rentals: any[] = [{
        id: 1,
        title: "Central Apartment",
        city: "New York",
        street: "Times Sqaure",
        category: "apartment",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: false,
        createdAt: "04/01/2019"
      },
      {
        id: 2,
        title: "Central Apartment 2",
        city: "San Francisco",
        street: "Main street",
        category: "condo",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 2,
        description: "Very nice apartment",
        dailyRate: 12,
        shared: true,
        createdAt: "04/01/2019"
      },
      {
        id: 3,
        title: "Central Apartment 3",
        city: "Bratislava",
        street: "Hlavna",
        category: "condo",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 2,
        description: "Very nice apartment",
        dailyRate: 334,
        shared: true,
        createdAt: "04/01/2019"
      },
      {
        id: 4,
        title: "Central Apartment 4",
        city: "Berlin",
        street: "Haupt strasse",
        category: "house",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 9,
        description: "Very nice apartment",
        dailyRate: 33,
        shared: true,
        createdAt: "04/01/2019"
    }];

    public getRentals(): any {
      
      const rentalObservable = new Observable((observer) =>{
        setTimeout(() =>{
          
          observer.next(this.rentals);
        }, 1000);
        setTimeout(() =>{
          
          observer.error("I am error");
        }, 2000);
        setTimeout(() =>{
           
          observer.complete();
        }, 3000);
      }) ;
      
      
      return rentalObservable;
    }
}