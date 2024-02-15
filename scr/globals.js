//Variables globales
import {Game, Letters} from "./constans.js";

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

    //Tiempo de ciclo de juego real (segundos)
    deltaTime: 0,

    //Tiempo de ciclo de juego real (segundos)
    cycleRealTime: 0,

    //Tiempo de ciclo objetivo (seconds, constante)
    frameTimeObj: 0,

    //Caja de texto para mostrar datos de depuración
    txtPruebas: {},

    //Sonidos
    sounds: [],

    //Estado del sonido
    currentSound: -1,

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
    enemySpawnTime: {},

    //Temporizador aparicion de enemigos
    enemyDespawnTime: {},

    //Temporizador aparicion de nubes
    cloudSpawnTime: {},

    //Temporizador para cambiar de posicion del menu
    menuPositionTime: {},

    //Objeto que guarda el estado de la tecla pulsada
    action: {},

    //Chair HP
    chairHP: 0,

    //Score
    score: 0,

    //HighScore
    highScore: 0,

    //Stone
    stoneCont: 10,

    //Wood
    woodCont: 10,

    //Contador de material
    materialCont: 0,

    //Cuando se pulsa a la tecla se cambia el valor
    magicActive:  0,

    //Array de particulas
    particles: [],

    //Objeto que guarda la camara
    camera: {},
    
    //Contador de en que posicion esta en el menu
    gameStateCont: 2,

    //Contador de palabras del texto de historia
    historyTextWordCont: 0,

    //Texto de historia
    historyText: [],

    //Temporizador de aparicion de palabras del texto de historia
    historyTextTime: [],

    //Temporizador de cambio de pagina del texto de historia
    historyPageChangeTime: [],

    //Variable para cambiar de pagina
    historyPageChange: 0,

    //Nivel en el que estas
    levels: 0,

    //Nombre del usuario
    name: [Letters[0], Letters[0], Letters[0]],

    //Posicion de la letra
    lettercont: [0, 0, 0],

    //Posicion de la letra
    letterPos: 0,

    //Array de los jugadores
    players: [],

    //Seleccionar jugadores
    selectPlayers:  0,

    //Temporizador de movimiento de la pantalla de scores
    scoreMovementTime: [],

    //Contador de guiones
    scriptCont: 0,

    //Variable para saber que los archivos estan cargados
    assetsAreLoaded: false,
};