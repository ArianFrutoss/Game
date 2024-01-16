export default class Camera{

    constructor(x, y){

        this.x                          = x;             //Posicion de la camara en X
        this.isCollidingWithBorderLeft  = false;         //Comprueba si la camara esta colisionando con el borde izquierdo
        this.isCollidingWithBorderRight = false;         //Comprueba si la camara esta colisionando con el borde izquierdo  
    }
}