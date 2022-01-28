import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoicmFuZ2VydmV0ZXJhbm8iLCJhIjoiY2t5c2p0cm10MG5mdjJ4czBzbDNtZWhneiJ9.1Yt-M7AVF6qpmGlUsG4S2Q';

const localizacion = navigator.geolocation; 

if (!localizacion) {
  alert("El navegador no soporta la geolocalizacion");
  throw new Error("El navegador no soporta la geolocalizacion");
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
