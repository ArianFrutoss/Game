import globals from "./globals.js";
import {Block, SpriteID} from "./constans.js";

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
         
        if (sprite.yPos > 0 && sprite.id === SpriteID.PLAYER || sprite.id === SpriteID.ENEMY_1 || sprite.id === SpriteID.CHILD_1 || sprite.id === SpriteID.CHILD_2){
            
            detectCollisionsBetweenSpritesAndLakes(sprite);
        }   
        
        if (sprite.id === SpriteID.PLAYER || sprite.id === SpriteID.ENEMY_1 || sprite.id === SpriteID.CHILD_1 || sprite.id === SpriteID.CHILD_2 || sprite.id === SpriteID.MAGIC){
            
            detectCollisionsBetweenSpritesAndWall(sprite);
        }

        if (sprite.id === SpriteID.ENEMY_1){
           
            detectCollisionsBetweenChairAndEnemy(sprite);
            detectCollisionsBetweenMagicAndEnemy(sprite);
            
        }

        if (sprite.id === SpriteID.PLAYER){
            
            detectCollisionsBetweenPlayerAndBorders(sprite);
            detectCollisionsBetweenPlayerAndObjects(sprite);
            detectCollisionsBetweenCameraAndBorders(sprite);
        }
    }
}

function detectCollisionsBetweenChairAndEnemy(sprite){

    for (let i = 0; i < globals.sprites.length; i++){

        if (globals.sprites[i].id === SpriteID.CHAIR){
            
            const chair = globals.sprites[i];
        
            sprite.isCollidingWithChair = false;

            //Datos de la chair
            const x1 = chair.xPos + chair.hitBox.xOffset;
            const y1 = chair.yPos + chair.hitBox.yOffset;
            const w1 = 1;
            const h1 = chair.hitBox.ySize;

            //Datos del otro sprite
            const x2 = sprite.xPos + sprite.hitBox.xOffset;
            const y2 = sprite.yPos + sprite.hitBox.yOffset;
            const w2 = 1;
            const h2 = sprite.hitBox.ySize;

            const isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2);

            //Existe collision
            if (isOverlap){
                
                sprite.isCollidingWithChair = true;
            }
        }
    }
}

function detectCollisionsBetweenMagicAndEnemy(sprite){

    for (let i = 0; i < globals.sprites.length; i++){

        if (globals.sprites[i].id === SpriteID.MAGIC){

            const magic = globals.sprites[i];
        
            sprite.isCollidingWithEnemy = false;

            //Datos de la magic
            const x1 = magic.xPos + magic.hitBox.xOffset;
            const y1 = magic.yPos + magic.hitBox.yOffset;
            const w1 = magic.hitBox.xSize;
            const h1 = magic.hitBox.ySize;

            //Datos del otro sprite
            const x2 = sprite.xPos + sprite.hitBox.xOffset;
            const y2 = sprite.yPos + sprite.hitBox.yOffset;
            const w2 = sprite.hitBox.xSize;
            const h2 = sprite.hitBox.ySize;

            const isOverlap = rectIntersect(x1, y1, w1, h1 + h1, x2, y2, w2, h2);

            //Existe collision
            if (isOverlap && sprite.hp > 0){
                
                globals.sprites.splice(i, 1);
                sprite.isCollidingWithEnemy = true;
                sprite.hp -= 1;
            }
        }
    }
}

function detectCollisionsBetweenPlayerAndBorders(sprite){
    
    let overlap;

    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;
    const numBlocksX = levelData[0].length;
    const numBlocksY = levelData.length;

    //Datos del player
    const x1 = sprite.xPos + sprite.hitBox.xOffset;
    const y1 = sprite.yPos + sprite.hitBox.yOffset;
    const w1 = sprite.hitBox.xSize;
    const h1 = sprite.hitBox.ySize;

    if (x1 < 0){

        overlap = x1 - 1;
        sprite.xPos -= overlap;
    }

    if (x1 > numBlocksX * brickSize - sprite.hitBox.xOffset){
        
        overlap = numBlocksX * brickSize - x1 - w1 - 1;
        sprite.xPos += overlap;
    }

    if (y1 < 0){
        
        overlap = y1 - 1;
        sprite.yPos -= overlap;
    }
    
    if (y1 + h1 > numBlocksY * brickSize - sprite.imageSet.yOffset){
        
        overlap = numBlocksY * brickSize - y1 - h1 + sprite.imageSet.yOffset - 1;
        sprite.yPos += overlap;
    }
}

