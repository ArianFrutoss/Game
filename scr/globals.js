//Variables globales
import {Game} from "./constans.js";

export default{

    //Acceso al canvas y context
    canvas:             {},
    canvasPlaying:      {},
    ctx:                {},
    ctxPlaying:         {},

    //Estado de juego. Inicializamos a INVÁLIDO
    gameState: Game.INVALID,

    //Tiempo de ciclo anterior (milliseconds)
    previousCycleMilliseconds: -1,

    //Tiempo de ciclo de juego real (seconds)
    deltaTime: 0,

    //Tiempo de ciclo objetivo (seconds, constante)
    frameTimeObj: 0,

    //Caja de texto para mostrar datos de depuración
    txtPruebas: {},

    //Objeto para guardar datos del tileSet
    tileSets: [],

    //Datos del nivel
    level: {},

    //Variable para gestionar la carga de archivos
    assetsToLoad: [],
    assetsLoaded: 0,

    //Array con datos de los sprites
    sprites: []
};