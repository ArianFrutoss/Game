//Clase que gestiona las HitBox de los sprites
export default class HitBox{

    constructor (xSize, ySize, xOffset, yOffset){

        this.xSize      = xSize;        //Tamaño en px de la hitbox (X)
        this.ySize      = ySize;        //Tamaño en px de la hitbox (Y)
        this.xOffset    = xOffset       //Offset en X de comienzo de dibujo del hitbox respecto de xPos
        this.yOffset    = yOffset       //Offset en Y de comienzo de dibujo del hitbox respecto de yPos
    }
}