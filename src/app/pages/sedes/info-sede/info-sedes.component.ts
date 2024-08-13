import { Component, OnDestroy, OnInit } from "@angular/core";
import Swiper from "swiper";
@Component({
    selector: "app-info-sedes",
    templateUrl: "info-sedes.component.html",
    styleUrls: ["info-sedes.component.scss"]
  })
  
  
  export class InfoSedesComponent implements OnInit, OnDestroy {
    options: google.maps.MapOptions = {
      mapId: "DEMO_MAP_ID",
      center: { lat: -31, lng: 147 },
      zoom: 4,
    };
    map: any;
  gmarkers: any[] = [];
  infowindow: any;
  selectedSede: string = 'Sede Centro';

    constructor() {}

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
    }

    ngOnDestroy(): void {   
    }

    onSedeSelected(sede: string) {
        this.selectedSede = sede;
        console.log('Selected sede info', this.selectedSede);
    }

    
}