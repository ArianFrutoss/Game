export default class Sprite{

    constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox){

        this.id                                 = id;           //Tipo de Sprite
        this.state                              = state;        //Estado de animacion del sprite
        this.xPos                               = xPos;         //Posicion en X
        this.yPos                               = yPos;         //Posicion en Y
        this.imageSet                           = imageSet;     //Datos de las imagenes del sprite
        this.frames                             = frames;       //Datos de los frames de animacion
        this.physics                            = physics;      //Datos de las fisicas
        this.hitBox                             = hitBox;       //Datos de la hitbox
        this.isCollidingWithPlayer              = false;        //Variables que indica si la habido colision con el player
        this.isCollidingWithObstacleOnTheTop    = false;        //Indica si ha habido colision con un obstaculo hacia arriba
        this.isCollidingWithObstacleOnTheLeft   = false;        //Indica si ha habido colision con un obstaculo hacia la izquierda
        this.isCollidingWithObstacleOnTheBottom = false;        //Indica si ha habido colision con un obstaculo hacia abajo
        this.isCollidingWithObstacleOnTheRight  = false;        //Indica si ha habido colision con un obstaculo hacia la derecha
    }
}