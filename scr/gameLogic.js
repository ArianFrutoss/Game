import globals from "./globals.js";
import {Game, State, SpriteID} from "./constans.js";
import {initPlayingSprites, initNewGameSprites, initControlsSprites, initScoresSprites,initHistorySprites, initOverSprites} from "./Initialize.js";

export default function update(){

    //Cambia lo que esta haciendo el juego dependiendo de la etapa en la que este el juego
    switch (globals.gameState){

        case Game.LOADING:

            console.log("Loading assets...");
            break;

        case Game.NEW_GAME_LOAD:

            globals.sprites = [];
            initNewGameSprites();
            globals.gameState = Game.NEW_GAME;
            break;

        case Game.NEW_GAME:

            playGame();
            break;

        case Game.PLAYING_LOAD:

            globals.sprites = [];
            initPlayingSprites();
            globals.gameState = Game.PLAYING;
            break;

        case Game.PLAYING:
            
            playGame();
            break;

        case Game.CONTROLS_LOAD:

            globals.sprites = [];
            initControlsSprites();
            globals.gameState = Game.CONTROLS;
            break;

        case Game.CONTROLS:

            playGame();
            break;

        case Game.SCORES_LOAD:

            globals.sprites = [];
            initScoresSprites();
            globals.gameState = Game.SCORES;
            break;

        case Game.SCORES:

            playGame();
            break;

        case Game.HISTORY_LOAD:

            globals.sprites = [];
            initHistorySprites();
            globals.gameState = Game.HISTORY;
            break;

        case Game.HISTORY:

            playGame();
            break;

        case Game.OVER_LOAD:

            globals.sprites = [];
            initOverSprites();
            globals.gameState = Game.OVER;
            break;

        case Game.OVER:

            playGame();
            break;

        default:

            console.error("Error: Game State Invalid");
    }
}

function playGame(){

    updateSprites();
    updateLevelTimer();
}

function updateSprites(){

    for (let i = 0; i < globals.sprites.length; i++){

        const sprite = globals.sprites[i];
        updateSprite(sprite);
    }
}

function updateLevelTimer(){

    //Incrementamos el contador de cambio de valor
    globals.levelTime.timerChangeCounter += globals.deltaTime;

    //Si ha pasado el tiempo necesario, cambiamos el valor del timer
    if (globals.levelTime.timerChangeCounter > globals.levelTime.timerChangeValue){

        globals.levelTime.value++;

        //Reseteamos timeChangeCounter
        globals.levelTime.timerChangeCounter = 0;
    }
}

function readKeyboardAndAssignState(sprite){

    sprite.state =  globals.action.moveLeft             ? State.WALK:
                    globals.action.moveRight            ? State.WALK:
                    globals.action.moveUp               ? State.WALK:
                    globals.action.moveDown             ? State.WALK:
                    sprite.state === State.WALK         ? State.IDLE:
                    sprite.state;
}

