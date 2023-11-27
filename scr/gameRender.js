import globals from "./globals.js";
import {Game} from "./constans.js";

export default function render(){
    
    //Cambia lo que el juego esta dibujando dependiendo de la etapa del juego
    switch (globals.gameState){

        case Game.lOADING:
            //Dibuja la barra de carga del juego
            break;

        case Game.PLAYING:
            //Llama a la funcion que dibuja el juego
            drawGame();
            break;

        default:
            console.error("Error: Game State Invalid");
    }
}