export class HorarioDTO {
    id: number;
    dia: string;
    horario_inicio: string;
    horario_fin: string;
    usuario: {
      cedula: string;
      nombres: string;
      apellidos: string;
      telefono: string;
      fecha_nacimiento: string;
      sexo: string;
    };
    horario: {
      id: number;
      nombre: string;
      descripcion: string;
      gimnasio: {
        id: number;
        nombre: string;
        imagen: string;
        telefono: string;
        celular: string;
        ubicacion: string;
        horario_inicio: string;
        horario_fin: string;
        estado: boolean;
        ciudad: string;
        aforo: number;
        capacidad: number;
        personas: number;
        latitud: string;
        longitud: string;
        envio: string;
      };
      capacidad: number;
      asistentes: number;
      activo: boolean;
      zona: number;
    };

    constructor(id: number, dia: string, horario_inicio: string, horario_fin: string, usuario: { cedula: string; nombres: string; apellidos: string; telefono: string; fecha_nacimiento: string; sexo: string; }, horario: { id: number; nombre: string; descripcion: string; gimnasio: { id: number; nombre: string; imagen: string; telefono: string; celular: string; ubicacion: string; horario_inicio: string; horario_fin: string; estado: boolean; ciudad: string; aforo: number; capacidad: number; personas: number; latitud: string; longitud: string; envio: string; }; capacidad: number; asistentes: number; activo: boolean; zona: number; }){
        this.id = id;
        this.dia = dia;
        this.horario_inicio = horario_inicio;
        this.horario_fin = horario_fin;
        this.usuario = usuario;
        this.horario = horario;
    }
  }