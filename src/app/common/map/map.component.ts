import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { MapService} from './map.service';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() location: string;
  lat: number = 0;
  lng: number = 0;

  isPositionError: boolean = false;

  constructor(
    private mapService: MapService,
    private changeDetectorRef: ChangeDetectorRef
    ) {}

  ngOnInit() {
  }

  mapReadyHandler(){
    this.mapService.getGeoLocation(this.location).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;

        this.isPositionError = false;
        console.log(this.lat, this.lng);

        this.changeDetectorRef.detectChanges();
      }, () =>{
        this.isPositionError = true;
        console.log('Error getting coords from GeoServer');
        this.changeDetectorRef.detectChanges();
      }
    );
  }
}