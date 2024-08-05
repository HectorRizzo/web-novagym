import { Component, Output, EventEmitter, OnInit } from '@angular/core';

interface Marker {
  position: google.maps.LatLngLiteral;
  title: string;
  description: string;
  telefono?: string;
  email?: string;
}


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
    selectedMarker?: Marker;


    constructor() { }


  center: google.maps.LatLngLiteral = { lat: -2.18, lng: -79.9 };
  zoom = 9;
  width = '100%';
  infowindow: google.maps.InfoWindow | undefined;
  map: google.maps.Map | undefined;
    service: google.maps.places.PlacesService | undefined;

  markers: Marker[] = [
    { position: { lat:-2.1867352190473524, lng:-79.89419700000002}, title: 'NOVA GYM Sede Centro', description: 'Los Ríos, Guayaquil 090514', telefono: '(04)2282004', email:'infonovagym@gmail.com'},
    { position: {lat:-2.1404472348899484, lng:-79.89800086216792 }, title: 'NOVA GYM Sede Norte', description: 'Plaza Mayor, Av. Rodolfo Baquerizo Nazur 1, Guayaquil 090501', telefono: '(04)4601585', email:'infonovagym@gmail.com'},
    { position: { lat:-2.2287332455145514, lng:-79.8974067333309 }, title: 'NOVA GYM Sede Sur', description: 'Av. 25 de Julio, Guayaquil 090102', telefono: '(04)4601585', email:'infonovagym@gmail.com'},
    { position: { lat:-3.268450943850025, lng:-79.94717633332256 }, title: 'NOVA GYM Sede Machala', description: 'Primero de Mayo y Los Rios, Machala, Ecuador', telefono: '(04)4601585', email:'infonovagym@gmail.com'},

    // Agrega más marcadores aquí
  ];
  ngOnInit(): void {
    console.log('MapaComponent initialized');
    setTimeout(() => this.initMap(), 1000);
  }

  zoomToMarker(marker: any) {
    this.center = marker.position;
    this.zoom = 15; // Ajusta el nivel de zoom según sea necesario
    if (this.map) {
      this.map.panTo(marker.position);
    }
  }

  selectMarker(marker: Marker) {
    console.log('Marker selected', marker);
    this.selectedMarker = marker;
  }

  initMap(): void {
    console.log('Initializing map');
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -2.1, lng: -79.8 }, // Ajusta la posición inicial del mapa
      zoom: 4
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
    this.infowindow = new google.maps.InfoWindow();
    // Ejemplo de lugares para crear marcadores
    const places = [
      { name: 'Sede Centro', geometry: { location: new google.maps.LatLng(-2.1867352190473524,-79.89419700000002) } },
      { name: 'Sede Norte', geometry: { location: new google.maps.LatLng(-2.1404472348899484, -79.89800086216792) } },
      { name: 'Sede Sur', geometry: { location: new google.maps.LatLng(-2.2287332455145514, -79.8974067333309) } }

    ];
    console.log('Creating markers for places', places);
    places.forEach(place => this.createMarker(place));
  }

  createMarker(place: { name?: string; geometry: { location: google.maps.LatLng } }): void {
    console.log('Creating marker for place', place);
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });

    marker.addListener('click', () => {
      this.infowindow!.setContent(place.name || "");
      this.infowindow!.open(this.map!, marker);
    });
  }
  
  
}
