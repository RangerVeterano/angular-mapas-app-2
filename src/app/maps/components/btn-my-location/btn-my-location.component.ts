import { Component } from '@angular/core';
import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor(
    private ms: MapService,
    private ps: PlacesService
  ) { }

  goToMyLocation() {

    if (!this.ps.isUserLocationReady) {
      throw new Error("No hay ubicacion de usuario");
    }

    if (!this.ms.isMapReady) {
      throw new Error("No hay mapa disponible");
    }

    this.ms.flyTo(this.ps.userLocation!)
  }

}
