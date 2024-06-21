import globals from "./globals.js";
import {Game, State, SpriteID, PlayerPosition, ParticleState, Sounds, Levels, Letters, ParticleID} from "./constans.js";
import {initPlayingSprites, initNewGameSprites, initControlsSprites, initScoresSprites, initHistorySprites, initOverSprites, initWall, initMagic, initWaterParticles, initMagicParticles, initObjectParticles, initWallParticles, initEnemy1, initStone, initWood, initLevel, initPlayers, initRainParticles} from "./Initialize.js";
import detectCollisions from "./collisions.js";
import {level1, levelPuddle1, levelPuddle2, levelClear} from "./Level.js";
import {historyText} from "./Text.js";

export default function update(){

    //Cambia lo que esta haciendo el juego dependiendo de la etapa en la que este el juego
    switch (globals.gameState){

        case Game.LOADING:

            playGame();
            break;

        case Game.NEW_GAME_LOAD:

            globals.sprites = [];
            globals.particles = [];
            initNewGameSprites();
            initRainParticles();
            globals.gameState = Game.NEW_GAME;
            break;

        case Game.NEW_GAME:

            playGame();
            break;

        case Game.PLAYING_LOAD:
            
            globals.levels++;
            globals.sprites = [];
            globals.particles = [];
            initLevel();
            initPlayingSprites();
            playGame();
            globals.gameState = Game.LEVEL_LOAD;
            break;

        case Game.LEVEL_LOAD:

            globals.borderEnemys = true;
            restoreCamera();
            updateTimer(globals.levelChangeTime);

            if (globals.levelChangeTime.value === 0){

                globals.gameState = Game.PLAYING;
                globals.levelChangeTime.value = 2;
            }
            
            break;

        case Game.PLAYING:
            
            playGamePlayingScreen();
            break;

        case Game.CONTROLS_LOAD:

            globals.sprites = [];
            globals.particles = [];
            initControlsSprites();
            initRainParticles();
            globals.gameState = Game.CONTROLS;
            break;

        case Game.CONTROLS:

            playGame();
            break;

        case Game.SCORES_LOAD:

            globals.sprites = [];
            globals.particles = [];
            initScoresSprites();
            restoreScore();
            initRainParticles();
            globals.gameState = Game.SCORES;
            break;

        case Game.SCORES:

            updateScoreText();
            playGame();
            break;

        case Game.HISTORY_LOAD:
            
            globals.sprites = [];
            globals.particles = [];
            restorehistory();
            initHistorySprites();
            initRainParticles();
            globals.gameState = Game.HISTORY;
            break;

        case Game.HISTORY:

            updateHistoryText();
            playGame();
            break;

        case Game.OVER_LOAD:
            
            globals.sprites = [];
            globals.particles = [];
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

function playGamePlayingScreen(){
    
    updateLevel();
    detectCollisions();
    updateCamera();
    updateLakes();
    spawnRandomEnemys();
    spawnEnemyGroup();
    updateParticles();
    updateSprites();
    gameOver();
    updateTimer(globals.levelTime);
    playSound();
}

function playGame(){
    
    updateLakes();
    chooseLetters();
    updateParticles();
    updateSprites();
    changeGameState();
    playSound();
}

function updateSprites(){
    
    if (globals.gameState === Game.PLAYING || globals.gameState.State === Game.OVER){

        for (let i = 0; i < globals.sprites.length; i++){
            
            for (let j = i + 1; j < globals.sprites.length; j++){
                
                let maxYPosSprite = globals.sprites[i];

                if (globals.sprites[i].id === SpriteID.MAGIC && globals.sprites[j].id === SpriteID.WALL && globals.sprites[i].isCollidingWithWall){
                    
                    globals.sprites[i] = globals.sprites[j];
                    globals.sprites[j] = maxYPosSprite;
                }

                else if (globals.sprites[j].yPos < globals.sprites[i].yPos && globals.sprites[j].id === SpriteID.MAGIC && globals.sprites[i].id != SpriteID.WALL){
                    
                    globals.sprites[i] = globals.sprites[j];
                    globals.sprites[j] = maxYPosSprite;
                }

                else if (globals.sprites[j].yPos < globals.sprites[i].yPos && globals.sprites[j].id != SpriteID.MAGIC){
                    
                    globals.sprites[i] = globals.sprites[j];
                    globals.sprites[j] = maxYPosSprite;
                }
            }
            
            const sprite = globals.sprites[i];

            updateSprite(sprite);
            updateSpriteSpeed(sprite);
            updatePlayerStateWhenIsCollidingWithWall(sprite);
            updateChairHPWhenIsCollidingWithEnemy(sprite);
        }
    }

    else{

        for (let i = 0; i < globals.sprites.length; i++){

            const sprite = globals.sprites[i];

            updateSprite(sprite);
        }
    }
}

function playSound(){
    
    //Reproducimos el sonido que ha sido invocado
    if (globals.currentSound != Sounds.NO_SOUND){

        //Reproducimos el sonido correspondiente
        globals.sounds[globals.currentSound].currentTime = 0;
        globals.sounds[globals.currentSound].play();

        //Reseteamos current sound
        globals.currentSound = Sounds.NO_SOUND;
    }
}

function updateParticles(){
    
    for (let i = 0; i < globals.particles.length; i++){

        const particle = globals.particles[i];

        if (globals.particles.length < 200 && particle.id === ParticleID.RAIN){
            
            initRainParticles();
        }

        updateParticle(particle);
    }
}

function updateParticle(particle){

    particle.fadeCounter += globals.deltaTime;
    
    //Cogemos las velocidades de los arrays
    switch (particle.state){

        case ParticleState.ON:

            if (particle.fadeCounter > particle.timeToFade){
                
                particle.fadeCounter = 0;
                particle.state = ParticleState.FADE;
            }
            
            break;

        case ParticleState.FADE:
            
            particle.alpha -= 1;

            if (particle.alpha <= 0){
                
                particle.state = ParticleState.OFF;
            }

            break;
        
        case ParticleState.OFF:
            
            globals.particles.splice(particle, 1);
            break;
    }

    particle.xPos += particle.physics.vx * globals.deltaTime;
    particle.yPos += particle.physics.vy * globals.deltaTime;
}

function updateHistoryText(){
    
    updateTimer(globals.historyTextTime);
    
    if (globals.historyTextTime.value <= 0 && globals.historyPageChange <= 0 && globals.historyTextWordCont < historyText.length - 1){
        
        globals.historyTextTime.value = 1;
        globals.historyTextWordCont++;
    }

    else{
       
        updateTimer(globals.historyPageChangeTime);
    }
}

function restorehistory(){

    globals.historyText                = [];
    globals.historyTextWordCont         = 0;
    globals.historyPageChangeTime.value = 20;
    globals.historyTextTime.value       = 1;
    globals.historyPageChange           = 0;
}

function updateScoreText(){
    
    updateTimer(globals.menuPositionTime);
    updateTimer(globals.scoreMovementTime);

    for (let i = globals.selectPlayers; i < globals.players.length; i++){
        
        const minWordSeparates = 10;
        const scoreLength = globals.players[i].score.toString().split("").length;
        
        for (let j = 0; j < minWordSeparates - scoreLength; j++){

            if (globals.players[i].wordSeparate.length < minWordSeparates - scoreLength){

                if (globals.scoreMovementTime.value <= 0){

                    globals.players[i].wordSeparate += "-";
                    globals.scoreMovementTime.value = 1;
                }
            }
        }
    }
    
    if (globals.action.moveLeft && globals.selectPlayers > 0 && globals.menuPositionTime.value <= 0){
        
        globals.selectPlayers -= 10;
        globals.menuPositionTime.value = 4
    }

    else if (globals.action.moveRight && globals.selectPlayers + 10 < globals.players.length && globals.menuPositionTime.value <= 0){
        
        globals.selectPlayers += 10;
        globals.menuPositionTime.value = 4
    }
}

function restoreScore(){

    for (let i = 0; i < globals.players.length; i++){

        globals.players[i].wordSeparate = [];
    }
    
    globals.selectPlayers = 0;
}

export function updateTimer(time){

    //Incrementamos el contador de cambio de valor
    time.timerChangeCounter += globals.deltaTime;

    //Si ha pasado el tiempo necesario, cambiamos el valor del timer
    if (time.timerChangeCounter > time.timerChangeValue){

        time.value--;

        //Reseteamos timeChangeCounter
        time.timerChangeCounter = 0;
    }
}

function readKeyboardAndAssignState(sprite){

    sprite.state =  globals.action.moveLeft             ? State.WALK:
                    globals.action.moveRight            ? State.WALK:
                    globals.action.moveUp               ? State.WALK:
                    globals.action.moveDown             ? State.WALK:
            
                    globals.action.build                ? State.IDLE:
                    globals.action.attackChild          ? State.IDLE:
                    globals.action.attack               ? State.ATTACK:

                    sprite.state === State.WALK         ? State.IDLE:
                    sprite.state === State.ATTACK       ? State.IDLE:
                    sprite.state;
}

function updateSprite(sprite){

    const type = sprite.id;
    
    switch (type){

        case SpriteID.CHAIR_MENU:
            
            updateChairMenu(sprite);
            break;

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

        case SpriteID.CHILD_1:
    
            updateChild1Idle(sprite);
            break;
            
        case SpriteID.CHILD_2:
            
            updateChild2Idle(sprite);
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

        case SpriteID.DAY_SKY:

            updateDaySky(sprite);
            break;

        case SpriteID.NIGHT_SKY:

            updateNightSky(sprite);
            break;

        //otros
        default:

            break;
    }
}

function updateChairMenu(sprite){

    const topSpace = 165;
    const margin = 30;

    sprite.yPos = topSpace + margin * (globals.gameStateCont - 2);
}

function updateChairInterface(sprite){

    sprite.frames.frameCounter = globals.chairHP;
}

function updateChair(sprite){

    sprite.frames.frameCounter = globals.chairHP;
}

function updatePlayer(sprite){

    //Lectura de teclado
    readKeyboardAndAssignState(sprite);
    
    sprite.physics.vx = 0;
    sprite.physics.vy = 0;

    globals.sounds[Sounds.WALK_PLAYER_AND_CHILDS].volume = 0.1;

    if (globals.action.moveUp === true){

        //Si se mueve hacia arriba asignamos vy (-)
        sprite.physics.vx = 0;
        sprite.physics.vy = -sprite.physics.vLimit;
        globals.sounds[Sounds.WALK_PLAYER_AND_CHILDS].play();
    }
    
    else if (globals.action.moveDown === true){

        //Si se mueve hacia abajo asignamos vy (+)
        sprite.physics.vx = 0;
        sprite.physics.vy = sprite.physics.vLimit;
        globals.sounds[Sounds.WALK_PLAYER_AND_CHILDS].play();
    }

    else if (globals.action.moveRight === true){

        //Si se mueve a la derecha asignamos vx (+)
        sprite.physics.vx = sprite.physics.vLimit;
        sprite.physics.vy = 0;
        globals.sounds[Sounds.WALK_PLAYER_AND_CHILDS].play();
    }

    else if (globals.action.moveLeft === true){

        //Si se mueve a la izquierda asignamos vx (-)
        sprite.physics.vx = -sprite.physics.vLimit;
        sprite.physics.vy = 0;
        globals.sounds[Sounds.WALK_PLAYER_AND_CHILDS].play();
    }

   else if (globals.action.attack){

        globals.magic = 1;

        if (globals.action.build === true || globals.action.attackChild === true){

            sprite.state = State.ATTACK;
        }

        if (sprite.frames.frameCounter === 3){
            
            sprite.frames.frameCounter = 4;
            
            initMagic(sprite.xPos, sprite.yPos);
        }  
    }
    
    //Calculamos distancia que se mueve (x = x + Vt)
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    //Actualizamos la animacion
    updateAnimationFrame(sprite);
}

function updateMagic(sprite){

    sprite.physics.vx = sprite.physics.vLimit;
    sprite.physics.vy = 0;
    
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    sprite.frames.frameChangeCounter = 0;

    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;
    const numBlocksX = levelData[0].length;

    for (let i = 0; i < globals.sprites.length; i++){

        if (globals.sprites[i].xPos > numBlocksX * brickSize - sprite.hitBox.xOffset && globals.sprites[i].id === SpriteID.MAGIC){
            
            globals.sprites.splice(i, 1);
        }

        if (globals.sprites[i].isCollidingWithEnemy && globals.sprites[i].id === SpriteID.MAGIC){
            
            const spriteXpos = globals.sprites[i].xPos + 20;
            const spriteYpos = globals.sprites[i].yPos + globals.sprites[i].imageSet.ySize / 2;
            
            initMagicParticles(spriteXpos, spriteYpos);
            
            globals.currentSound = Sounds.EXPLOSION;
            globals.sprites.splice(i, 1);
        }
    }

    //Actualizamos la animacion
    updateAnimationFrame(sprite);
}

function updateStone(sprite){

    updateMovementOfObjets(sprite);

    const spriteXpos = sprite.xPos + sprite.imageSet.xSize / 2;
    const spriteYpos = sprite.yPos + sprite.imageSet.ySize / 2;

    initObjectParticles(spriteXpos, spriteYpos);

    for (let i = 0; i < globals.sprites.length; i++){

        if (globals.sprites[i].isCollidingWithObject){
            
            if (globals.sprites[i].id === SpriteID.STONE){

                globals.currentSound = Sounds.OBJECT;
                globals.stoneCont++;
                globals.materialCont++;
                globals.sprites.splice(i, 1);
            }
        }
    }
}

function updateWood(sprite){

    updateMovementOfObjets(sprite);

    const spriteXpos = sprite.xPos + sprite.imageSet.xSize / 2;
    const spriteYpos = sprite.yPos + sprite.imageSet.ySize / 2;

    initObjectParticles(spriteXpos, spriteYpos);

    for (let i = 0; i < globals.sprites.length; i++){

        if (globals.sprites[i].isCollidingWithObject){
            
            if (globals.sprites[i].id === SpriteID.WOOD){
                
                globals.currentSound = Sounds.OBJECT;
                globals.woodCont++;
                globals.materialCont++;
                globals.sprites.splice(i, 1);
            }
        }
    }
}

function updateMovementOfObjets(sprite){

    updateTimer(globals.levelTime);
    
    if (globals.levelTime.timerChangeCounter >= 0.5){  

        sprite.physics.vx = 0;
        sprite.physics.vy = -sprite.physics.vLimit;
    }

    else{

        sprite.physics.vx = 0;
        sprite.physics.vy = sprite.physics.vLimit;
    }

    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;
}

function updateChild1Idle(sprite){

    updateAnimationFrame(sprite);

    globals.sounds[Sounds.WALK_PLAYER_AND_CHILDS].volume = 0.1;

    if (globals.action.attackChild && globals.woodCont >= 2 && globals.stoneCont >= 3){

        updateChild2Walk(sprite);
        globals.sounds[Sounds.WALK_PLAYER_AND_CHILDS].play();
    }

    else if (globals.action.attackChild === false){

        updatechild2Return(sprite);
    }
}

function updateChild2Idle(sprite){
    
    updateAnimationFrame(sprite);
    
    globals.sounds[Sounds.WALK_PLAYER_AND_CHILDS].volume = 0.1;

    if (globals.action.build && globals.woodCont >= 2 && globals.stoneCont >= 1){
            
        updateChild1Walk(sprite);
        globals.sounds[Sounds.WALK_PLAYER_AND_CHILDS].play();
    }

    else if (globals.action.build === false){

        updatechild1Return(sprite);
    }
}

function updateChild1Walk(sprite){

    sprite.state = State.CHILD_1_RUN;

    if (sprite.isCollidingWithWall){

        sprite.state = State.CHILD_2_IDLE;
    }

    if (sprite.physics.vx > 0 && sprite.isCollidingWithTheLake === false){

        sprite.physics.vLimit = 200;
    }
    
    if (PlayerPosition.POSITION_X + 30 > sprite.xPos){

        sprite.physics.vx = sprite.physics.vLimit;

        if (Math.abs(PlayerPosition.POSITION_X + 30 - sprite.xPos) <= 10){

            sprite.physics.vx = 10;

            if (PlayerPosition.POSITION_X + 30 === Math.floor(sprite.xPos)){
                
                sprite.physics.vx = 0;
            }
        }
    } 

    else if (PlayerPosition.POSITION_X + 30 < sprite.xPos){

        sprite.physics.vx = -sprite.physics.vLimit;

        if (Math.abs(PlayerPosition.POSITION_X + 30 - sprite.xPos) <= 10){

            sprite.physics.vx = -10;

            if (PlayerPosition.POSITION_X + 30 === Math.floor(sprite.xPos)){
                
                sprite.physics.vx = 0;
            }
        }
    }
    
    if (PlayerPosition.POSITION_Y > sprite.yPos){

        sprite.physics.vy = sprite.physics.vLimit;

        if (Math.abs(PlayerPosition.POSITION_Y - sprite.yPos) <= 10){

            sprite.physics.vy = 10;

            if (PlayerPosition.POSITION_Y === Math.floor(sprite.yPos)){
                
                sprite.physics.vy = 0;
            }
        }
    } 
    
    else if (PlayerPosition.POSITION_Y < sprite.yPos){

        sprite.physics.vy = -sprite.physics.vLimit;

        if (Math.abs(PlayerPosition.POSITION_Y - sprite.yPos) <= 10){

            sprite.physics.vy = -10;

            if (PlayerPosition.POSITION_Y === Math.floor(sprite.yPos)){
                
                sprite.physics.vy = 0;
            }
        }
    }

    if (PlayerPosition.POSITION_Y === Math.floor(sprite.yPos) && PlayerPosition.POSITION_X + 30 === Math.floor(sprite.xPos)){

        sprite.frames.speed = 4;
        sprite.frames.framesPerState = 9;
        sprite.state = State.CHILD_2_BUILD;
        
        if (sprite.frames.frameCounter === 8){
            
            const brickSize = globals.level.imageSet.gridSize;
            const spritePositionXRest = sprite.xPos % brickSize;
            const spritePositionYRest = sprite.yPos % brickSize;
            
            let spriteXpos;
            let spriteYpos = sprite.yPos - spritePositionYRest;
            
            if (spritePositionXRest < brickSize / 2){
                
                spriteXpos = sprite.xPos - spritePositionXRest + brickSize;
            }

            else{
                
                spriteXpos = sprite.xPos - spritePositionXRest + brickSize * 2;  
            }
            
            initWall(spriteXpos, spriteYpos);

            globals.action.build = false;

            sprite.frames.frameCounter = 0;
            sprite.frames.framesPerState = 6;

            globals.woodCont -= 2;
            globals.stoneCont -= 1;
        }
    }

    //Calculamos distancia que se mueve (x = x + Vt)
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    //Actualizamos la animacion
    updateAnimationFrame(sprite);1
}

function updatechild1Return(sprite){

    sprite.state = State.CHILD_1_WALK;

    if (sprite.physics.vx < 0 && sprite.isCollidingWithTheLake === false){

        sprite.physics.vLimit = 100;
    }

    sprite.physics.vx = -sprite.physics.vLimit;

    if (sprite.xPos <= 0){

        sprite.xPos = 0;
        sprite.physics.vx = 0;
    }

    sprite.physics.vy = -sprite.physics.vLimit;

    if (sprite.yPos <= 0){
        
        sprite.yPos = 0;
        sprite.physics.vy = 0;
    }
    
    if (sprite.physics.vx === 0 && sprite.physics.vy === 0){

        sprite.state = State.CHILD_1_IDLE;
    }

    else{

        globals.sounds[Sounds.WALK_PLAYER_AND_CHILDS].play();
    }
    
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    //Actualizamos la animacion
    updateAnimationFrame(sprite);
}

function updateChild2Walk(sprite){

    if (sprite.physics.vx > 0 && sprite.isCollidingWithTheLake === false){

        sprite.physics.vLimit = 200;
    }
    
    const enemy = targetEnemy();

    if (enemy != undefined && globals.ChildKillCont < 3){

        sprite.state = State.CHILD_2_RUN;

        if (sprite.isCollidingWithWall){

            sprite.state = State.CHILD_2_IDLE;
        }

        if (enemy.xPos - 60 > sprite.xPos){

            sprite.physics.vx = sprite.physics.vLimit;
    
            if (Math.abs(enemy.xPos - 60 - sprite.xPos) <= 10){
    
                sprite.physics.vx = 10;
    
                if (enemy.xPos - 60 === Math.floor(sprite.xPos)){
                    
                    sprite.physics.vx = 0;
                }
            }
        } 
    
        else if (enemy.xPos - 60 < sprite.xPos){
    
            sprite.physics.vx = -sprite.physics.vLimit;
    
            if (Math.abs(enemy.xPos - 60 - sprite.xPos) <= 10){
    
                sprite.physics.vx = -10;
    
                if (enemy.xPos - 60 === Math.floor(sprite.xPos)){
                    
                    sprite.physics.vx = 0;
                }
            }
        }
        
        if (enemy.yPos > sprite.yPos){
    
            sprite.physics.vy = sprite.physics.vLimit;
    
            if (Math.abs(enemy.yPos - sprite.yPos) <= 10){
    
                sprite.physics.vy = 10;
    
                if (enemy.yPos === Math.floor(sprite.yPos)){
                    
                    sprite.physics.vy = 0;
                }
            }
        } 
        
        else if (enemy.yPos < sprite.yPos){
    
            sprite.physics.vy = -sprite.physics.vLimit;
    
            if (Math.abs(enemy.yPos - sprite.yPos) <= 10){
    
                sprite.physics.vy = -10;
    
                if (enemy.yPos === Math.floor(sprite.yPos)){
                    
                    sprite.physics.vy = 0;
                }
            }
        }
        
        if (Math.abs(enemy.xPos - 60 - sprite.xPos) <= 20 && Math.abs(enemy.yPos - sprite.yPos) <= 20 && enemy.hp > 0){
    
            sprite.frames.speed = 4;
            sprite.frames.framesPerState = 9;
            sprite.state = State.CHILD_1_ATTACK;
            
            if (sprite.frames.frameCounter === 8){
    
                enemy.hp = 0;
    
                sprite.frames.frameCounter = 0;
                sprite.frames.framesPerState = 5;
                
                globals.currentSound = Sounds.HITS;
                globals.ChildKillCont++;
            }
        }
    
        //Calculamos distancia que se mueve (x = x + Vt)
        sprite.xPos += sprite.physics.vx * globals.deltaTime;
        sprite.yPos += sprite.physics.vy * globals.deltaTime;

        //Actualizamos la animacion
        updateAnimationFrame(sprite);
    }

    else if (globals.ChildKillCont === 3){

        globals.woodCont -= 2;
        globals.stoneCont -= 3;
        globals.action.attackChild = false;
    }

    else{

        sprite.state = State.CHILD_2_IDLE;
    }
}

function targetEnemy(){

    let targetEnemy;

    for (let i = 0; i < globals.sprites.length; i++){

        if (globals.sprites[i].id === SpriteID.ENEMY_1 && globals.sprites[i].hp > 0){

            if (targetEnemy === undefined){

                targetEnemy = globals.sprites[i];
            }

            else if (targetEnemy != undefined && globals.sprites[i].xPos < targetEnemy.xPos){

                targetEnemy = globals.sprites[i];
            }
        }
    }

    return targetEnemy;
}

function updatechild2Return(sprite){

    sprite.state = State.CHILD_2_WALK;

    if (sprite.physics.vx < 0 && sprite.isCollidingWithTheLake === false){

        sprite.physics.vLimit = 100;
    }

    sprite.physics.vx = -sprite.physics.vLimit;

    if (sprite.xPos <= 0){

        sprite.xPos = 0;
        sprite.physics.vx = 0;
    }

    sprite.physics.vy = +sprite.physics.vLimit;

    if (sprite.yPos >= 372){
        
        sprite.yPos = 372;
        sprite.physics.vy = 0;
    }
    
    if (sprite.physics.vx === 0 && sprite.physics.vy === 0){

        sprite.state = State.CHILD_2_IDLE;
    }

    else{

        globals.sounds[Sounds.WALK_PLAYER_AND_CHILDS].play();
    }
    
    globals.ChildKillCont = 0;

    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    //Actualizamos la animacion
    updateAnimationFrame(sprite);
}

function updateEnemy1(sprite){

    globals.sounds[Sounds.WALK_ENEMY].play();
    globals.sounds[Sounds.WALK_ENEMY].volume = 0.2;

    sprite.physics.vx = -sprite.physics.vLimit;
    sprite.physics.vy = 0;
    
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    if (sprite.isCollidingWithMagic && sprite.id === SpriteID.ENEMY_1){
        
        sprite.hp -= 1;
        sprite.isCollidingWithMagic = false;
    }
    
    if (sprite.hp <= 0 && sprite.frames.frameCounter === 1){
        
        sprite.state = State.ENEMY_1_DEAD;
        sprite.physics.vLimit = 0;
        sprite.frames.speed = 6;
        sprite.frames.framesPerState = 4;
    }
    
    if (sprite.hp > 0 && sprite.isCollidingWithWall && sprite.frames.frameCounter === 1){
        
        sprite.state = State.ENEMY_1_ATTACK;
        sprite.frames.speed = 6;
        sprite.frames.framesPerState = 4;

        const spriteXpos = sprite.xPos + sprite.hitBox.xOffset;
        const spriteYpos = sprite.yPos + sprite.imageSet.ySize / 2;
        
        initWallParticles(spriteXpos, spriteYpos);
    }

    if (sprite.hp > 0 && sprite.isCollidingWithWall === false && sprite.frames.frameCounter === 1){
        
        sprite.state = State.ENEMY_1_RUN;
        sprite.frames.speed = 2;
        sprite.frames.framesPerState = 6;
    }

    if (sprite.frames.frameCounter === 0 && sprite.state === State.ENEMY_1_ATTACK){

        sprite.frames.frameCounter = 1;

        if (sprite.hits >= 5){

            sprite.isCollidingWithWall = false;
            sprite.hits = 0;
        }
    }

    if (sprite.state === State.ENEMY_1_DEAD){

        sprite.physics.vLimit = 0;
        updateTimer(globals.enemyDespawnTime);
    }

    if (sprite.hp <= 0 && sprite.frames.speed > 0 && sprite.state === State.ENEMY_1_DEAD && sprite.frames.frameCounter === 0){

        sprite.frames.speed = 0;
        sprite.frames.frameCounter = 0;
        globals.score += 1000;
    }
    
    for (let i = 0; i < globals.sprites.length; i++){
        
        if (globals.sprites[i].hp <= 0 && globals.sprites[i].id === SpriteID.ENEMY_1 && globals.enemyDespawnTime.value <= 0){

            randomObjectSpawn(globals.sprites[i].xPos, globals.sprites[i].yPos);
            globals.sprites.splice(i, 1);
            globals.enemyDespawnTime.value = 1;
            globals.KillCont += 1;
        }

        if (globals.sprites[i].xPos + sprite.hitBox.xOffset - 1 < 0 && globals.sprites[i].id === SpriteID.ENEMY_1){
            
            globals.sprites.splice(i, 1);
        }

        if (globals.sprites[i].id === SpriteID.WALL && globals.sprites[i].isCollidingWithEnemy && sprite.isCollidingWithWall){

            sprite.hits = globals.sprites[i].hp;
        }
    }
    
    //Actualizamos la animacion
    updateAnimationFrame(sprite);
}

function randomObjectSpawn(spawnXpos, spawnYpos){

    const options = [2, 1, 3];
    const randomObject = options[Math.floor(Math.random() * options.length)];
    
    if (randomObject === 2){

        initStone(spawnXpos, spawnYpos);
    }

    else if (randomObject === 3){

        initWood(spawnXpos, spawnYpos);
    }
}

function updateWall(sprite){
    
    for (let i = 0; i < globals.sprites.length; i++){
        
        if (globals.sprites[i].id === SpriteID.WALL && globals.sprites[i].hp >= 7){

            globals.sprites.splice(i, 1);
        }

        if (globals.sprites[i].id === SpriteID.ENEMY_1 && sprite.isCollidingWithEnemy && globals.sprites[i].frames.frameCounter === 0 && globals.sprites[i].state === State.ENEMY_1_ATTACK){

            sprite.hp++;
            globals.sounds[Sounds.HITS].play();
        }
    }
    
    sprite.frames.frameCounter = Math.floor(sprite.hp / 2);
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

    updateTimer(globals.cloudSpawnTime);

    if (globals.cloudSpawnTime.value <= 160 && globals.cloudSpawnTime.value > 80){

        sprite.physics.vx = sprite.physics.vLimit;
        sprite.xPos += sprite.physics.vx * globals.deltaTime;
    }

    if (sprite.xPos >= globals.canvas.width){

        sprite.xPos = -sprite.imageSet.xSize - sprite.imageSet.xOffset;
        globals.cloudSpawnTime.value = 80;
    }
}

function updateDayCloud(sprite){

    updateTimer(globals.cloudSpawnTime);
    
    if (globals.cloudSpawnTime.value <= 80 && globals.cloudSpawnTime.value > 0){

        sprite.physics.vx = sprite.physics.vLimit;
        sprite.xPos += sprite.physics.vx * globals.deltaTime;
    }

    if (sprite.xPos >= globals.canvas.width){

        sprite.xPos = -sprite.imageSet.xSize - sprite.imageSet.xOffset;
        globals.cloudSpawnTime.value = 160;
    }
}

function updateNightSky(sprite){

    sprite.physics.vx = sprite.physics.vLimit;
    sprite.xPos += sprite.physics.vx * globals.deltaTime;

    if (sprite.xPos >= globals.canvas.width){

        sprite.xPos = -globals.canvas.width - sprite.imageSet.xSize + sprite.imageSet.xSize / 2;
    }
}

function updateDaySky(sprite){
    
    sprite.physics.vx = sprite.physics.vLimit;
    sprite.xPos += sprite.physics.vx * globals.deltaTime;

    if (sprite.xPos >= globals.canvas.width){

        sprite.xPos = -globals.canvas.width - sprite.imageSet.xSize + sprite.imageSet.xSize / 2;
    }
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

function updateSpriteSpeed(sprite){
    
    //TODO Intentar hacer que la speed de cambio de frames se reduzca dentro de los charcos
    if (sprite.id === SpriteID.PLAYER || sprite.id === SpriteID.ENEMY_1 || sprite.id === SpriteID.CHILD_1 || sprite.id === SpriteID.CHILD_2){
        
        const minSpeed = 30;

        if (sprite.isCollidingWithTheLake){

            if (sprite.physics.vLimit > minSpeed){

                sprite.physics.vLimit -= 10;
                sprite.physics.speedReductionCont += 10;
            }
            
            if (sprite.physics.vx != 0 || sprite.physics.vy != 0){
                
                const spriteXpos = sprite.xPos + sprite.imageSet.xSize / 2;
                const spriteYpos = sprite.yPos + sprite.imageSet.ySize - 5;

                initWaterParticles(spriteXpos, spriteYpos);
            }
        }
        
        else{
            
            if (sprite.physics.speedReductionCont > 0){

                sprite.physics.vLimit += 10;
                sprite.physics.speedReductionCont -= 10;
            }
        }
    }
}

function updatePlayerStateWhenIsCollidingWithWall(sprite){

    if (sprite.isCollidingWithWall && sprite.id === SpriteID.PLAYER){
        
        sprite.state = State.IDLE;
    }
}

function updateChairHPWhenIsCollidingWithEnemy(sprite){

    if (sprite.isCollidingWithChair){
        
        globals.chairHP += 1;
        globals.sounds[Sounds.HITS].play();
    }
}

function updateCamera(){
    
    let player;

    //Centraremos la camara en el player
    for (let i = 0; i < globals.sprites.length; i++){

        if (globals.sprites[i].id === SpriteID.PLAYER){

            player = globals.sprites[i];
        }
    }
    
    if (globals.camera.isCollidingWithBorderLeft){
        
        globals.camera.x = 0;
    }
    
    if (globals.camera.isCollidingWithBorderRight && player.xPos < globals.camera.x + 100){

        globals.camera.x = globals.canvas.width - globals.camera.x - player.imageSet.xSize + globals.canvasHUD.width;
    }

    if(globals.camera.isCollidingWithBorderLeft === false && globals.camera.isCollidingWithBorderRight === false){
        
        globals.camera.x = Math.floor(player.xPos - 100);
    }
}

function updateLakes(){

    if (globals.gameState === Game.PLAYING_LOAD){
        
        switch(globals.levels){

            case Levels.LEVEL_1:
                
                levelClear(level1);
                levelPuddle1(level1);
                break;

            case Levels.LEVEL_2:

                levelClear(level1);
                levelPuddle2(level1);
                break;

            default:    

                levelClear(level1);
                levelPuddle2(level1);
                break;
        }
    }
}

function spawnRandomEnemys(){

    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;
    const numBlocksY = levelData.length;
    const numBlocksX = levelData[0].length;
    let randomYPos;
    const xPos = numBlocksX * brickSize;
    
    switch(globals.levels){

        case Levels.LEVEL_1:

            randomYPos = Math.floor(Math.random() * (numBlocksY - 4)) * brickSize + (brickSize * 2) - 10;
            break;

        case Levels.LEVEL_2:
            
            randomYPos = Math.floor(Math.random() * (numBlocksY - 2)) * brickSize + brickSize - 10;
            spawnBorderEnemys();
            break;

        default:

            randomYPos = Math.floor(Math.random() * (numBlocksY - 2)) * brickSize + brickSize - 10;
            spawnBorderEnemys();
            break;
    }
    
    updateTimer(globals.enemySpawnTime);
    
    if (globals.enemySpawnTime.value === 0){ 

        globals.enemySpawnTime.value = 4;
        
        initEnemy1(xPos, randomYPos, 60 + globals.levels);   
    }
}

function spawnEnemyGroup(){
    
    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;
    const numBlocksY = levelData.length;
    const numBlocksX = levelData[0].length;
    let randomYPos;
    const xPos = numBlocksX * brickSize;
    
    updateTimer(globals.dontTakeObjectTime);
    
    for (let i = 0; i < globals.levels; i++){

        switch(globals.levels){

            case Levels.LEVEL_1:
    
                randomYPos = Math.floor(Math.random() * (numBlocksY - 4)) * brickSize + (brickSize * 2) - 10;
                break;
    
            case Levels.LEVEL_2:
                
                randomYPos = Math.floor(Math.random() * (numBlocksY - 2)) * brickSize + brickSize - 10;
                spawnBorderEnemys();
                break;
    
            default:
    
                randomYPos = Math.floor(Math.random() * (numBlocksY - 2)) * brickSize + brickSize - 10;
                spawnBorderEnemys();
                break;
        }
        
        if (globals.dontTakeObjectTime.value === 0){
            
            initEnemy1(xPos, randomYPos, 50 + globals.levels);
        }
    }

    if (globals.dontTakeObjectTime.value === 0){
        
        globals.dontTakeObjectTime.value = 10;
    }
}

function spawnBorderEnemys(){

    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;
    const numBlocksY = levelData.length;
    const numBlocksX = levelData[0].length;

    const position1 = -10;
    const position2 = (numBlocksY - 1) * brickSize - 10;

    const positions = [position1, position2];

    const randomYPos = Math.floor(Math.random() * 2);
    const xPos = numBlocksX * brickSize;
    
    if (globals.materialCont === 2 && globals.borderEnemys){

        initEnemy1(xPos, positions[randomYPos], 120 + globals.levels);

        globals.borderEnemys = false;
    }

    else if(globals.materialCont === 5){

        globals.borderEnemys = true;
    }

    else if(globals.materialCont === 4 && globals.borderEnemys){

        initEnemy1(xPos, positions[position1], 120 + globals.levels);
        initEnemy1(xPos, positions[position2], 120 + globals.levels);

        globals.borderEnemys = false;
    }
}

function updateLevel(){

    if (globals.materialCont === 5){

        globals.gameState = Game.PLAYING_LOAD;
        globals.materialCont = 0;
    }
}

function gameOver(){

    if (globals.chairHP >= 4){
        
        globals.gameState = Game.OVER_LOAD;
        globals.sounds[Sounds.GAME_MUSIC].pause();
        globals.sounds[Sounds.GAME_OVER_MUSIC].play();

        updateHighScore();
        restoreCamera();
    }
}

function updateHighScore(){

    if (globals.score > globals.highScore){
        
        globals.highScore = globals.score;
    }
}

function restoreCamera(){
    
    globals.camera.x = 0;
}

function restoreVars(){

    globals.chairHP                = 0;
    globals.stoneCont              = 0;
    globals.woodCont               = 0;
    globals.materialCont           = 0;
    globals.KillCont               = 0;
    globals.levels                 = 0;
    globals.score                  = 0;
    globals.sprites                = [];
}

function changeGameState(){

    if (globals.gameState === Game.LOADING && globals.assetsAreLoaded){

        if (globals.action.attack){
            
            globals.gameState = Game.NEW_GAME_LOAD;
        }
    }

    if (globals.gameState === Game.NEW_GAME){

        updateTimer(globals.menuPositionTime);
        
        globals.sounds[Sounds.HISTORY_MUSIC].pause();
        globals.sounds[Sounds.WIN_MUSIC].pause();
        globals.sounds[Sounds.GAME_OVER_MUSIC].pause();
        globals.sounds[Sounds.GAME_MENU_MUSIC].play();
        
        if (globals.action.moveUp && globals.gameStateCont > 2 && globals.menuPositionTime.value <= 0){

            globals.menuChairSize = 0.1;
            globals.sounds[Sounds.SELECT].play();
            globals.menuPositionTime.value = 2;
            globals.gameStateCont -= 1;
        }
        
        else if (globals.action.moveDown && globals.gameStateCont < 5 && globals.menuPositionTime.value <= 0){
            
            globals.menuChairSize = 0.1;
            globals.sounds[Sounds.SELECT].play();
            globals.menuPositionTime.value = 2;
            globals.gameStateCont += 1;
        }

        else if (globals.action.moveUp && globals.gameStateCont === 2 && globals.menuPositionTime.value <= 0){
            
            globals.menuChairSize = 0.1;
            globals.sounds[Sounds.SELECT].play();new Date().getTime;
            globals.menuPositionTime.value = 2;
            globals.gameStateCont = 5;
        }

        else if (globals.action.moveDown && globals.gameStateCont === 5 && globals.menuPositionTime.value <= 0){
            
            globals.menuChairSize = 0.1;
            globals.sounds[Sounds.SELECT].play();
            globals.menuPositionTime.value = 2;
            globals.gameStateCont = 2;
        }

        else if (globals.action.attack && globals.menuPositionTime.value <= 0 && globals.gameState != Game.OVER){
            
            if (globals.gameStateCont === Game.PLAYING_LOAD){
                
                globals.sounds[Sounds.GAME_MENU_MUSIC].pause();
                globals.currentSound = Sounds.GAME_MUSIC;
            }

            if (globals.gameStateCont === Game.HISTORY_LOAD){
                
                globals.sounds[Sounds.GAME_MENU_MUSIC].pause();
                globals.currentSound = Sounds.HISTORY_MUSIC;
            }

            globals.sounds[Sounds.SELECT].play();
            globals.gameState = globals.gameStateCont;
            globals.menuPositionTime.value = 2;
            globals.gameStateCont = 2;
        }
    }

    if (globals.gameState === Game.HISTORY || globals.gameState === Game.CONTROLS || globals.gameState === Game.SCORES || globals.gameState === Game.OVER){

        updateTimer(globals.menuPositionTime);

        if (globals.action.attack && globals.menuPositionTime.value <= 0){

            globals.menuPositionTime.value = 2;
            globals.gameState = Game.NEW_GAME_LOAD;
            globals.sounds[Sounds.SELECT].play();
        }

        if (globals.gameState === Game.OVER){

            globals.currentSound = Sounds.GAME_MENU_MUSIC
        }
    }
}

function chooseLetters(){
    
    if (globals.gameState === Game.OVER){
        
        updateTimer(globals.menuPositionTime);

        if (globals.action.attack){
            
            restoreVars();
        }

        if (globals.action.moveUp && globals.lettercont[globals.letterPos] < Letters.length - 1 && globals.menuPositionTime.value <= 0){

            globals.sounds[Sounds.SELECT].play();
            globals.name[globals.letterPos] = Letters[++globals.lettercont[globals.letterPos]];
            globals.menuPositionTime.value = 2;
        }
        
        else if (globals.action.moveDown &&  globals.lettercont[globals.letterPos] > 0 && globals.menuPositionTime.value <= 0){
            
            globals.sounds[Sounds.SELECT].play();
            globals.name[globals.letterPos] = Letters[--globals.lettercont[globals.letterPos]];
            globals.menuPositionTime.value = 2;
        }

        else if (globals.action.moveUp && globals.lettercont[globals.letterPos] >= Letters.length - 1 && globals.menuPositionTime.value <= 0){
            
            globals.sounds[Sounds.SELECT].play();
            globals.name[globals.letterPos] = Letters[0];
            globals.lettercont[globals.letterPos] = 0;
            globals.menuPositionTime.value = 2;
        }

        else if (globals.action.moveDown && globals.lettercont[globals.letterPos] <= 0 && globals.menuPositionTime.value <= 0){
            
            globals.sounds[Sounds.SELECT].play();
            globals.name[globals.letterPos] = Letters[Letters.length - 1];
            globals.lettercont[globals.letterPos] = Letters.length - 1;
            globals.menuPositionTime.value = 2;
        }

        else if (globals.action.moveLeft && globals.letterPos > 0 && globals.menuPositionTime.value <= 0){

            globals.sounds[Sounds.SELECT].play();
            globals.letterPos--;
            globals.menuPositionTime.value = 4;
        }
        
        else if (globals.action.moveRight && globals.letterPos < globals.name.length - 1 && globals.menuPositionTime.value <= 0){
            
            globals.sounds[Sounds.SELECT].play();
            globals.letterPos++;
            globals.menuPositionTime.value = 4;
        }

        else if (globals.action.moveLeft && globals.letterPos <= 0 && globals.menuPositionTime.value <= 0){
            
            globals.sounds[Sounds.SELECT].play();
            globals.letterPos = globals.name.length - 1;
            globals.menuPositionTime.value = 4;
        }

        else if (globals.action.moveRight && globals.letterPos >= globals.name.length - 1 && globals.menuPositionTime.value <= 0){
            
            globals.sounds[Sounds.SELECT].play();
            globals.letterPos = 0;
            globals.menuPositionTime.value = 4;
        }
    }
}