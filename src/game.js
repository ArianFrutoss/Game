import globals from "./globals.js";
import {initHTMLelements, loadAssets, initVars, initTimers, initEvents, initCamera} from "./Initialize.js";
import update from "./gameLogic.js";
import render from "./gameRender.js";

//Game init
window.onload = init;

function init(){

    //Inicializamos los elementos HTML: Canvas, Context, Caja de texto de pruebas
    initHTMLelements();

    //Cargamos los activos
    loadAssets();

    //Inicialización de variables del juego
    initVars();

    //Inicializamos el Timer del juego
    initTimers();

    //Inicializamos los eventos de teclas
    initEvents();

    //Inicializamos la camara
    initCamera();
    
    //Empezar el primer frame request
    window.requestAnimationFrame(gameLoop);
}

//Game execute
//Bucle principal de ejecución
function gameLoop(timeStamp){

    //Seguir solicitando nuevos frames
    window.requestAnimationFrame(gameLoop, globals.canvas);

    //Tiempo real de ciclo de ejecución
    const elapsedCycleSeconds = (timeStamp - globals.previousCycleMilliseconds) / 1000;

    //Tiempo anterior de ciclo de ejecución
    globals.previousCycleMilliseconds = timeStamp;

    //Variable que corrige el tiempo de frame debido a retrasos con respecto al tiempo objetivo (frameTImeObj)
    globals.deltaTime += elapsedCycleSeconds;
    globals.cycleRealTime += elapsedCycleSeconds;

    if (globals.cycleRealTime >= globals.frameTimeObj){
        
        //Funcion para cargar lo que esta ocurriendo en el juego
        update();

        //Funcion para pintar el juego
        render();

        //Corregimos los excesos de tiempo
        globals.cycleRealTime -= globals.frameTimeObj;
        globals.deltaTime = 0;
    }
}