import globals from "./globals.js";
import {Game, SpriteID, State, FPS} from "./constans.js";
import Sprite from "./Sprite.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import {Level, level1} from "./Level.js";
import Timer from "./Timer.js";
import Physics from "./Physics.js";
import {keydownHandler, keyUpHandler} from "./events.js";

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
    globals.gameState = Game.LOADING;


    //Inicializamos los estados de las acciones
    globals.action = {

        moveLeft:   false,
        moveRight:  false,
        moveUp:     false,
        moveDown:   false
    }
}

function initEvents(){

    window.addEventListener("keydown",  keydownHandler, false);
    window.addEventListener("keyup",    keyUpHandler,   false);
}

//Carga de activos (TileMap, Images, Sounds)
function loadAssets(){

    let tileSet;

    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/spritesheet.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/spritesheetmap.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);
}

//Funcion que se carga cada vez que se llama a un activo
function loadHandler(){

    globals.assetsLoaded++;
    
    //Cuando se han cargado todos los archivos entra en el if
    if (globals.assetsLoaded === globals.assetsToLoad.length){

        for (let i = 0; i < globals.tileSets.length; i++){

            globals.tileSets[i].removeEventListener("load", loadHandler, false);
        }
        
        console.log("Assets finished loading");

        //Cambia la etapa del juego a PLAYING
        globals.gameState = Game.PLAYING;

        initSprites();
    }
}

function initTimers(){

    globals.levelTime = new Timer(0, 1);
}

function initSprites(){

    switch (globals.gameState){

        case Game.NEW_GAME:

            initNewGameSprites();
            break;

        case Game.PLAYING:

            initPlayingSprites();
            break;

        case Game.CONTROLS:

            initControlsSprites();
            break;

        case Game.SCORES:

            initScoresSprites();
            break;

        case Game.HISTORY:

            initHistorySprites();
            break;

        case Game.OVER:

            initOverSprites();
            break;
    }
}

function initPlayingSprites(){
    
    initChairInterface();
    initChild1Interface1();
    initChild2Interface1();
    initStoneInterface1();
    initWoodInterface1();
    initStoneInterface2();
    initWoodInterface2();
    initStoneInterface3();
    initWoodInterface3();
    initChild1Interface2();
    initChild2Interface2();
    initChair();
    initPlayer();
    initMagic();
    initStone();
    initWood();
    initChild1();
    initChild2();
    initEnemy1();
    initWall();
}

function initNewGameSprites(){

    initDaySky();
    initNightSky();
    initSun();
    initMoon();
    initDayCloud();
    initNightCloud();
    initBackground();
    initBlackBorder();
}

function initControlsSprites(){

    initDaySky();
    initNightSky();
    initDayCloud();
    initNightCloud();
    initMoon();
    initSun();
    initPaper();
}

function initHistorySprites(){

    initDaySky();
    initNightSky();
    initBackground();
    initMoon();
    initSun();
    initPaper();
}

function initScoresSprites(){

    initDaySky();
    initNightSky();
    initBackground();
    initMoon();
    initSun();
    initPaper();
}

function initOverSprites(){

    initChair();
    initPlayer();
    initMagic();
    initStone();
    initWood();
    initChild1();
    initChild2();
    initEnemy1();
    initWall();
    initBlack();
}

