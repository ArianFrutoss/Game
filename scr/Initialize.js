import globals from "./globals.js";
import {Game, FPS} from "./constans.js";

//Función que inicializa los elementos HTML
function initHTMLelements(){

    //Inicializar CANVAS
    globals.canvas = document.getElementById("gameScreen");

    //Inicializar CONTEXT
    globals.ctx = globals.canvas.getContext("2d");

    //Eliminar Anti-Aliasing
    globals.ctx.imageSmoothingEnabled = false;

    //Caja de texto para pruebas
    globals.txtPruebas = document.getElementById("txtPruebas");
}

//Función que inicializa las variables del juego
function initVars(){

    //Inicializar variables de gestión de tiempo
    globals.previousCycleMilliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS;
    globals.gameState = Game.lOADING;
}

export{

    initHTMLelements,
    initVars
}