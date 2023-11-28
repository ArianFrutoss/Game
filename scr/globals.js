//Variables globales
import {Game} from "./constans.js";

export default{

    //Acceso al canvas y context
    canvas: {},
    ctx: {},

    //Estado de juego. Inicializamos a INVÁLIDO
    gameState: Game.INVALID,

    //Tiempo de ciclo anterior (milliseconds)
    previousCycleMilliseconds: -1,

    //Tiempo de ciclo de juego real (seconds)
    deltaTime: 0,

    //Tiempo de ciclo objetivo (seconds, constante)
    frameTimeObj: 0,

    //Caja de texto para mostrar datos de depuración
    txtPruebas: {}
};