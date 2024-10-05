import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TabsetComponent } from "ngx-bootstrap/tabs";
import { SedesService } from "../../../services/sedes.service";
import { SedesDTO } from "../../../dto/sedes.dto";
import { clasesDTO } from "../../../dto/clases.dto";
import Swiper from 'swiper';
@Component({
    selector: "app-info-sedes",
    templateUrl: "info-sedes.component.html",
    styleUrls: ["info-sedes.component.scss"]
  })
  
  
  export class InfoSedesComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
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
  clases: clasesDTO[] = [];
  mapClasesXSede: Map<number, clasesDTO[]> = new Map<number, clasesDTO[]>();
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent | undefined;
  tabsInitialized = false;
    private swiperInit = false;
  constructor(private route: ActivatedRoute,
              private sedesService: SedesService
  ) {}

    ngOnInit() {
      this.obtenerClases();
    }

    ngAfterViewInit() {
      this.route.queryParams.subscribe(params => {
        this.selectedSede = params['sede'];
        this.getSedes();
      });


    }

    ngAfterViewChecked() {

      if (!this.tabsInitialized && this.tabset && this.tabset.tabs.length > 0) {
        this.tabsInitialized = true;
        this.selectTabById(this.selectedSede);
      }
      //Verificar si el swiper ya esta en el DOM
      const swiperContainer = document.querySelector('.mySwiperInfoSedes');
      if(!this.swiperInit && swiperContainer){
        const swiper = new Swiper('.mySwiperInfoSedes', {
          slidesPerView: 3,
          spaceBetween: 30,
          freeMode: true,
          loop: true,
          autoplay: {
            delay: 1500,
          },
          breakpoints: {
            340: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1023: {
              slidesPerView: 3,
              spaceBetween: 30
            },
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
        this.swiperInit = true;
      }

    }
    

    ngOnDestroy(): void {   
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
        console.log('sedes', sedes);
        this.sedes.forEach(sede => {
          this.obtenerClasesXSede(sede.nombre, sede.id);
        });
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

  obtenerClases(){
    this.sedesService.getClases().subscribe({
      next: (clases) => {
        console.log('clases', clases);
        this.clases = clases;
      },
      error: (error) => {
        console.error('Error fetching clases', error);
      }
    });
  }

  obtenerClasesXSede(clase: string, idSede: number){
    this.sedesService.getClasesSede(clase, idSede).subscribe({
      next: (clases) => {
        console.log('clases', clases);
        this.mapClasesXSede.set(idSede, clases);
      },
      error: (error) => {
        console.error('Error fetching clases', error);
      }
    });
  }
    
    
}