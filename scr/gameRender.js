import globals from "./globals.js";
import {FPS, Game} from "./constans.js";

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

function drawGame(){

    //Borrar la pantalla
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);

    //Pintar los FPS
    globals.ctx.fillText("FPS: " + 1 / globals.deltaTime, 1,10);
}