function detectCollisionsBetweenPlayerAndObjects(sprite){
    
    for (let i = 0; i < globals.sprites.length; i++){

        if (globals.sprites[i].id === SpriteID.STONE || globals.sprites[i].id === SpriteID.WOOD){

            const object = globals.sprites[i];
        
            sprite.isCollidingWithObject = false;

            //Datos de la magic
            const x1 = object.xPos + object.hitBox.xOffset;
            const y1 = object.yPos + object.hitBox.yOffset;
            const w1 = object.hitBox.xSize;
            const h1 = object.hitBox.ySize;

            //Datos del otro sprite
            const x2 = sprite.xPos + sprite.hitBox.xOffset;
            const y2 = sprite.yPos + sprite.hitBox.yOffset;
            const w2 = sprite.hitBox.xSize;
            const h2 = sprite.hitBox.ySize;

            const isOverlap = rectIntersect(x1, y1, w1, h1 + h1, x2, y2, w2, h2);

            //Existe collision
            if (isOverlap){
                
                object.isCollidingWithObject = true;
            }
        }
    }
}

function detectCollisionsBetweenCameraAndBorders(player){

    if (player.xPos >= 100){
        
        globals.camera.isCollidingWithBorderLeft = false;
    }

    else if (globals.camera.x <= 0){
       
        globals.camera.isCollidingWithBorderLeft = true;
    }

    if (player.xPos <= globals.camera.x + 100){
        
        globals.camera.isCollidingWithBorderRight = false;
    }

    else if (globals.camera.x >= globals.canvas.width - player.xPos - player.imageSet.xSize + globals.canvasHUD.width){
        
        globals.camera.isCollidingWithBorderRight = true;
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

function detectCollisionsBetweenSpritesAndLakes(sprite){

    if (sprite.yPos + sprite.hitBox.yOffset + sprite.hitBox.ySize + 1 < globals.canvas.height && sprite.yPos > 0){
    
        //Variables a usar
        let xPos;
        let yPos;
        let isCollidingOnPos1;
        let isCollidingOnPos2;
        let isColliding;
        
        const brickSize = globals.level.imageSet.gridSize;

        sprite.isCollidingWithTheLake = false;

        //Id del obstaculo
        const obstacleId = Block.BLOCK_3;

        yPos = sprite.yPos + sprite.hitBox.yOffset + sprite.hitBox.ySize + 1;

        xPos = sprite.xPos + sprite.hitBox.xOffset + sprite.hitBox.xSize + 1;
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

        xPos = sprite.xPos + sprite.hitBox.xOffset + 1;
        isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

        isColliding = isCollidingOnPos1 || isCollidingOnPos2;
        
        if (isColliding){

            sprite.isCollidingWithTheLake = true;
        }
    }
}

function detectCollisionsBetweenSpritesAndWall(sprite){

    for (let i = 0; i < globals.activeWall.length; i++){
        
        //Variables a usar
        let overlap;
        let isOverlap;

        const wall = globals.activeWall[i];

        sprite.isCollidingWithWall = false;

        //Datos del wall
        const x1 = wall.xPos + wall.hitBox.xOffset;
        const y1 = wall.yPos + wall.hitBox.yOffset;
        const w1 = wall.hitBox.xSize;
        let h1;

        //Datos del otro sprite
        const x2 = sprite.xPos + sprite.hitBox.xOffset;
        const y2 = sprite.yPos + sprite.hitBox.yOffset;
        const w2 = sprite.hitBox.xSize;
        const h2 = sprite.hitBox.ySize;
        
        let xPos1 = sprite.xPos + sprite.hitBox.xOffset + sprite.hitBox.xSize + 1;
        let xPos2 = sprite.xPos + sprite.hitBox.xOffset + 1;

        if (sprite.id === SpriteID.MAGIC){

            h1 = wall.hitBox.ySize;
            isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2);
        }

        else{

            h1 = xPos1 - xPos2;
            isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2);
        }

        //Existe collision
        if (isOverlap){
            
            sprite.isCollidingWithWall = true;
                
            if (sprite.id != SpriteID.MAGIC){

                if (sprite.physics.vx > 0){
                    
                    overlap = x1 - x2 - w2 - 1;
                    sprite.xPos += overlap;
                }

                else if (sprite.physics.vx < 0){
                    
                    overlap = x1 - x2 + w1 + 1;
                    sprite.xPos += overlap;
                }

                else if (sprite.physics.vy > 0){
                    
                    overlap = y1 - y2 - h2 - 1;
                    sprite.yPos += overlap;
                }

                else if (sprite.physics.vy < 0){
                    
                    overlap = y1 - y2 + h1 + 1;
                    sprite.yPos += overlap;
                }
            }
        }
    }
}