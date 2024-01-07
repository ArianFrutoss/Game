import globals from "./globals.js";

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2){

    let isOverlap;

    //Calcula si ha habido overlap en X e Y
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){

        isOverlap = false;
    }

    else{

        isOverlap = true;
    }

    return isOverlap;
}

export default function detectCollisions(){

    //Calculamos collision del player con cada uno de los sprites
    for (let i = 1; i < globals.sprites.length; i++){

        const sprite = globals.sprites[i];
        detectCollisionsBetweenPlayerAndSprite(sprite);
    }
}

function detectCollisionsBetweenPlayerAndSprite(sprite){

    //Reinicia la State de la collision
    sprite.isCollidingWithPlayer = false;

    //Nuestro player esta en la posicion 0
    const player = globals.sprites[0];

    //Datos del player
    const x1 = player.xPos + player.hitBox.xOffSet;
    const y1 = player.yPos + player.hitBox.yOffset;
    const w1 = player.hitBox.xSize;
    const h1 = player.hitBox.ySize;

    //Datos del otro sprite
    const x2 = sprite.xPos + sprite.hitBox.xOffSet;
    const y2 = sprite.yPos + sprite.hitBox.yOffset;
    const w2 = sprite.hitBox.xSize;
    const h2 = sprite.hitBox.ySize;

    const isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)

    if (isOverlap){

        //Existe collision
        sprite.isCollidingWithPlayer = true;
    }
}