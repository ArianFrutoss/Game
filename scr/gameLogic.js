import globals from "./globals.js";
import {Game, State, SpriteID, PlayerPosition, Child1Position, Child2Position} from "./constans.js";
import {initPlayingSprites, initNewGameSprites, initControlsSprites, initScoresSprites, initHistorySprites, initOverSprites, initWall} from "./Initialize.js";

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

                    globals.action.build                ? State.IDLE:

                    sprite.state === State.WALK         ? State.IDLE:
                    sprite.state;
}

function updateSprite(sprite){

    const type = sprite.id;
    
    switch (type){

        case SpriteID.CHAIR_INTERFACE:
            
            updateChairInterface(sprite);
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

    //Actualizamos la animacion
    updateAnimationFrame(sprite);
}

function updateChair(sprite){

    //Actualizamos la animacion
    updateAnimationFrame(sprite);
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

    else if (globals.action.moveDown === true){

        //Si se mueve hacia abajo asignamos vy (+)
        sprite.physics.vx = 0;
        sprite.physics.vy = sprite.physics.vLimit;
    }

    else if (globals.action.moveRight === true){

        //Si se mueve a la derecha asignamos vx (+)
        sprite.physics.vx = sprite.physics.vLimit;
        sprite.physics.vy = 0;
    }

    else if (globals.action.moveLeft === true){

        //Si se mueve a la izquierda asignamos vx (-)
        sprite.physics.vx = -sprite.physics.vLimit;
        sprite.physics.vy = 0;
    }

    if (globals.action.build === true){
        
        updateChild1(globals.sprites[14]);
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

    sprite.physics.vx = 10;
    sprite.physics.vy = 10;

    sprite.physics.vx = sprite.physics.vLimit;

    if (PlayerPosition.POSITION_X + 40 <= sprite.xPos){

        sprite.physics.vx = 0;
    }

    sprite.physics.vy = sprite.physics.vLimit;

    if (PlayerPosition.POSITION_Y <= sprite.yPos){

        sprite.physics.vy = 0;
    }

    if (PlayerPosition.POSITION_X + 40 <= sprite.xPos && PlayerPosition.POSITION_Y <= sprite.yPos){
        
        globals.action.build = false;

        Child1Position.POSITION_X = globals.sprites[14].xPos;
        Child1Position.POSITION_Y = globals.sprites[14].yPos;
        
        initWall();
    }

    //Calculamos distancia que se mueve (x = x + Vt)
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    //Actualizamos la animaciond
    updateAnimationFrame(sprite);
}

function updateChild2(sprite){

    
}

function updateEnemy1(sprite){

    

    sprite.frames.frameCounter = 0;

    sprite.state = State.ENEMY_1_WALK;
}

function updateWall(sprite){

    updateAnimationFrame(sprite);
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
    sprite.frames.frameChangeCounter++;

    //Cambiamos de frame cuando el lag de la animacion alcanza animSpeed
    if (sprite.frames.frameChangeCounter === sprite.frames.speed){

        //Cambiamos de frame y reseteamos el contador de cambio de frame
        sprite.frames.frameCounter++;
        sprite.frames.frameChangeCounter = 0;
    }

    //Reiniciar animacion
    if (sprite.frames.frameCounter === sprite.frames.framesPerState){

        sprite.frames.frameCounter = 0;
    }
}