import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api/placesApiClients';
import { Feature, PlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation: [number, number] | undefined = undefined;
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = []

  get isUserLocationReady(): boolean {

    //Cuando no haya valor y esté negado, es algo raro, no lo entiendo
    //Pero si existe va a ser true
    return !!this.userLocation;
  }
  constructor(
    private placesApi: PlacesApiClient,
    private ms: MapService
  ) {

    this.getUserLocation()
  }

  //Metodo para conseguir la localizacion del usuario
  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalizacion')
          console.log(err);
          reject()
        }
      );
    });
  }

  getPlacesByQuery(query: string) {

    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;

    }

    if (!this.userLocation) {
      throw new Error("No hay user location");

    }

    this.isLoadingPlaces = true;
    //evaluar cundo la query esté vacia
    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
      .subscribe(resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.ms.createMarkersFromPlaces(this.places, this.userLocation!)
      })
  }

  deletePlaces() {
    this.places = [];
  }
}
