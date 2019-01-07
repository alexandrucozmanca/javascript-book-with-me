import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser'

import { CamelizePipe} from 'ngx-pipes';
import { MapComponent } from './map.component';
import { MapService } from './map.service'

@NgModule({
  declarations: [
    MapComponent
  ],
  exports:[
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDBSoduoTjdsdrT0_r-oRyjaddRwSAPKHc'
      }),
    CommonModule,
    BrowserModule

  ],
  providers: [
    MapService,
    CamelizePipe
  ]
})
export class MapModule { }