function initChairInterface(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(0, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(4);

    //Creamos nuestro sprite
    const chairInterface = new Sprite(SpriteID.CHAIR_INTERFACE, State.INTEGERITY, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(chairInterface);
}

function initChild1Interface1(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(8, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const child1Interface = new Sprite(SpriteID.CHILD_1_INTERFACE_1, State.CHILD_1_INTERFACE, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(child1Interface);
}

function initChild2Interface1(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(9, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const child2Interface = new Sprite(SpriteID.CHILD_2_INTERFACE_1, State.CHILD_2_INTERFACE, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(child2Interface);
}

function initStoneInterface1(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(6, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const stoneInterface = new Sprite(SpriteID.STONE_INTERFACE_1, State.STONE, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(stoneInterface);
}

function initWoodInterface1(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(7, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const woodInterface = new Sprite(SpriteID.WOOD_INTERFACE_1, State.WOOD, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(woodInterface);
}

function initStoneInterface2(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(6, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const stoneInterface = new Sprite(SpriteID.STONE_INTERFACE_2, State.STONE, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(stoneInterface);
}

function initWoodInterface2(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(7, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const woodInterface = new Sprite(SpriteID.WOOD_INTERFACE_2, State.WOOD, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(woodInterface);
}

function initStoneInterface3(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(6, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const stoneInterface = new Sprite(SpriteID.STONE_INTERFACE_3, State.STONE, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(stoneInterface);
}

function initWoodInterface3(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(7, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const woodInterface = new Sprite(SpriteID.WOOD_INTERFACE_3, State.WOOD, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(woodInterface);
}

function initChild1Interface2(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(8, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const child1Interface = new Sprite(SpriteID.CHILD_1_INTERFACE_2, State.CHILD_1_INTERFACE, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(child1Interface);
}

function initChild2Interface2(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(9, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const child2Interface = new Sprite(SpriteID.CHILD_2_INTERFACE_2, State.CHILD_2_INTERFACE, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(child2Interface);
}

function initChair(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(0, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(4);

    //Creamos nuestro sprite
    const chair = new Sprite(SpriteID.CHAIR, State.INTEGERITY, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(chair);
}

function initPlayer(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(1, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(8, 5);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(20);

    //Creamos nuestro sprite
    const player = new Sprite(SpriteID.PLAYER, State.IDLE, 0, 0, imageSet, frames, physics);

    //Añadimos el player el array de sprites
    globals.sprites.push(player);
}

function initMagic(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(5, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(6);

    //Creamos nuestro sprite
    const magic = new Sprite(SpriteID.MAGIC, State.MAGIC, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(magic);
}

function initStone(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(6, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const stone = new Sprite(SpriteID.STONE, State.STONE, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(stone);
}

function initWood(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(7, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const wood = new Sprite(SpriteID.WOOD, State.WOOD, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(wood);
}

function initChild1(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(10, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(10);

    //Creamos nuestro sprite
    const child1 = new Sprite(SpriteID.CHILD_1, State.CHILD_1_IDLE, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(child1);
}

function initChild2(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(14, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(9);

    //Creamos nuestro sprite
    const child2 = new Sprite(SpriteID.CHILD_2, State.CHILD_2_IDLE, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(child2);
}

function initEnemy1(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(18, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(8);

    //Creamos nuestro sprite
    const enemy1 = new Sprite(SpriteID.ENEMY_1, State.ENEMY_1_WALK, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(enemy1);
}

function initWall(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(22, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(3);

    //Creamos nuestro sprite
    const wall = new Sprite(SpriteID.WALL, State.WALL, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(wall);
}

function initMoon(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(23, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Valores iniciales para las fisicas
    const initAngle     = 270 * Math.PI / 180;
    const omega         = 0.1;
    const xRotCenter    = globals.canvas.width / 2;
    const yRotCenter    = globals.canvas.height / 2;

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(60, 0, 1, 0, omega, initAngle, xRotCenter, yRotCenter);

    //Creamos nuestro sprite
    const moon = new Sprite(SpriteID.MOON, State.MOON, 0, 0, imageSet, frames, physics);

    //Añadimos el player el array de sprites
    globals.sprites.push(moon);
}

function initSun(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(23, 1, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Valores iniciales para las fisicas
    const initAngle     = 90 * Math.PI / 180;
    const omega         = 0.1;
    const xRotCenter    = globals.canvas.width / 2;
    const yRotCenter    = globals.canvas.height / 2;

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(60, 0, 1, 0, omega, initAngle, xRotCenter, yRotCenter);

    //Creamos nuestro sprite
    const sun = new Sprite(SpriteID.SUN, State.SUN, 0, 0, imageSet, frames, physics);

    //Añadimos el player el array de sprites
    globals.sprites.push(sun);
}

function initBackground(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(24, 0, 608, 300, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const background = new Sprite(SpriteID.BACK_GROUND, State.BACK_GROUND, 124, globals.canvas.height / 3, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(background);
}

function initNightSky(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(35, 0, 608, 344, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const nightSky = new Sprite(SpriteID.NIGHT_SKY, State.NIGHT_SKY, 124, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(nightSky);
}

function initDaySky(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(29, 0, 608, 344, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const daySky = new Sprite(SpriteID.DAY_SKY, State.DAY_SKY, 124, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(daySky);
}

function initNightCloud(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(45, 0, 1216, 240, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(50);

    //Creamos nuestro sprite
    const nightCloud = new Sprite(SpriteID.NIGHT_CLOUD, State.NIGHT_CLOUD, -470, 0, imageSet, frames, physics);

    //Añadimos el player el array de sprites
    globals.sprites.push(nightCloud);
}

function initDayCloud(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(41, 0, 1216, 240, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(50);

    //Creamos nuestro sprite
    const dayCloud = new Sprite(SpriteID.DAY_CLOUD, State.DAY_CLOUD, -1216, 0, imageSet, frames, physics);

    //Añadimos el player el array de sprites
    globals.sprites.push(dayCloud);
}

function initPaper(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(41, 0, 640, 320, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const paper = new Sprite(SpriteID.PAPER, State.PAPER, 300, 45, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(paper);
}

function initBlack(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(46, 0, 640, 500, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const black = new Sprite(SpriteID.BLACK, State.BLACK, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(black);
}

function initBlackBorder(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(64, 0, 855, 500, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const blackBorder = new Sprite(SpriteID.BLACK_BORDER, State.BLACK_BORDER, 0, 0, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(blackBorder);
}

function initLevel(){

    //Creamos las propiedades de las imagenes del mapa
    const imageSet = new ImageSet(0, 0, 64, 64, 64, 0, 0);

    //Creamos y guardamos nuestro nivel
    globals.level = new Level(level1, imageSet);
}

export{

    initHTMLelements,
    initVars,
    initEvents,
    loadAssets,
    initSprites,
    initLevel,
    initTimers
}