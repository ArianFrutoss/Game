import {Key} from "./constans";
import globals from "./globals";

export function keydownHandler(event){

    switch (event.KeyCode){

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
    }
}

export function keyUpHandler(event){

    switch (event.KeyCode){

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
    }
}