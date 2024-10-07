import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, PLATFORM_ID } from "@angular/core";
import { CarouselComponent } from "ngx-bootstrap/carousel";
import noUiSlider from "nouislider";
// import Swiper bundle with all modules installed
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { AuspiciantesService } from "../../services/auspiciantes.services";
import { AuspiciantesDTO } from "../../dto/auspiciantes.dto";
import { SedesService } from "../../services/sedes.service";
import { clasesDTO } from "../../dto/clases.dto";
import { SedesDTO } from "../../dto/sedes.dto";
import { PlanesDto } from "../../dto/planes.dto";
import { MembresiasService } from "../../services/membresias.service";

register();
// Instala css do swiper
@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.scss"]
})


export class HomeComponent implements OnInit, OnDestroy {
  cont = 0;
  clases: clasesDTO[] = [];
  sedes: SedesDTO[] = [];
  mapMembresias: Map<string, PlanesDto[]> = new Map<string, PlanesDto[]>();
  membresiasArray: { key: string, value: any }[] = [];
  isCollapsed = true;
  focus: any;
  focus1: any;
  focus2: any;
  date = new Date();
  pagination = 3;
  pagination1 = 1;

  auspiciantes:AuspiciantesDTO[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
private auspiciantesService: AuspiciantesService,
private sedesService: SedesService,
private membresiaService: MembresiasService) {}
  scrollToDownload(element: any,) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  

  ngAfterViewInit() {
    const swiperSedes:Swiper = new Swiper(".mySwiperSedes", {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop : true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      breakpoints: {
        // when window width is >= 320px
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
      }
    });
    
    const swiperEl:Swiper =  new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      direction: 'horizontal',
      pagination: {
        clickable: true,
        type: 'bullets',
        el: '.swiper-pagination',
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        renderBullet: function (index:any, className:any) {
          return '<span class="' + className +' bullets" style="font-size: 20px; background: transparent; margin-top: 4rem; border: 2px solid #E3DF00; border-radius: 50%;">'
          + (index + 1) + '</span>';
        },
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          direction: 'vertical',
        }
      }
    });

    const swiper:Swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop : true,
      autoplay: {
        delay: 1500,
      },
      breakpoints: {
        // when window width is >= 320px
        340: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1023: {
          slidesPerView: 3,
          spaceBetween: 30
        },
      }
 
    });



    const swiperClases:Swiper = new Swiper(".mySwiperClases", {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop : true,
      autoplay: {
        delay: 1500,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        // when window width is >= 320px
        380: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1023: {
          slidesPerView: 3,
          spaceBetween: 30
        },
      }
 
    });
  }
  

  ngOnInit() {
    this.getSedes();
    this.getClases();
    this.getAuspicantes();
    this.getMembresias();
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    let slider = document.getElementById("sliderRegular");
    if(slider)
    noUiSlider.create(slider, {
      start: 40,
      connect: false,
      range: {
        min: 0,
        max: 100
      }
    });

    let slider2 = document.getElementById("sliderDouble");
    if(slider2)
    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
    
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }


  @ViewChild('carousel', { static: true }) carousel: CarouselComponent | undefined;
  @ViewChild('video1', { static: true }) video1: ElementRef<HTMLVideoElement> | undefined;

  onSlideChange(event: any) {
    console.log('slide change', event);
    
    if (this.video1 && this.video1.nativeElement && event === 1) {
      this.video1.nativeElement.pause();
    }
    if (this.video1 && this.video1.nativeElement && event === 0) {
      this.video1.nativeElement.play().then(() => {
        console.log('video played');
      }
      ).catch(err => {
        console.log('video play error', err);
      });
    }
  }

  getAuspicantes(): void {
    this.auspiciantesService.getAuspiciantes().subscribe(data => {
      //Solo se muestran 4 auspiciantes
      this.auspiciantes = data.slice(0, 4);
    });
  }


  getClases() {
    this.sedesService.getClases().subscribe({
      next: (clases) => {
        console.log('clases', clases);
        let crossfit = new clasesDTO( 2, 'Crossfit', 'Clase de crossfit',clases[0].sede);
        this.clases = clases;
        let todos = new clasesDTO( 999, 'Todas', 'TODAS',clases[0].sede);
        this.clases.unshift(todos);
        this.clases.push(crossfit);
      },
      error: (error) => {
        console.error('Error fetching clases', error);
      }
    });
  }

  getSedes(){
    this.sedesService.getSedes().subscribe({
      next: (sedes) => {
        sedes.forEach((sede) => {
          switch (sede.nombre.toUpperCase()) {
            case 'CENTRO':
              sede.imagen = 'assets/img/centro.jpg';
              break;
            case 'SUR':
              sede.imagen = 'assets/img/sur.jpg';
              break;
            case 'ALBORADA':
              sede.imagen = 'assets/img/alborada.jpg';
              break;
            case 'MACHALA':
              sede.imagen = 'assets/img/machala.jpg';
              break;
            default:
              sede.imagen = 'assets/img/centro.jpg';
              break;
          }
        });
        this.sedes = sedes;
        console.log('sedes', sedes);
      },
      error: (error) => {
        console.error('Error fetching sedes', error);
      }
    });
  }

  getMembresias() {
    this.membresiaService.getMembresias().subscribe({
        next: (data) => {
            console.log("memebresias ", data);
            data.forEach((plan) => {
                let desc = plan.descripcion.split("\n");
                plan.informacion = desc;
                plan.precios.forEach((precio) => {
                    console.log("precio ", precio);
                    if (!this.mapMembresias.has(precio.tipo)) {
                        this.mapMembresias.set(precio.tipo, []);
                    }
                    const membresias = this.mapMembresias.get(precio.tipo);
                    if (membresias) {
                        membresias.push(plan);
                    }
                });
            });
            console.log("mapMembresias ", this.mapMembresias);
            this.membresiasArray = Array.from(this.mapMembresias, ([key, value]) => ({ key, value }));
            console.log("membresiasArray ", this.membresiasArray);
            
        },
        error: (error) => {
            console.error(error);
        }
    });
    console.log(this.membresiasArray);
  }

  

}
