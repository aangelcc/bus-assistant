import { Expedition } from './expedition';

export interface DestinationInfo {
    datosIda: Expedition[];
    datosVuelta: Expedition[];
    precioIda: String;
    precioVuelta: String;
    precioIdaVuelta: String;
}
