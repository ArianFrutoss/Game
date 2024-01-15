export default class Sprite{

    constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox, hitBoxCamera){

        this.id                                 = id;           //Tipo de Sprite
        this.state                              = state;        //Estado de animacion del sprite
        this.xPos                               = xPos;         //Posicion en X
        this.yPos                               = yPos;         //Posicion en Y
        this.imageSet                           = imageSet;     //Datos de las imagenes del sprite
        this.frames                             = frames;       //Datos de los frames de animacion
        this.physics                            = physics;      //Datos de las fisicas
        this.hitBox                             = hitBox;       //Datos de la hitbox
        this.isCollidingWithPlayer              = false;        //Variables que indica si la habido colision con el player
        this.isCollidingWithTheLake             = false;        //Indica si ha habido colision con el lago
        this.isCollidingWithWall                = false;        //Indica si ha habido colosion con el muro
        this.isCollidingWithChair               = false;        //Indica si ha habido colosion con la silla
    }
}

export class Player extends Sprite{

    constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox, hitBoxCamera){

        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox);

            this.hitBoxCamera                   = hitBoxCamera;         //Datos de la hitbox
            this.isCollidingWithBorderTop       = false                 //Collision por arriba
            this.isCollidingWithBorderBottom    = false                 //Collision por abajo
            this.isCollidingWithBorderRight     = false                 //Collision por derecha
            this.isCollidingWithBorderLeft      = false                 //Collision por izquierda
        }
}

export class Enemy1 extends Sprite{

    constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox, ){

        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox);

            this.hp                                 = 4;            //Vida de los enemigos
            this.isCollidingWithEnemy               = false;        //Indica si ha habido colosion con el enemigo
            this.enemyCont                          = 5;            //Contador de enemigos spawneados
    }
}

export class HudSprites extends Sprite{

    constructor (id, state, xPos, yPos, imageSet, frames){

        super(id, state, xPos, yPos, imageSet, frames);

            this.hud = true
    }
}