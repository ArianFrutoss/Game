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
        this.isCollidingWithObject              = false;        //Indica si ha habido colosion con los objetos
        this.isCollidingWithEnemy               = false;        //Indica si ha habido colosion con el enemigo
        this.isCollidingWithMagic               = false;        //Indica si ha habido colosion con la magia
    }
}

export class Enemy1 extends Sprite{

    constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox){

        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox);

            this.hp                                 = 4;            //Vida de los enemigos
            this.enemyCont                          = 5;            //Contador de enemigos spawneados
    }
}

export class HudSprites extends Sprite{

    constructor (id, state, xPos, yPos, imageSet, frames){

        super(id, state, xPos, yPos, imageSet, frames);

            this.hud = true;
    }
}

export class Wall extends Sprite{

    constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox){

        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox);

            this.WallHp = 0;
    }
}