import globals from "./globals.js";
import {Game, SpriteID, State, FPS, ParticleState, ParticleID} from "./constans.js";
import WaterParticle from "./Particle.js";
import Sprite, {Enemy1, HudSprites, Wall} from "./Sprite.js";
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

    globals.levelTime = new Timer(180, 1);
    globals.lakesTime = new Timer(30, 1);
    globals.EnemySpawnTime = new Timer(5, 1);
    globals.EnemyDespawnTime = new Timer(2, 1);
    globals.cloudSpawnTime = new Timer(160, 1);
    globals.menuPositionTime = new Timer(2, 0.15);
    globals.historyTime = new Timer(10, 1);
}

function initParticles(){

    
}

function initWaterParticles(spriteXpos, spriteYpos){

    const numParticles  = 10;
    const xInit         = spriteXpos;
    const yInit         = spriteYpos;
    const radius        = 1;
    const timeToFadeMax = 0.5;
    const alpha         = 1.0;

    for (let i = 0; i < numParticles; i++){

        const velocity = Math.random() * 5 + 5;
        const physics = new Physics(velocity);

        const timeToFade = timeToFadeMax * Math.random() + 1;
        const particle = new WaterParticle(ParticleID.WATER, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade);
        
        //Asignamos velocidades segun angulo aleatorio
        const randomAngle = Math.random() * 5 * Math.PI;
        particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle);
        particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle);

        globals.particles.push(particle);
    }
}

function initMagicParticles(spriteXpos, spriteYpos){

    const numParticles  = 10;
    const xInit         = spriteXpos;
    const yInit         = spriteYpos;
    const radius        = 1;
    const timeToFadeMax = 0.5;
    const alpha         = 1.0;

    for (let i = 0; i < numParticles; i++){

        const velocity = Math.random() * 5 + 5;
        const physics = new Physics(velocity);

        const timeToFade = timeToFadeMax * Math.random() + 1;
        const particle = new WaterParticle(ParticleID.WATER, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade);
        
        //Asignamos velocidades segun angulo aleatorio
        const randomAngle = 5 * Math.PI;
        particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle);
        particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle);

        globals.particles.push(particle);
    }
}

function initCamera(){

    globals.camera = new Camera(0);
}

function initSprites(){

    initPlayingSprites();
    initNewGameSprites();
    initControlsSprites();
    initHistorySprites();
    initScoresSprites();
    initOverSprites();
}

function initPlayingSprites(){

    //Creamos las propiedades de las imagenes del mapa
    const imageSet = new ImageSet(0, 0, 64, 64, 64, 0, 0);

    //Creamos y guardamos nuestro nivel
    globals.levelSprites = new Level(spriteLevel1, imageSet);

    //Tamaño de los bloques del mapa
    const brickSize = globals.levelSprites.imageSet.gridSize;

    for (let i = 0; i < spriteLevel1.length; i++){

        for (let j = 0; j < spriteLevel1[0].length; j++){

            const id = globals.levelSprites.data[i][j];
            const positionX = j * brickSize;
            const positionY = i * brickSize;
            
            switch (id){

                case SpriteID.CHAIR:
                    
                    initChair(positionX, positionY);
                    break;

                case SpriteID.PLAYER:

                    initPlayer(positionX, positionY);
                    break;
                
                case SpriteID.CHILD_1:
                    
                    initChild1(positionX, positionY);
                    break;

                case SpriteID.CHILD_2:

                    initChild2(positionX, positionY);
                    break;

                default:

                    break;
            }
        }
    }

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

    initNightSky();
    initDaySky();
    initSun();
    initMoon();
    initDayCloud();
    initNightCloud();
    initBackground();
    initBlackBorder();
    initChairMenu();
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

    initBlackBorder();
    initBlack();  
}

