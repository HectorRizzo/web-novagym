import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MapInfoWindow, MapMarker } from "@angular/google-maps";
import Swiper from "swiper";


let posiciones: any[] = [
  { sede:'todas', ubicaciones:[
    { position: { lat:-2.1867352190473524, lng:-79.89419700000002}, title: 'NOVA GYM Sede Centro', description: 'Los Ríos, Guayaquil 090514', telefono: '(04)2282004', email:'infonovagym@gmail.com'},
    { position: {lat:-2.1404472348899484, lng:-79.89800086216792 }, title: 'NOVA GYM Sede Norte', description: 'Plaza Mayor, Av. Rodolfo Baquerizo Nazur 1, Guayaquil 090501', telefono: '(04)4601585', email:'infonovagym@gmail.com'},
    { position: { lat:-2.2287332455145514, lng:-79.8974067333309 }, title: 'NOVA GYM Sede Sur', description: 'Av. 25 de Julio, Guayaquil 090102', telefono: '(04)4601585', email:'infonovagym@gmail.com'},
    { position: { lat:-3.268450943850025, lng:-79.94717633332256 }, title: 'NOVA GYM Sede Machala', description: 'Primero de Mayo y Los Rios, Machala, Ecuador', telefono: '(04)4601585', email:'infonovagym@gmail.com'}  
  ]
},
{ sede:'guayaquil', ubicaciones:[
  { position: { lat:-2.1867352190473524, lng:-79.89419700000002}, title: 'NOVA GYM Sede Centro', description: 'Los Ríos, Guayaquil 090514', telefono: '(04)2282004', email:'infonovagym@gmail.com'},
  { position: {lat:-2.1404472348899484, lng:-79.89800086216792 }, title: 'NOVA GYM Sede Norte', description: 'Plaza Mayor, Av. Rodolfo Baquerizo Nazur 1, Guayaquil 090501', telefono: '(04)4601585', email:'infonovagym@gmail.com'},
  { position: { lat:-2.2287332455145514, lng:-79.8974067333309 }, title: 'NOVA GYM Sede Sur', description: 'Av. 25 de Julio, Guayaquil 090102', telefono: '(04)4601585', email:'infonovagym@gmail.com'},
]
},
{ sede:'machala', ubicaciones:[
{ position: { lat:-3.268450943850025, lng:-79.94717633332256 }, title: 'NOVA GYM Sede Machala', description: 'Primero de Mayo y Los Rios, Machala, Ecuador', telefono: '(04)4601585', email:'infonovagym@gmail.com'}  
]
}];

@Component({
    selector: "app-sedes",
    templateUrl: "sedes.component.html",
    styleUrls: ["sedes.component.scss"]
  })
  
  
  export class SedesComponent implements OnInit, OnDestroy {
    @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
    activeTab: string = 'todas';
    position: google.maps.LatLngLiteral = { lat: -2.18, lng: -79.9 };
    selectedMarker?: any;

    markers: any[] = [
      { position: { lat:-2.1867352190473524, lng:-79.89419700000002}, title: 'NOVA GYM Sede Centro', description: 'Los Ríos, Guayaquil 090514', telefono: '(04)2282004', email:'infonovagym@gmail.com'},
      { position: {lat:-2.1404472348899484, lng:-79.89800086216792 }, title: 'NOVA GYM Sede Norte', description: 'Plaza Mayor, Av. Rodolfo Baquerizo Nazur 1, Guayaquil 090501', telefono: '(04)4601585', email:'infonovagym@gmail.com'},
      { position: { lat:-2.2287332455145514, lng:-79.8974067333309 }, title: 'NOVA GYM Sede Sur', description: 'Av. 25 de Julio, Guayaquil 090102', telefono: '(04)4601585', email:'infonovagym@gmail.com'},
      { position: { lat:-3.268450943850025, lng:-79.94717633332256 }, title: 'NOVA GYM Sede Machala', description: 'Primero de Mayo y Los Rios, Machala, Ecuador', telefono: '(04)4601585', email:'infonovagym@gmail.com'},
      ];
    center: google.maps.LatLngLiteral = { lat: -2.18, lng: -79.9 };
    zoom = 8;
    width = '100%';
    infoContent: string = '';
    constructor() {

    }

    ngOnInit() {
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 3,
            spaceBetween: 30,
            loop : true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                clickable: true,
                type: 'bullets',
                el: '.swiper-pagination',
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active',
                renderBullet: function (index, className) {
                  return '<span class="' + className +' bullets" style="font-size: 32px; background: transparent; margin-top: 1rem; border: 10px solid #E3DF00; border-radius: 50%;">'
                  +'</span>';
                },
              },
          });

          this.markers = posiciones.find(posicion => posicion.sede === 'todas').ubicaciones;


    }


  setActiveTab(tab: string) {
    console.log(tab);
    this.activeTab = tab;
    this.markers = posiciones.find(posicion => posicion.sede === tab).ubicaciones;
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
    
    
}