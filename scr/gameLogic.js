import globals from "./globals.js";
import {Game, State, SpriteID, PlayerPosition, Child2Position, Enemy1Position, ParticleState, particleID} from "./constans.js";
import {initPlayingSprites, initNewGameSprites, initControlsSprites, initScoresSprites, initHistorySprites, initOverSprites, initWall, initMagic, initWaterParticles, initEnemy1} from "./Initialize.js";
import detectCollisions from "./collisions.js";
import {level1, levelPuddle, levelClear} from "./Level.js";

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
    updateParticles();
    detectCollisions();
    updateCamera();
    updateLakes();
    spawnRandomEnemys();
    updateScore();
}

function updateSprites(){
    
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
        updateEnemyHpWhenIsCollidingWithEnemy(sprite);
    }
}

function updateParticles(){

    for (let i = 0; i < globals.particles.length; i++){

        const particle = globals.particles[i];
        updateParticle(particle);
    }
}

function updateParticle(particle){

    const type = particle.id;

    switch (type){

        //Caso del jugador
        case particleID.WATER:

            updateWaterParticle(particle);
            break;
        
        default:

            break;
    }
}

function updateWaterParticle(particle){

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

            globals.particles.splice(0, 1)
            break;
    }

    particle.xPos += particle.physics.vx * globals.deltaTime;
    particle.yPos += particle.physics.vy * globals.deltaTime;
}

function updateTimer(time){

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

        case SpriteID.
        
        //otros
        default:

            break;
    }
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

   else if (globals.action.attack === true){
        
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

    //Actualizamos la animacion
    updateAnimationFrame(sprite);
}

function updateStone(sprite){

    updateMovementOfObjets(sprite);
}

function updateWood(sprite){

    updateMovementOfObjets(sprite);
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

    if (globals.action.attackChild === true){
        
        updateChild2Walk(sprite);
    }

    else if (globals.action.attackChild === false){

        updatechild2Return(sprite);
    }
}

function updateChild2Idle(sprite){
    
    updateAnimationFrame(sprite);

    if (globals.action.build === true){
        
        if (sprite.physics.vx < 0 || sprite.physics.vy < 0){
            
            globals.action.build = false;
        }

        updateChild1Walk(sprite);
    }

    else if (globals.action.build === false){

        updatechild1Return(sprite);
    }
}

