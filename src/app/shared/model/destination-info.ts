import { Expedition } from './expedition';

export interface DestinationInfo {
    datosIda: Expedition[];
    datosVuelta: Expedition[];
    precioIda: string;
    precioVuelta: string;
    precioIdaVuelta: string;
}