function updateSprite(sprite){

    const type = sprite.id;
    
    switch (type){

        case SpriteID.CHAIR_INTERFACE:
            
            updateChairInterface(sprite);
            break;

        case SpriteID.CHILD_1_INTERFACE_1:
            
            updateChild1Interface1(sprite);
            break;

        case SpriteID.CHILD_2_INTERFACE_1:
        
            updateChild2Interface1(sprite);
            break;

        case SpriteID.STONE_INTERFACE_1:

            updateStoneInterface1(sprite);
            break;

        case SpriteID.WOOD_INTERFACE_1:

            updateWoodInterface1(sprite);
            break;

        case SpriteID.STONE_INTERFACE_2:

            updateStoneInterface2(sprite);
            break;

        case SpriteID.WOOD_INTERFACE_2:

            updateWoodInterface2(sprite);
            break;

        case SpriteID.STONE_INTERFACE_3:

            updateStoneInterface3(sprite);
            break;

        case SpriteID.WOOD_INTERFACE_3:

            updateWoodInterface3(sprite);
            break;

        case SpriteID.CHILD_1_INTERFACE_2:

            updateChild1Interface2(sprite);
            break;

        case SpriteID.CHILD_2_INTERFACE_2:

            updateChild2Interface2(sprite);
            break;

        case SpriteID.CHAIR:
            
            updateChair(sprite);
            break;

        case SpriteID.PLAYER:
            
            updatePlayer(sprite);
            break;

        case SpriteID.MAGIC:
            
            updateMagic(sprite);
            break;

        case SpriteID.STONE:
            
            updateStone(sprite);
            break;

        case SpriteID.WOOD:
            
            updateWood(sprite);
            break;

        case SpriteID.CHILD_1:
            
            updateChild1(sprite);
            break;
            
        case SpriteID.CHILD_2:
            
            updateChild2(sprite);
            break;

        case SpriteID.ENEMY_1:
            
            updateEnemy1(sprite);
            break;

        case SpriteID.WALL:
            
            updateWall(sprite);
            break;

        case SpriteID.MOON:

            updateMoon(sprite);
            break;

        case SpriteID.SUN:

            updateSun(sprite);
            break;

        case SpriteID.DAY_CLOUD:

            updateDayCloud(sprite);
            break;

        case SpriteID.NIGHT_CLOUD:

            updateNightCloud(sprite);
            break;

        case SpriteID.NIGHT_SKY:

            updateNightSky(sprite);
            break;

        case SpriteID.
        
        //otros
        default:

            break;
    }
}

function updateChairInterface(sprite){

    sprite.xPos = 685;
    sprite.yPos = 125;

    sprite.frames.frameCounter = 0;

    sprite.state = State.INTEGRITY;
}

function updateChild1Interface1(sprite){

    sprite.xPos = 780;
    sprite.yPos = 440;

    sprite.frames.frameCounter = 0;

    sprite.state = State.CHILD_1_INTERFACE;
}

function updateChild2Interface1(sprite){

    sprite.xPos = 780;
    sprite.yPos = 505;

    sprite.frames.frameCounter = 0;

    sprite.state = State.CHILD_2_INTERFACE;
}

function updateStoneInterface1(sprite){

    sprite.xPos = 620;
    sprite.yPos = 255;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STONE;
}

function updateWoodInterface1(sprite){

    sprite.xPos = 620;
    sprite.yPos = 310;

    sprite.frames.frameCounter = 0;

    sprite.state = State.WOOD;
}

function updateStoneInterface2(sprite){

    sprite.xPos = 570;
    sprite.yPos = 440;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STONE;
}

function updateWoodInterface2(sprite){

    sprite.xPos = 670;
    sprite.yPos = 440;

    sprite.frames.frameCounter = 0;

    sprite.state = State.WOOD;
}

function updateStoneInterface3(sprite){

    sprite.xPos = 570;
    sprite.yPos = 510;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STONE;
}

function updateWoodInterface3(sprite){

    sprite.xPos = 670;
    sprite.yPos = 510;

    sprite.frames.frameCounter = 0;

    sprite.state = State.WOOD;
}

function updateChild1Interface2(sprite){

    sprite.xPos = 600;
    sprite.yPos = 575;

    sprite.frames.frameCounter = 0;

    sprite.state = State.CHILD_1_INTERFACE;
}

function updateChild2Interface2(sprite){

    sprite.xPos = 730;
    sprite.yPos = 575;

    sprite.frames.frameCounter = 0;

    sprite.state = State.CHILD_2_INTERFACE;
}

function updateChair(sprite){

    sprite.xPos = 0;
    sprite.yPos = 255;

    sprite.frames.frameCounter = 0;

    sprite.state = State.INTEGRITY;
}

