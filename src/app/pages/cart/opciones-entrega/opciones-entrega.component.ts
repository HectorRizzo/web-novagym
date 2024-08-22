import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { SedesService } from "../../../services/sedes.service";
import { SedesDTO } from "../../../dto/sdedes.dto";
import { GoogleMap } from "@angular/google-maps";

@Component({
    selector: "app-opciones-entrega",
    templateUrl: "./opciones-entrega.component.html",
    styleUrls: ["./opciones-entrega.component.scss"],
    })

export class OpcionesEntregaComponent implements AfterViewInit, OnInit{
    sedes:SedesDTO[] = [];
    classTabSedes: string = "tab-sedes";

    @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
    center: google.maps.LatLngLiteral = { lat: -2.18, lng: -79.9 };
    zoom = 14;
    markerPositions: google.maps.LatLngLiteral[] = [];
    geocoder!: google.maps.Geocoder;
    currentMarker: google.maps.Marker | null = null;  // Variable para almacenar el marcador actual

    constructor(private el: ElementRef,
        private renderer: Renderer2,
        private sedesService: SedesService) { }
    ngAfterViewInit() {
        this.geocoder = new google.maps.Geocoder();
        this.initMap();
        // Acceder a la clase dinámica aquí
        const dynamicElement = this.el.nativeElement.querySelector('.nav-tabs');
        if (dynamicElement) {
          this.renderer.setStyle(dynamicElement, 'justify-content', 'space-around');
        }
      }
    ngOnInit() {
        this.obtenerSedes();
        setTimeout(() => this.initMap(), 1000);
    }

    obtenerSedes() {
        // Obtener sedes
        this.sedesService.getSedesLocal().subscribe((sedes) => {
            console.log("Sedes: ", sedes);
            this.sedes = sedes;
        });
    }

    initMap(): void {
        console.log('Initializing map');
        if (this.map?.googleMap) {
            this.map.googleMap.setCenter(this.center);
            this.map.googleMap.setZoom(this.zoom);
            this.map.googleMap.addListener('click', (event: google.maps.MapMouseEvent) => {
                console.log('Click event', event);
                this.addMarker(event.latLng!.toJSON());
            });
        }
    }


    addMarker(position: google.maps.LatLngLiteral) {
        if (this.currentMarker) {
            this.currentMarker.setMap(null);  // Elimina el marcador anterior
          }
      
          this.currentMarker = new google.maps.Marker({
              map: this.map.googleMap,
              position: position
          });

      }
    
      geocodeLatLng(position: google.maps.LatLngLiteral) {
        const geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({ location: position }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            console.log("Address: ", results[0].formatted_address);
          } else {
            console.error("Geocoder failed due to: ", status);
          }
        });
      }
    
}