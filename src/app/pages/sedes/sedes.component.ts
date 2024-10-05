import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MapInfoWindow, MapMarker } from "@angular/google-maps";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import Swiper from "swiper";
import { SedesService } from "../../services/sedes.service";
import { SedesDTO } from "../../dto/sedes.dto";
interface ciudadSedes {
  nombre: string;
  sedes: SedesDTO[];
}

// let posiciones: any[] = [
//   { sede:'todas', ubicaciones:[
//     { position: { lat:-2.1867352190473524, lng:-79.89419700000002}, title: 'NOVA GYM Sede Centro', description: 'Los Ríos, Guayaquil 090514', telefono: '(04)2282004', email:'infonovagym@gmail.com'},
//     { position: {lat:-2.1404472348899484, lng:-79.89800086216792 }, title: 'NOVA GYM Sede Norte', description: 'Plaza Mayor, Av. Rodolfo Baquerizo Nazur 1, Guayaquil 090501', telefono: '(04)4601585', email:'infonovagym@gmail.com'},
//     { position: { lat:-2.2287332455145514, lng:-79.8974067333309 }, title: 'NOVA GYM Sede Sur', description: 'Av. 25 de Julio, Guayaquil 090102', telefono: '(04)4601585', email:'infonovagym@gmail.com'},
//     { position: { lat:-3.268450943850025, lng:-79.94717633332256 }, title: 'NOVA GYM Sede Machala', description: 'Primero de Mayo y Los Rios, Machala, Ecuador', telefono: '(04)4601585', email:'infonovagym@gmail.com'}  
//   ]
// },
// { sede:'guayaquil', ubicaciones:[
//   { position: { lat:-2.1867352190473524, lng:-79.89419700000002}, title: 'NOVA GYM Sede Centro', description: 'Los Ríos, Guayaquil 090514', telefono: '(04)2282004', email:'infonovagym@gmail.com'},
//   { position: {lat:-2.1404472348899484, lng:-79.89800086216792 }, title: 'NOVA GYM Sede Norte', description: 'Plaza Mayor, Av. Rodolfo Baquerizo Nazur 1, Guayaquil 090501', telefono: '(04)4601585', email:'infonovagym@gmail.com'},
//   { position: { lat:-2.2287332455145514, lng:-79.8974067333309 }, title: 'NOVA GYM Sede Sur', description: 'Av. 25 de Julio, Guayaquil 090102', telefono: '(04)4601585', email:'infonovagym@gmail.com'},
// ]
// },
// { sede:'machala', ubicaciones:[
// { position: { lat:-3.268450943850025, lng:-79.94717633332256 }, title: 'NOVA GYM Sede Machala', description: 'Primero de Mayo y Los Rios, Machala, Ecuador', telefono: '(04)4601585', email:'infonovagym@gmail.com'}  
// ]
// }
// ];

@Component({
    selector: "app-sedes",
    templateUrl: "sedes.component.html",
    styleUrls: ["sedes.component.scss"],
    providers: [
      RouterModule,
      SedesService
    ]
  })
  
  
  export class SedesComponent implements OnInit, OnDestroy {
    @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
    activeTab: string = 'todas';
    posiciones: any[] = [];
    position: google.maps.LatLngLiteral = { lat: -2.18, lng: -79.9 };
    selectedMarker?: any;
    sedes: SedesDTO[] = [];
    ciudades: ciudadSedes[] = [];
    markers: any[] = [
      ];
    center: google.maps.LatLngLiteral = { lat: -2.18, lng: -79.9 };
    zoom = 8;
    width = '100%';
    infoContent: string = '';
    constructor(
      private activeRoute: ActivatedRoute,
      private route: Router,
      private sedesService: SedesService
    ) {

    }

    ngOnInit() {
      this.getSedes();
    }


  setActiveTab(tab: string) {
    this.markers = [];
    console.log('Active tab', this.activeTab);
    console.log('Posiciones ', this.posiciones);
    this.activeTab = tab;
    this.posiciones.forEach(posicion => {
      if(posicion.sede === tab){
        this.markers = posicion.ubicaciones;
      }
    });
    console.log('Markers', this.markers);
  }
    ngOnDestroy(): void {
        
    }

    selectMarker(marker: any, mapMarker: MapMarker): void {
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

    goToSede(idSede: number) {
      console.log(idSede);
      console.log(this.activeTab);
      console.log(this.route);
      console.log(this.activeRoute);
      this.route.navigate(["/sedes/info-sedes"] , { queryParams: {sede: idSede}});

    }

    getSedes(){
      this.sedesService.getSedes().subscribe({
        next: (sedes) => {
          console.log('Sedes', sedes);
          this.sedes = sedes;
          this.ciudades = [];
          let ciudadTodas = {nombre: 'Todas', sedes: sedes};
          this.ciudades.push(ciudadTodas);
          this.sedes.forEach(sede => {
            let ciudad = this.ciudades.find(ciudad => ciudad.nombre === sede.ciudad);
            if(ciudad){
              ciudad.sedes.push(sede);
            }else{
              this.ciudades.push({nombre: sede.ciudad, sedes: [sede]});
            }
          });
          console.log('Ciudades', this.ciudades);
          this.ciudades.forEach(ciudad => {
            let ubicaciones = ciudad.sedes.map(sede => {
              return { position: { lat: Number(sede.latitud), lng: Number(sede.longitud) }, title: sede.nombre, description: sede.ubicacion, telefono: sede.telefono, email: "novagym@gmail.com" };
            });
            this.posiciones.push({sede: ciudad.nombre, ubicaciones: ubicaciones});
          });
          console.log('Posiciones', this.posiciones);
          this.posiciones.forEach(posicion => {
            if(posicion.sede === this.activeTab){
              this.markers = posicion.ubicaciones;
            }
          });
          this.setActiveTab(this.ciudades[0].nombre);
        },
        error: (error) => {
          console.error('Error fetching sedes', error);
        }
      });
    }
          
}