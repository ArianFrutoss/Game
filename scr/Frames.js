export default class Frames{

    constructor (framesPerState, speed){

        this.framesPerState     = framesPerState;   //Numero de frames por estado de animacion
        this.frameCounter       = 0;                //Contador de frames
        this.speed              = speed;            //Velocidad de cambio de frame
        this.frameChangeCounter = 0;                //Contador de velocidade de cambio
    }
}