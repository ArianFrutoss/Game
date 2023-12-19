export default class Timer{

    constructor (value, timerChangeValue){

        this.value               = value;               //Valor del temporizador
        this.timerChangeCounter  = 0;                   //Temporizador para cambiar valor
        this.timerChangeValue    = timerChangeValue;    //Tiempo para cambiar valor (seconds)
    }
}