import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, PLATFORM_ID } from "@angular/core";
import { CarouselComponent } from "ngx-bootstrap/carousel";
import noUiSlider from "nouislider";
// import Swiper bundle with all modules installed
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { AuspiciantesService } from "../../services/auspiciantes.services";
import { AuspiciantesDTO } from "../../dto/auspiciantes.dto";
import { HorarioDTO } from "../../dto/horario.dto";
import { SedesService } from "../../services/sedes.service";

register();
// Instala css do swiper
@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.scss"]
})


export class HomeComponent implements OnInit, OnDestroy {
  cont = 0;
  horarios: HorarioDTO[] = [];
  diasSemana = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
  horas = ['07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00'];
  horasNext = ['08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00', '00:00:00'];
  horarioMap = new Map<string, HorarioDTO>();
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
private sedesService: SedesService) {}
  scrollToDownload(element: any,) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  

  ngAfterViewInit() {
    const swiperEl:Swiper =  new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      direction: 'vertical',
      pagination: {
        clickable: true,
        type: 'bullets',
        el: '.swiper-pagination',
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        renderBullet: function (index:any, className:any) {
          return '<span class="' + className +' bullets" style="font-size: 32px; background: transparent; margin-top: 1rem; border: 10px solid #E3DF00; border-radius: 50%;">'
          + (index + 1) + '</span>';
        },
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });

    const swiper:Swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
      loop : true,
      autoplay: {
        delay: 1500,
      },
 
    });

    const swiperSedes:Swiper = new Swiper(".mySwiperSedes", {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
      loop : true,
      autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
      },
 
    });

    const swiperClases:Swiper = new Swiper(".mySwiperClases", {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
      loop : true,
      autoplay: {
        delay: 1500,
        pauseOnMouseEnter: true,
      },
 
    });
  }
  

  ngOnInit() {
    this.getDataHorarios();
    this.getAuspicantes();
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

  getHorario() {
    const horasSet = new Set<string>();
    this.horarios.forEach(horario => {
        horasSet.add(horario.horario_inicio);
        horasSet.add(horario.horario_fin);  
    });
    this.horas = Array.from(horasSet).sort();
    this.horasNext = this.horas.map((hora, index) => this.horas[index + 1] || '00:00:00');

    this.horarios.forEach(horario => {
      //validar si esta entre dos filas de horas
      if (this.horas.includes(horario.horario_inicio) && this.horas.includes(horario.horario_fin)) {
        const indexInicio = this.horas.indexOf(horario.horario_inicio);
        const indexFin = this.horas.indexOf(horario.horario_fin);
        for (let i = indexInicio; i < indexFin; i++) {
          this.horarioMap.set(horario.dia + "-" + this.horas[i], horario);
        }
      }
    });
    console.log(this.horarioMap);
  }

  getDataHorarios() {
    this.sedesService.getHorarios().subscribe(data => {
      console.log(data);
      this.horarios = data;
      this.getHorario();
    });
  }

  addOneHour(time: string): string {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours + 1, minutes, seconds);
    console.log(date.toTimeString());
    return date.toTimeString().split(' ')[0].substring(0, 5); // Devuelve HH:mm
  }

}
