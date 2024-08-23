export class TarjetaDTO{
    id: string;
    numero: string;
    nombre: string;
    fechaVencimiento: string;
    tipo: string;
    cvv?: string;
    banco?: string;

    constructor(id: string, numero: string, nombre: string, fechaVencimiento: string, cvv: string, tipo: string, banco: string){
        this.id = id;
        this.numero = numero;
        this.nombre = nombre;
        this.fechaVencimiento = fechaVencimiento;
        this.cvv = cvv;
        this.tipo = tipo;
        this.banco = banco;
    }
}