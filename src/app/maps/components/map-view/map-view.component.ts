import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl'
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(
    private ps: PlacesService,
    private ms: MapService
  ) { }

  ngAfterViewInit(): void {

    if (!this.ps.userLocation) {
      throw new Error("No hay placesServices.userLocation");
    }

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.ps.userLocation, // starting position [lng, lat]
      zoom: 14 // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Aqui estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `);

    //creamos el marcador del mama
    //Le asignamos un color, lo ubicamos en unas coordenadas
    //Le añadimos un popup y por ultimo lo asignamos a un mapa
    new Marker({ color: 'red' })
      .setLngLat(this.ps.userLocation)
      .setPopup(popup)
      .addTo(map)

    this.ms.setMap(map)
  }

}
