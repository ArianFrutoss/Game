import globals from "./globals.js";
import {Game, SpriteID, State, FPS, ParticleState, particleID} from "./constans.js";
import WaterParticle from "./Particle.js";
import Sprite, { Enemy1, HudSprites, Player } from "./Sprite.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import {Level, level1, spriteLevel1} from "./Level.js";
import Timer from "./Timer.js";
import Physics from "./Physics.js";
import {keydownHandler, keyupHandler} from "./events.js";
import HitBox from "./HitBox.js";
import Camera from "./Camera.js";

//Función que inicializa los elementos HTML
function initHTMLelements(){

    //Inicializar GAME
    globals.canvas = document.getElementById("gameScreen");
    globals.ctx = globals.canvas.getContext("2d");

    //Inicializar HUD
    globals.canvasHUD = document.getElementById("gameHUD");
    globals.ctxHUD = globals.canvasHUD.getContext("2d");

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

        moveLeft:       false,
        moveRight:      false,
        moveUp:         false,
        moveDown:       false,
        build:          false,
        attackChild:    false,
        attack:         false
    }
}

function initEvents(){

    window.addEventListener("keydown",  keydownHandler, false);
    window.addEventListener("keyup",    keyupHandler,   false);
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
        globals.gameState = Game.NEW_GAME_LOAD;
    }
}

function initTimers(){

    globals.levelTime = new Timer(30, 1);
    globals.lakesTime = new Timer(30, 1);
    globals.EnemySpawnTime = new Timer(5, 1);
    globals.EnemyDespawnTime = new Timer(5, 1);
}

function initParticles(){

}

function initCamera(){

    globals.camera = new Camera(0);
}

function initWaterParticles(spriteXpos, spriteYpos){

    const numParticles  = 10;
    const xInit         = spriteXpos;
    const yInit         = spriteYpos;
    const radius        = 1;
    const timeToFadeMax = 1;
    const alpha         = 1.0;

    for (let i = 0; i < numParticles; i++){

        const velocity = Math.random() * 15 + 5;
        const physics = new Physics(velocity);

        const timeToFade = timeToFadeMax * Math.random() + 1;
        const particle = new WaterParticle(particleID.WATER, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade);

        //Asignamos velocidades segun angulo aleatorio
        const randomAngle = Math.random() * 2 * Math.PI;
        particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle);
        particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle);

        globals.particles.push(particle);
    }
}

function initSprites(){

    // //Creamos las propiedades de las imagenes del mapa
    // const imageSet = new ImageSet(0, 0, 64, 64, 64, 0, 0);

    // //Creamos y guardamos nuestros sprites en el mapa
    // globals.levelSprites = new Level(spriteLevel1, imageSet);

    // const brickSize = globals.levelSprites.imageSet.gridSize;
    // const levelData = globals.levelSprites.data;

    // //Dibujamos el mapa
    // const num_fil = levelData.length;
    // const num_col = levelData[0].length;
        
    // for (let i = 0; i < num_fil - 7; i++){

    //     for (let j = 0; j < num_col; j++){

    //         const xPos = j * brickSize;
    //         const yPos = i * brickSize;

    //         if (levelData[i][j] === globals.sprites[i].id){

    //             globals.sprites[i].xPos = xPos;
                
    //             globals.sprites[i].xPos = yPos;
    //         }
    //     }
    // }

    initPlayingSprites();
    initNewGameSprites();
    initControlsSprites();
    initHistorySprites();
    initScoresSprites();
    initOverSprites();
}

function initPlayingSprites(){

    initPlayer();
    initChild1();
    initChild2();
    initChair();
    initChairInterface();
    initStoneInterface1();
    initWoodInterface1();
    initStoneInterface2();
    initWoodInterface2();
    initStoneInterface3();
    initWoodInterface3();
    initChild1Interface2();
    initChild2Interface2();
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
    initSun();
    initMoon();
    initDayCloud();
    initNightCloud();
    initBackground();
    initBlackBorder();
    initPaper();
}

function initHistorySprites(){

    initDaySky();
    initNightSky();
    initSun();
    initMoon();
    initDayCloud();
    initNightCloud();
    initBackground();
    initBlackBorder();
    initPaper();
}

