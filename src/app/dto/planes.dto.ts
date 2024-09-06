import { BeneficiosDTO } from "./beneficios.dto";
import { PreciosDto } from "./precios.dto";

export interface PlanesDto {    
    id: number;
    beneficios: BeneficiosDTO[];
    nombre: string;
    descripcion: string;
    precios: PreciosDto[];
    imagen: string;
    informacion: string[];
}