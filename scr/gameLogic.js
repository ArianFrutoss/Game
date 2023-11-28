import globals from "./globals.js";
import {Game} from "./constans.js";

export default function update(){

    //Cambia lo que esta haciendo el juego dependiendo de la etapa en la que este el juego
    switch (globals.gameState){

        case Game.lOADING:
            console.log("Loading assets...");
            break;

        case Game.PLAYING:
            playGame();
            break;

        default:
            console.error("Error: Game State Invalid");
    }
}

function playGame(){

}