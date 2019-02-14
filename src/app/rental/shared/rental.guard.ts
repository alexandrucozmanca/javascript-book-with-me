import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RentalService } from './rental.service';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class RentalGuardService implements CanActivate {
  constructor(
    private rentalService: RentalService,
    public router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const rentalId: string = route.params.rentalId;

    return this.rentalService.verifyRentalUser(rentalId).map(() => {
        return true;
      }).catch(() => {
      this.router.navigate(['/rentals']);
      return of(false);
    });
  }
}
