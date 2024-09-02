import { Component, Output, EventEmitter, OnInit, Input, SimpleChanges, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { SedesService } from '../../services/sedes.service';

interface Marker {
  position: google.maps.LatLngLiteral;
  title: string;
  nombre?: string;
  description: string;
  telefono?: string;
  email?: string;
}


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit , AfterViewInit, OnChanges {
  
  @Input() selectedUbicacion: number = 0;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  selectedMarker?: Marker;

  marcadores: Marker[] = [];

 constructor(private sedesService: SedesService) { }


  center: google.maps.LatLngLiteral = { lat: -2.18, lng: -79.9 };
  zoom = 14;
  width = '100%';
  infowindow: google.maps.InfoWindow | undefined;
  map: google.maps.Map | undefined;
    service: google.maps.places.PlacesService | undefined;
    infoContent: string = '';
  markers: Marker[] = [];
  ngOnInit(): void {
     console.log('Selected ubicacion', this.selectedUbicacion);
    console.log('MapaComponent initialized');
  }
  ngAfterViewInit() {
    // Aquí puedes inicializar el mapa o cualquier otro componente que dependa del DOM
    setTimeout(() => this.initMap(), 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log('changes', changes['selectedUbicacion']);
    if (changes['selectedUbicacion'].currentValue !== changes['selectedUbicacion'].previousValue) {
      this.initMap();
    }
  }


  

  zoomToMarker(marker: any) {
    this.center = marker.position;
    this.zoom = 10; // Ajusta el nivel de zoom según sea necesario
    if (this.map) {
      this.map.panTo(marker.position);
    }
  }

  initMap(): void {
    this.getInfoSede(this.selectedUbicacion);
    console.log('Initializing map');
    const mapOptions: google.maps.MapOptions = {
      center: this.center,
      zoom: 9
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
    this.infowindow = new google.maps.InfoWindow();
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

  selectMarker(marker: any, mapMarker: MapMarker): void {
    console.log('Selected marker', marker);
    this.infoContent = `
      <div>
        <h3 class="text-black">${marker.title}</h3>
        <p class="text-black">${marker.description}</p>
        <p class="text-black">Teléfono: ${marker.telefono}</p>
        <p class="text-black">Email: ${marker.email}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${marker.position.lat},${marker.position.lng}" target="_blank">Ver más en Google Maps</a>
      </div>
    `;
    if (this.infoWindow) {
      this.infoWindow.open(mapMarker);
    } else {
      console.error('infoWindow is not defined');
    }
  }

  getInfoSede(idSede: number) {
    console.log('Getting info for sede', idSede);
    // Aquí puedes navegar a la página de información de la sede
    this.sedesService.getSedeById(idSede).subscribe(sede => {
      console.log('Sede info', sede);
      this.marcadores = [];
      this.marcadores.push({
        position: { lat: Number(sede.latitud), lng: Number(sede.longitud) },
        title: sede.nombre,
        description: sede.ubicacion,
        telefono: sede.telefono,
        email: "novagym@gmail.com"
      });
      this.center = this.marcadores[0].position;
    });
  }
  
  
}
