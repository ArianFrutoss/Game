import globals from "./globals.js";
import {Block} from "./constans.js";

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
    for (let i = 0; i < globals.sprites.length; i++){

        const sprite = globals.sprites[i];
        detectCollisionsBetweenPlayerAndSprite(sprite);
    }

    for (let i = 0; i < 4; i++){

        const sprite = globals.sprites[i];
        detectCollisionsBetweenPlayerAndMapObstacles(sprite);
    }
}

function detectCollisionsBetweenPlayerAndSprite(sprite){

    //Reinicia la State de la collision
    sprite.isCollidingWithPlayer = false;

    //Nuestro player esta en la posicion 1
    const player = globals.sprites[4];

    //Datos del player
    const x1 = player.xPos + player.hitBox.xOffset;
    const y1 = player.yPos + player.hitBox.yOffset;
    const w1 = player.hitBox.xSize;
    const h1 = player.hitBox.ySize;

    //Datos del otro sprite
    const x2 = sprite.xPos + sprite.hitBox.xOffset;
    const y2 = sprite.yPos + sprite.hitBox.yOffset;
    const w2 = sprite.hitBox.xSize;
    const h2 = sprite.hitBox.ySize;

    const isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)

    if (isOverlap){

        //Existe collision
        sprite.isCollidingWithPlayer = true;
    }
}

function getMapTileId(xPos, yPos){

    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;

    const fil = Math.floor(yPos / brickSize);
    const col = Math.floor(xPos / brickSize);

    return levelData[fil][col];
}

function isCollidingWithObstacleAt(xPos, yPos, obstacleId){

    let isColliding;

    const id = getMapTileId(xPos, yPos);

    //Calculamos collision con bloque de cristal
    if (id === obstacleId){

        isColliding = true;
    }

    else{

        isColliding = false;
    }

    return isColliding;
}

function detectCollisionsBetweenPlayerAndMapObstacles(sprite, previousVLimit){

    const player = sprite;
    const minSpeed = 30;
    
    //Reiniciamos el state de la collision
    player.isCollidingWithObstacleOnTheRight = false;

    //Variables a usar
    let xPos;
    let yPos;
    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isCollidingOnPos3;
    let isColliding;
    
    const brickSize = globals.level.imageSet.gridSize;

    //Id del obstaculo
    const obstacleId = Block.BLOCK_3;

    if (sprite.physics.vx > 0){

        //Primera colisión en (xPos + xSize - 1, yPos)
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize + 1;
        yPos = player.yPos + player.hitBox.yOffset;
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

        // Segunda colision en (xPos + Size - 1, yPos + bricksize)
        yPos = player.yPos + player.hitBox.yOffset + brickSize;
        isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);
        
        //Ultima colisión en (xPos + Size - 1, yPos + ySize - 1)
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstacleId); 

        //Habrá colisión si toca alguno de los 3 bloques.
        isColliding = isCollidingOnPos3;
        
        if (isColliding){

            player.isCollidingWithObstacleOnTheRight = true;
            
            if (player.physics.vLimit > minSpeed){

                player.physics.vLimit -= 10;
                player.physics.speedReductionContX += 10;
            }
        }

        else{

            player.isCollidingWithObstacleOnTheRight = false;
            
            if (player.physics.vLimit < minSpeed + player.physics.speedReductionContX){

                player.physics.vLimit += 10;
            }

            else{

                player.physics.speedReductionContX = 0
            }
        }
    }

    else if (sprite.physics.vx < 0){
        
        //Primera colisión en (xPos + xSize - 1, yPos)
        xPos = player.xPos + player.hitBox.xOffset + 1;
        yPos = player.yPos + player.hitBox.yOffset;
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

        // Segunda colision en (xPos + Size - 1, yPos + bricksize)
        yPos = player.yPos + player.hitBox.yOffset + brickSize;
        isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);
        
        //Ultima colisión en (xPos + Size - 1, yPos + ySize - 1)
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstacleId); 

        //Habrá colisión si toca alguno de los 3 bloques.
        isColliding = isCollidingOnPos3;
        
        if (isColliding){

            player.isCollidingWithObstacleOnTheLeft = true;
            
            if (player.physics.vLimit > minSpeed){

                player.physics.vLimit -= 10;
                player.physics.speedReductionContX += 10;
            }
        }

        else{

            player.isCollidingWithObstacleOnTheLeft = false;
            
            if (player.physics.vLimit < minSpeed + player.physics.speedReductionContX){

                player.physics.vLimit += 10;
            }

            else{
                
                player.physics.speedReductionContX = 0
            }
        }
    }

    else if (sprite.physics.vy > 0){

        //Primera colisión en (xPos + xSize- 1, yPos)
        xPos = player.xPos + player.hitBox.xOffset + 1;
        yPos = player.yPos + player.hitBox.yOffset;
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

        // Segunda colision en (xPos + Size - 1, yPos + bricksize)
        yPos = player.yPos + player.hitBox.yOffset + brickSize;
        isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);
        
        //Ultima colisión en (xPos + Size - 1, yPos + ySize - 1)
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

        //Habrá colisión si toca alguno de los 3 bloques.
        isColliding = isCollidingOnPos3
        
        if (isColliding){

            player.isCollidingWithObstacleOnTheBottom = true;
            
            if (player.physics.vLimit > minSpeed){

                player.physics.vLimit -= 10;
                player.physics.speedReductionContY += 10;
            }
        }

        else{

            player.isCollidingWithObstacleOnTheBottom = false;
            
            if (player.physics.vLimit < minSpeed + player.physics.speedReductionContY){

                player.physics.vLimit += 10;
            }

            else{
                
                player.physics.speedReductionContY = 0
            }
        }
    }

    else if (sprite.physics.vy < 0){

        //Primera colisión en (xPos + xSize- 1, yPos)
        xPos = player.xPos + player.hitBox.xOffset + 1;
        yPos = player.yPos + player.hitBox.yOffset;
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

        // Segunda colision en (xPos + Size - 1, yPos + bricksize)
        yPos = player.yPos + player.hitBox.yOffset + brickSize;
        isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);
        
        //Ultima colisión en (xPos + Size - 1, yPos + ySize - 1)
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);
    
        //Habrá colisión si toca alguno de los 3 bloques.
        isColliding = isCollidingOnPos3
        
        if (isColliding){

            player.isCollidingWithObstacleOnTheTop = true;
            
            if (player.physics.vLimit > minSpeed){

                player.physics.vLimit -= 10;
                player.physics.speedReductionContY += 10;
            }
        }

        else{

            player.isCollidingWithObstacleOnTheTop = false;
            
            if (player.physics.vLimit < minSpeed + player.physics.speedReductionContY){

                player.physics.vLimit += 10;
            }

            else{
                
                player.physics.speedReductionContY = 0
            }
        }
    }
}