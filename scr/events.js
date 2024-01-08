import {Key, SpriteID} from "./constans.js";
import globals from "./globals.js";
import {PlayerPosition} from "./constans.js";
import Sprite from "./Sprite.js";

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
            PlayerPosition.POSITION_X = globals.sprites[0].xPos;
            PlayerPosition.POSITION_Y = globals.sprites[0].yPos;
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