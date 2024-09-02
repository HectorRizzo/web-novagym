import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TabsetComponent } from "ngx-bootstrap/tabs";
import Swiper from "swiper";
import { SedesService } from "../../../services/sedes.service";
import { SedesDTO } from "../../../dto/sedes.dto";
@Component({
    selector: "app-info-sedes",
    templateUrl: "info-sedes.component.html",
    styleUrls: ["info-sedes.component.scss"]
  })
  
  
  export class InfoSedesComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
    swiper: Swiper | undefined;
    options: google.maps.MapOptions = {
      mapId: "DEMO_MAP_ID",
      center: { lat: -31, lng: 147 },
      zoom: 4,
    };
    map: any;
  gmarkers: any[] = [];
  infowindow: any;
  selectedSede: number = 0;
  sedes: SedesDTO[] = [];
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent | undefined;
  tabsInitialized = false;

  constructor(private route: ActivatedRoute,
              private sedesService: SedesService
  ) {}

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

    ngAfterViewInit() {
      this.route.queryParams.subscribe(params => {
        this.selectedSede = params['sede'];
        this.getSedes();
      });
      this.initializeSwiper();
    }

    ngAfterViewChecked() {
      if (!this.swiper) {
        this.initializeSwiper();
      }
      if (!this.tabsInitialized && this.tabset && this.tabset.tabs.length > 0) {
        this.tabsInitialized = true;
        this.selectTabById(this.selectedSede);
      }
    }

    ngOnDestroy(): void {   
    }

    initializeSwiper() {
      this.swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
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
            return '<span class="' + className + ' bullets" style="font-size: 32px; background: transparent; margin-top: 1rem; border: 10px solid #E3DF00; border-radius: 50%;"></span>';
          },
        },
      });
    }

    onSedeSelected(sede: number) {
        this.selectedSede = sede;
    }

    
  selectTab(tabId: string): void {
    const tabIndex = this.getTabIndexById(tabId);
    console.log('tabIndex', tabIndex);
    console.log('tabset', this.tabset);
    console.log('tabset.tabs', this.tabset?.tabs);
    console.log('tabId', tabId);
    if (tabIndex !== -1 && this.tabset) {
      this.tabset.tabs[tabIndex].active = true;
    }
  }

  getTabIndexById(tabId: string): number {
    const tabIds = ['Sede Centro', 'Sede Norte', 'Sede Sur']; // Ajusta esto según tus pestañas
    return tabIds.indexOf(tabId);
  }

  getSedes(){
    this.sedesService.getSedes().subscribe({
      next: (sedes) => {
        this.sedes = sedes;
      },
      error: (error) => {
        console.error('Error fetching sedes', error);
      }
    });
  }

  selectTabById(id: number) {
    if (this.tabset && this.sedes.length > 0) {
      const index = this.sedes.findIndex(sede => sede.id == id);
      if (index !== -1) {
        this.tabset.tabs[index].active = true;
      }
    }
  }

    
}