function updateChild1Walk(sprite){

    sprite.state = State.CHILD_1_RUN;

    if (sprite.physics.vx > 0 && sprite.isCollidingWithTheLake === false){

        sprite.physics.vLimit = 100;
    }
    
    sprite.physics.vx = sprite.physics.vLimit;

    if (PlayerPosition.POSITION_X + 30 <= sprite.xPos){
        
        sprite.physics.vx = 0;
    }

    sprite.physics.vy = sprite.physics.vLimit;

    if (PlayerPosition.POSITION_Y <= sprite.yPos){
        
        sprite.physics.vy = 0;
    }   
    
    if (PlayerPosition.POSITION_X + 30 <= sprite.xPos && PlayerPosition.POSITION_Y <= sprite.yPos){

        sprite.frames.speed = 4;
        sprite.frames.framesPerState = 9;
        sprite.state = State.CHILD_2_BUILD;
        
        if (sprite.frames.frameCounter === 8){

            initWall(sprite.xPos, sprite.yPos);
            globals.action.build = false;
            sprite.frames.frameCounter = 0;
            sprite.frames.framesPerState = 6;
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

        sprite.physics.vLimit = 60;
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
    
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    //Actualizamos la animacion
    updateAnimationFrame(sprite);
}

function updateChild2Walk(sprite){

    sprite.state = State.CHILD_2_RUN;

    sprite.physics.vx = sprite.physics.vLimit;

    if (Enemy1Position.POSITION_X - 40 <= sprite.xPos){

        sprite.physics.vx = 0;
    }

    sprite.physics.vy = -sprite.physics.vLimit;

    if (Enemy1Position.POSITION_Y >= sprite.yPos){

        sprite.physics.vy = 0;
    }

    if (sprite.physics.vx === 0 && sprite.physics.vx === 0){

        Child2Position.POSITION_X = sprite.xPos;
        Child2Position.POSITION_Y = sprite.yPos;
        
        sprite.state = State.CHILD_2_IDLE;

        globals.levelTime.value = 0;

        globals.action.attackChild = false;
    }

    //Calculamos distancia que se mueve (x = x + Vt)
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    //Actualizamos la animacion
    updateAnimationFrame(sprite);
}

function updatechild2Return(sprite){

    sprite.state = State.CHILD_2_WALK;

    sprite.physics.vLimit = 60;
    sprite.physics.vx = -sprite.physics.vLimit;

    if (sprite.xPos <= 0){

        sprite.xPos = 0;
        sprite.physics.vx = 0;
    }

    sprite.physics.vy = sprite.physics.vLimit;

    if (sprite.yPos >= 372){
        
        sprite.yPos = 372;
        sprite.physics.vy = 0;
    }
    
    if (sprite.physics.vx === 0 && sprite.physics.vy === 0){

        sprite.state = State.CHILD_2_IDLE;
    }
    
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    //Actualizamos la animacion
    updateAnimationFrame(sprite);
}

function updateEnemy1(sprite){

    let activeDead = false;

    if (sprite.state === State.ENEMY_1_RUN){

        Enemy1Position.POSITION_X = sprite.xPos;
        Enemy1Position.POSITION_Y = sprite.yPos;

        sprite.physics.vx = -sprite.physics.vLimit;
        sprite.physics.vy = 0;
        
        sprite.xPos += sprite.physics.vx * globals.deltaTime;
        sprite.yPos += sprite.physics.vy * globals.deltaTime;

        if (sprite.hp === 0 && sprite.frames.frameCounter === 1){

            sprite.state = State.ENEMY_1_DEAD;
            sprite.physics.vLimit = 0;
            sprite.frames.speed = 4;
            sprite.frames.framesPerState = 4;
        }
    }

    if (sprite.hp === 0 && sprite.state === State.ENEMY_1_DEAD && sprite.frames.frameCounter === 3){

        updateTimer(globals.EnemyDespawnTime);
        console.log(globals.EnemyDespawnTime.value);
        activeDead = true;
        sprite.frames.speed = 0;
        sprite.frames.frameCounter = 0;
        globals.score += 100;

        if (globals.EnemyDespawnTime.value === 0){
            
            globals.sprites.splice(sprite, 1)
            globals.EnemyDespawnTime.value = 5;
        }
    }

    //Actualizamos la animacion
    updateAnimationFrame(sprite);
}   

function updateWall(sprite){

    
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
                
                const spriteXpos = sprite.xPos + sprite.imageSet.xSize / 2;
                const spriteYpos = sprite.yPos + sprite.imageSet.ySize;
                
                //initWaterParticles(spriteXpos, spriteYpos);
            }
        }

        else{

            if (sprite.physics.vLimit < minSpeed + sprite.physics.speedReductionCont){

                sprite.physics.vLimit += 10;
            }

            else{

                sprite.physics.speedReductionCont = 0;
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
    }
}

function updateEnemyHpWhenIsCollidingWithEnemy(sprite){

    if (sprite.isCollidingWithEnemy){
        
        sprite.hp -= 1;
        sprite.isCollidingWithEnemy = false;
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
    
    globals.camera.x = Math.floor(player.xPos) + Math.floor((player.imageSet.xSize - globals.canvas.width) / 2);
}

function updateLakes(){

    updateTimer(globals.lakesTime);

    if (globals.lakesTime.value === 0){

        levelClear(level1);
        levelPuddle(level1);
        globals.lakesTime.value = 30;
    }
}

function spawnRandomEnemys(){

    const randomYpos = Math.floor(Math.random() * 300);

    updateTimer(globals.EnemySpawnTime);
    
    if (globals.EnemySpawnTime.value === 0){

        globals.EnemySpawnTime.value = 3;
        
        initEnemy1(randomYpos);   
    }
}

function updateScore(){

    
    
}