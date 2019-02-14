import {Component, OnInit, Input, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';
import { MapService} from './map.service';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  @Input() location: string;
  @Input() locationSubject: Subject<any>;

  lat: number = 0;
  lng: number = 0;

  isPositionError: boolean = false;

  constructor(
    private mapService: MapService,
    private changeDetectorRef: ChangeDetectorRef
    ) {}

  ngOnInit() {
    if (this.locationSubject) {
      this.locationSubject.subscribe((location: string) => {
        this.getLocation(location);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.locationSubject) {
      this.locationSubject.unsubscribe();
    }
  }

  mapReadyHandler() {
    this.getLocation(this.location);
  }

  private getLocation(location) {
    this.mapService.getGeoLocation(location).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;

        this.isPositionError = false;
        console.log(this.lat, this.lng);

        this.changeDetectorRef.detectChanges();
      }, () => {
        this.isPositionError = true;
        console.log('Error getting coords from GeoServer');
        this.changeDetectorRef.detectChanges();
      }
    );
  }


}
