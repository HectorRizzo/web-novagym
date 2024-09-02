import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { SedesService } from "../../../services/sedes.service";
import { SedesDTO } from "../../../dto/sedes.dto";
import { GoogleMap } from "@angular/google-maps";
import { UsuariosService } from "../../../services/usuarios.services";
import { DatosDTO } from "../../../dto/datos.dto";

@Component({
    selector: "app-opciones-entrega",
    templateUrl: "./opciones-entrega.component.html",
    styleUrls: ["./opciones-entrega.component.scss"],
    providers: [SedesService]
    })

export class OpcionesEntregaComponent implements AfterViewInit, OnInit{
    sedes:SedesDTO[] = [];
    classTabSedes: string = "tab-sedes";
    showPago = false;
    @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
    @ViewChild('searchInput', { static: false }) searchInput: ElementRef | undefined;

    center: google.maps.LatLngLiteral = { lat: -2.18, lng: -79.9 };
    zoom = 14;
    markerPositions: google.maps.LatLngLiteral[] = [];
    currentMarker: google.maps.Marker | null = null;  // Variable para almacenar el marcador actual
    direccion: string = "";
    descripcion: string = "";

    datosUsuario: DatosDTO | undefined;

    constructor(private el: ElementRef,
        private renderer: Renderer2,
        private sedesService: SedesService,
        private usuariosService: UsuariosService,
        private cdr: ChangeDetectorRef) { }
    ngAfterViewInit() {
        this.initMap();
        // Acceder a la clase dinámica aquí
        const dynamicElement = this.el.nativeElement.querySelector('.nav-tabs');
        if (dynamicElement) {
          this.renderer.setStyle(dynamicElement, 'justify-content', 'space-around');
        }
      }
    ngOnInit() {
      this.obtenerDatosUsuario();
        this.obtenerSedes();
        setTimeout(() => this.initMap(), 1000);
        this.initAutocomplete();
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
            this.initAutocomplete();
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
          this.geocodeLatLng(position);
          
      }
    
      geocodeLatLng(position: google.maps.LatLngLiteral) {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: position }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            console.log("Address: ", results[0].formatted_address);
            this.direccion = results[0].formatted_address;
            this.cdr.detectChanges();  // Detectar cambios manualmente
          } else {
            console.error("Geocoder failed due to: ", status);
          }
        });
      }

      initAutocomplete() {
        if (this.map?.googleMap) {
          console.log('Initializing autocomplete');
          const input =this.el.nativeElement.querySelector('.search-input');
          const searchBox = new google.maps.places.SearchBox(input);
        console.log('Input: ', input);
        if (this.map?.googleMap?.controls) {
            this.map.googleMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            this.map.googleMap.addListener('bounds_changed', () => {
              if (this.map?.googleMap) {
                  searchBox.setBounds(this.map.googleMap.getBounds()!);
              }
            });
        }

        searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces();
          if (!places || places.length === 0) {
            return;
          }
          const bounds = new google.maps.LatLngBounds();
          places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
              console.log('Returned place contains no geometry');
              return;
            }
            const position = place.geometry.location;
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
            this.addMarker(position.toJSON());
          });
          if (this.map?.googleMap) {
              this.map.googleMap.fitBounds(bounds);
          }
        });
      }
    }

    confirmarEntrega(sede?: SedesDTO){
        this.showPago = true;
        if( this.datosUsuario){
          if(sede){
            this.datosUsuario.direccion = sede.nombre;
            this.datosUsuario.tipoEntrega = "Entrega en sede";
          }else{
            console.log('Dirección: ', this.direccion);
              this.datosUsuario.direccion = this.direccion;
              this.datosUsuario.tipoEntrega = "Entrega a domicilio";
          }
          this.usuariosService.setDatosUsuario(this.datosUsuario);
        }

    }

    obtenerDatosUsuario(){
        this.usuariosService.getDatosUsuario().subscribe((data) => {
            this.datosUsuario = data;
        });
    }

}