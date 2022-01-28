import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent implements OnInit {


  //inyectamos nuestro servicio de lugares
  constructor(private ps: PlacesService) { }

  get isUserLocationReady() {
    return this.ps.isUserLocationReady;
  }

  ngOnInit(): void {
  }

}
