//Variables globales
import {Game} from "./constans.js";

export default{

    //Acceso al canvas y context
    canvas:             {},
    ctx:                {},
    canvasHUD:          {},
    ctxHUD:             {},

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

    //Datos de los sprites del nivel
    levelSprites: {},

    //Variable para gestionar la carga de archivos
    assetsToLoad: [],
    assetsLoaded: 0,

    //Array con datos de los sprites
    sprites: [],

    //Temporizador nivel
    levelTime: {},

    //Temporizador Lagos
    lakesTime: {},

    //Temporizador aparicion de enemigos
    EnemySpawnTime: {},

    //Temporizador aparicion de enemigos
    EnemyDespawnTime: {},

    //Temporizador aparicion de nubes
    cloudSpawnTime: {},

    //Temporizador para cambiar de posicion del menu
    menuPositionTime: {},

    //Objeto que guarda el estado de la tecla pulsada
    action: {},

    //Muros
    activeWall: [],

    //Chair HP
    chairHP: 0,

    //Score
    score: 0,

    //Array de particulas
    particles: [],

    //Objeto que guarda la camara
    camera: {},
    
    //Contador de en que posicion esta en el menu
    gameStateCont: 2
};