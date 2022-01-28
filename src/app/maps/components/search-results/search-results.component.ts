import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public selectedId: string = '';

  constructor(private ps: PlacesService, private ms: MapService) { }

  ngOnInit(): void {
  }

  get isLoadingPlaces() {
    return this.ps.isLoadingPlaces
  }

  get places() {
    return this.ps.places
  }

  flyTo(place: Feature) {

    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.ms.flyTo([lng, lat])
  }

  getDirections(lugar: Feature) {

    if (!this.ps.userLocation) throw new Error("No hay user location");

    this.ps.deletePlaces()

    const start = this.ps.userLocation;
    const end = lugar.center as [number, number];

    this.ms.getRouteBetweenPoints(start, end)
  }
}