function updatePlayer(sprite){

    //Lectura de teclado
    readKeyboardAndAssignState(sprite);

    sprite.physics.vx = 0;
    sprite.physics.vy = 0;

    if (globals.action.moveUp === true){

        //Si se mueve hacia arriba asignamos vy (-)
        sprite.physics.vx = 0;
        sprite.physics.vy = -sprite.physics.vLimit;
    }

    if (globals.action.moveDown === true){

        //Si se mueve hacia abajo asignamos vy (+)
        sprite.physics.vx = 0;
        sprite.physics.vy = sprite.physics.vLimit;
    }

    if (globals.action.moveRight === true){

        //Si se mueve a la derecha asignamos vx (+)
        sprite.physics.vx = sprite.physics.vLimit;
        sprite.physics.vy = 0;
    }

    if (globals.action.moveLeft === true){

        //Si se mueve a la izquierda asignamos vx (-)
        sprite.physics.vx = -sprite.physics.vLimit;
        sprite.physics.vy = 0;
    }
    
    //Calculamos distancia que se mueve (x = x + Vt)
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    //Actualizamos la animacion
    updateAnimationFrame(sprite);
}

function updateMagic(sprite){

    sprite.xPos = 130;
    sprite.yPos = 50;

    sprite.frames.frameCounter = 0;

    sprite.state = State.MAGIC;
}

function updateStone(sprite){

    sprite.xPos = 200;
    sprite.yPos = 140;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STONE;
}

function updateWood(sprite){

    sprite.xPos = 400;
    sprite.yPos = 200;

    sprite.frames.frameCounter = 0;

    sprite.state = State.WOOD;
}

function updateChild1(sprite){

    sprite.xPos = 530;
    sprite.yPos = 340;

    sprite.frames.frameCounter = 0;

    sprite.state = State.CHILD_1_IDLE;
}

function updateChild2(sprite){

    sprite.xPos = 230;
    sprite.yPos = 120;

    sprite.frames.frameCounter = 3;

    sprite.state = State.CHILD_1_IDLE;
}

function updateEnemy1(sprite){

    sprite.xPos = 300;
    sprite.yPos = 500;

    sprite.frames.frameCounter = 0;

    sprite.state = State.ENEMY_1_WALK;
}

function updateWall(sprite){

    sprite.xPos = 450;
    sprite.yPos = 180;

    sprite.frames.frameCounter = 0;

    sprite.state = State.WALL;
}

function updateMoon(sprite){

    sprite.physics.angle += sprite.physics.omega * globals.deltaTime;

    setMoonAndSunPosition(sprite);
}

function updateSun(sprite){

    sprite.physics.angle += sprite.physics.omega * globals.deltaTime;

    setMoonAndSunPosition(sprite);
}

function setMoonAndSunPosition(sprite){

    const radius = 400;

    sprite.xPos = sprite.physics.xRotCenter + radius * Math.cos(sprite.physics.angle);
    sprite.yPos = sprite.physics.yRotCenter + (radius / 2.5) * Math.sin(sprite.physics.angle);

    sprite.xPos -= sprite.imageSet.xSize / 2;
    sprite.yPos -= sprite.imageSet.ySize / 2;
}

function updateNightCloud(sprite){

    sprite.physics.vx = sprite.physics.vLimit;
    sprite.xPos += sprite.physics.vx * globals.deltaTime;

    if (sprite.xPos >= globals.canvas.width){

        sprite.xPos = -1216;
    }
}

function updateDayCloud(sprite){

    if (globals.levelTime.value > 14){

        sprite.physics.vx = sprite.physics.vLimit;
        sprite.xPos += sprite.physics.vx * globals.deltaTime;
    }
}

function updateNightSky(sprite){


}

function updateAnimationFrame(sprite){

    //Aumentamos el contador de tiempo entre frames
    sprite.frames.frameCounter++;

    //Reiniciar animacion
    if (sprite.frames.frameCounter === sprite.frames.framesPerState){

        sprite.frames.frameCounter = 0;
    }
}