function initChairMenu(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(0, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(4, 100);
    
    //Creamos nuestro sprite
    const chairMenu = new Sprite(SpriteID.CHAIR_MENU, State.INTEGRITY, 160, 165, imageSet, frames);

    //Añadimos el player el array de sprites
    globals.sprites.push(chairMenu);
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

function initChair(positionX, positionY){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(0, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(4, 100);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(27, 500, 18, -200);

    //Creamos nuestro sprite
    const chair = new Sprite(SpriteID.CHAIR, State.INTEGRITY, positionX, positionY, imageSet, frames, 0, hitBox);

    //Añadimos el player el array de sprites
    globals.sprites.push(chair);
}

function initPlayer(positionX, positionY){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(1, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(7, 2);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(200);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(20, 48, 21, 11);

    //Creamos nuestro sprite
    const player = new Sprite(SpriteID.PLAYER, State.IDLE, positionX, positionY, imageSet, frames, physics, hitBox);

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

function initStone(spawnXpos, spawnYpos){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(6, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(10);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(23, 15, 21, 29);

    //Creamos nuestro sprite
    const stone = new Sprite(SpriteID.STONE, State.STONE, spawnXpos, spawnYpos, imageSet, frames, physics, hitBox);

    //Añadimos el player el array de sprites
    globals.sprites.push(stone);
}

function initWood(spawnXpos, spawnYpos){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(7, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(10);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(20, 20, 22, 24);

    //Creamos nuestro sprite
    const wood = new Sprite(SpriteID.WOOD, State.WOOD, spawnXpos, spawnYpos, imageSet, frames, physics, hitBox);

    //Añadimos el player el array de sprites
    globals.sprites.push(wood);
}

function initChild1(positionX, positionY){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(10, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(7, 3);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(100);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(16, 38, 24, 21);

    //Creamos nuestro sprite
    const child1 = new Sprite(SpriteID.CHILD_1, State.CHILD_1_IDLE, positionX, positionY, imageSet, frames, physics, hitBox);

    //Añadimos el player el array de sprites
    globals.sprites.push(child1);
}

function initChild2(positionX, positionY){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(14, 0, 64, 64, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(6, 3);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(100);

    //Creamos la HitBox del sprite
    const hitBox = new HitBox(16, 39, 24, 19);

    //Creamos nuestro sprite
    const child2 = new Sprite(SpriteID.CHILD_2, State.CHILD_2_IDLE, positionX, positionY, imageSet, frames, physics, hitBox);

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
    const wall = new Wall(SpriteID.WALL, State.WALL, childXpos + 30, childYpos, imageSet, frames, 0, hitBox);

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
    const initAngle     = 180 * Math.PI / 180;
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
    const initAngle     = 0 * Math.PI / 180;
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
    const imageSet = new ImageSet(35, 0, 1144, 344, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(32);

    //Posicion de inicializacion de la nube
    const position = globals.canvas.width - imageSet.xSize / 2 - 150;

    //Creamos nuestro sprite
    const nightSky = new Sprite(SpriteID.NIGHT_SKY, State.NIGHT_SKY, position, 0, imageSet, frames, physics);

    //Añadimos el player el array de sprites
    globals.sprites.push(nightSky);
}

function initDaySky(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(29, 0, 1144, 344, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(32);

    //Posicion de inicializacion de la nube
    const position = -globals.canvas.width - 150;
    
    //Creamos nuestro sprite
    const daySky = new Sprite(SpriteID.DAY_SKY, State.DAY_SKY, position, 0, imageSet, frames, physics);

    //Añadimos el player el array de sprites
    globals.sprites.push(daySky);
}

function initNightCloud(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(45, 0, 1144, 240, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(61);

    //Posicion de inicializacion de la nube
    const position = -imageSet.xSize - imageSet.xOffset;

    //Creamos nuestro sprite
    const nightCloud = new Sprite(SpriteID.NIGHT_CLOUD, State.NIGHT_CLOUD, position, 0, imageSet, frames, physics);
    
    //Añadimos el player el array de sprites
    globals.sprites.push(nightCloud);
}

function initDayCloud(){

    //Creamos las propiedades de las imagenes
    const imageSet = new ImageSet(41, 0, 1144, 240, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos los datos de las fisicas del sprite
    const physics = new Physics(61);

    //Posicion de inicializacion de la nube
    const position = -imageSet.xSize - imageSet.xOffset;

    //Creamos nuestro sprite
    const dayCloud = new Sprite(SpriteID.DAY_CLOUD, State.DAY_CLOUD, position, 0, imageSet, frames, physics);

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
    const imageSet = new ImageSet(54, 0, 640, 500, 64, 0, 0);

    //Creamos los datos de la animacion
    const frames = new Frames(1);

    //Creamos nuestro sprite
    const black = new Sprite(SpriteID.BLACK, State.BLACK, 120, 0, imageSet, frames);

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
    initStone,
    initWood,
    initParticles,
    initWaterParticles,
    initMagicParticles,
    initCamera
}