function initScoresSprites(){

    initDaySky();
    initNightSky();
    initSun();
    initMoon();
    initDayCloud();
    initNightCloud();
    initBackground();
    initBlackBorder();
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
    const frames = new Frames(4, 100);

    //Creamos nuestro sprite
    const chairInterface = new HudSprites(SpriteID.CHAIR_INTERFACE, State.INTEGRITY, 95, 100, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(chairInterface);
}

function initStoneInterface1(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(6, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const stoneInterface = new HudSprites(SpriteID.STONE_INTERFACE_1, State.STONE, 40, 195, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(stoneInterface);
}

function initWoodInterface1(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(7, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const woodInterface = new HudSprites(SpriteID.WOOD_INTERFACE_1, State.WOOD, 40, 240, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(woodInterface);
}

function initStoneInterface2(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(6, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const stoneInterface = new HudSprites(SpriteID.STONE_INTERFACE_2, State.STONE, -5, 330, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(stoneInterface);
}

function initWoodInterface2(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(7, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const woodInterface = new HudSprites(SpriteID.WOOD_INTERFACE_2, State.WOOD, 85, 330, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(woodInterface);
}

function initStoneInterface3(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(6, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const stoneInterface = new HudSprites(SpriteID.STONE_INTERFACE_3, State.STONE, -5, 370, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(stoneInterface);
}

function initWoodInterface3(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(7, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const woodInterface = new HudSprites(SpriteID.WOOD_INTERFACE_3, State.WOOD, 85, 370, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(woodInterface);
}

function initChild1Interface2(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(8, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const child1Interface = new HudSprites(SpriteID.CHILD_1_INTERFACE_2, State.CHILD_1_INTERFACE, 175, 330, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(child1Interface);
}

function initChild2Interface2(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(9, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const child2Interface = new HudSprites(SpriteID.CHILD_2_INTERFACE_2, State.CHILD_2_INTERFACE, 175, 370, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(child2Interface);
}

function initChair(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(0, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(4, 100);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(27, 500, 18, -200);

    //Creamos nuestro sprite
    const chair = new Sprite(SpriteID.CHAIR, State.INTEGRITY, 0, 192, imageSet, frames, 0, hitBox);

    //Añadimos el player el array de sprites
    globals.sprites.push(chair);
}

function initPlayer(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(1, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(7, 2);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(180);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(20, 48, 21, 11);
    const hitBoxCamera = new HitBox(815, 48, -355, 11);

    //Creamos nuestro sprite
    const player = new Player(SpriteID.PLAYER, State.IDLE, 64, 184, imageSet, frames, physics, hitBox, hitBoxCamera);

    //Añadimos el player el array de sprites
    globals.sprites.push(player);
}

function initMagic(playerXpos, playerYpos){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(5, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(5, 1);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(200);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(18, 18, 23, 25);

    //Creamos nuestro sprite
    const magic = new Sprite(SpriteID.MAGIC, State.MAGIC, playerXpos, playerYpos + 2, imageSet, frames, physics, hitBox);

    //Añadimos el player el array de sprites
    globals.sprites.push(magic);
}

function initStone(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(6, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(10);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(23, 15, 21, 29);

    //Creamos nuestro sprite
    const stone = new Sprite(SpriteID.STONE, State.STONE, 190, 260, imageSet, frames, physics, hitBox);

    //Añadimos el player el array de sprites
    globals.sprites.push(stone);
}

function initWood(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(7, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(10);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(20, 20, 22, 24);

    //Creamos nuestro sprite
    const wood = new Sprite(SpriteID.WOOD, State.WOOD, 120, 110, imageSet, frames, physics, hitBox);

    //Añadimos el player el array de sprites
    globals.sprites.push(wood);
}

function initChild1(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(10, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(7, 3);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(100);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(16, 38, 24, 21);

    //Creamos nuestro sprite
    const child1 = new Sprite(SpriteID.CHILD_1, State.CHILD_1_IDLE, 0, 372, imageSet, frames, physics, hitBox);

    //Añadimos el player el array de sprites
    globals.sprites.push(child1);
}

function initChild2(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(14, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(6, 3);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(100);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(16, 39, 24, 19);

    //Creamos nuestro sprite
    const child2 = new Sprite(SpriteID.CHILD_2, State.CHILD_2_IDLE, 0, 0, imageSet, frames, physics, hitBox);

    //Añadimos el player el array de sprites
    globals.sprites.push(child2);
}

function initEnemy1(yPos){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(18, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(6, 2);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(60);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(18, 45, 22, 10);

    //Creamos nuestro sprite
    const enemy1 = new Enemy1(SpriteID.ENEMY_1, State.ENEMY_1_RUN, 1200, yPos, imageSet, frames, physics, hitBox);

    //Añadimos el player el array de sprites
    globals.sprites.push(enemy1);
}

function initWall(childXpos, childYpos){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(22, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(3, 100);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(24, 60, 16, 4);

    //Creamos nuestro sprite
    const wall = new Sprite(SpriteID.WALL, State.WALL, childXpos + 30, childYpos, imageSet, frames, 0, hitBox);

    //Añadimos el player el array de sprites
    globals.sprites.push(wall);

    //Activar muros
    globals.activeWall.push(wall);
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
    const imageSet = new ImageSet(49, 0, 640, 320, 64, 0, 0);

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
    initLevel,
    initTimers,
    initPlayingSprites,
    initNewGameSprites,
    initControlsSprites,
    initHistorySprites,
    initScoresSprites,
    initOverSprites,
    initSprites,
    initWall,
    initMagic,
    initEnemy1,
    initParticles,
    initWaterParticles,
    initCamera
}