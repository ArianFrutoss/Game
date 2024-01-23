import {Key, SpriteID} from "./constans.js";
import globals from "./globals.js";
import {PlayerPosition} from "./constans.js";

export function keydownHandler(event){

    switch (event.keyCode){

        case Key.UP:

            globals.action.moveUp = true;
            break;
        
        case Key.DOWN:

            globals.action.moveDown = true;
            break;

        case Key.LEFT:

            globals.action.moveLeft = true;
            break;

        case Key.RIGHT:

            globals.action.moveRight = true;
            break;

        case Key.BUILD:

            globals.action.build = true;

            for (let i = 0; i < globals.sprites.length; i++){
                
                if (globals.sprites[i].id === SpriteID.PLAYER){

                    const brickSize = globals.level.imageSet.gridSize;
                    const playerPositionYRest = globals.sprites[i].yPos % brickSize;

                    PlayerPosition.POSITION_X = globals.sprites[i].xPos;

                    if (playerPositionYRest > brickSize / 2){

                        PlayerPosition.POSITION_Y = globals.sprites[i].yPos + brickSize - playerPositionYRest;
                    }

                    else{

                        PlayerPosition.POSITION_Y = globals.sprites[i].yPos - playerPositionYRest;  
                    }
                }
            }
            
            break;

        case Key.ATTACK_CHILD:

            globals.action.attackChild = true;
            break;

        case Key.ATTACK:

            globals.action.attack = true;
            break;
    }
}

export function keyupHandler(event){

    switch (event.keyCode){

        case Key.UP:

            globals.action.moveUp = false;
            break;

        case Key.DOWN:

            globals.action.moveDown = false;
            break;

        case Key.LEFT:

            globals.action.moveLeft = false;
            break;

        case Key.RIGHT:

            globals.action.moveRight = false;
            break;

        case Key.ATTACK:

            globals.action.attack = false;
            break;
    }
}