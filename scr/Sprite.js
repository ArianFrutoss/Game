export default class Sprite{

    constructor (id, state, xPos, yPos, imageSet, frames, gameState){

        this.id         = id;           //Tipo de Sprite
        this.state      = state;        //Estado de animacion del sprite
        this.xPos       = xPos;         //Posicion en X
        this.yPos       = yPos;         //Posicion en Y
        this.imageSet   = imageSet;     //Datos de las imagenes del sprite
        this.frames     = frames;       //Datos de los frames de animacion
    }
}