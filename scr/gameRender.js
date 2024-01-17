import globals from "./globals.js";
import {Game, Tile, ParticleState, ParticleID} from "./constans.js";

export default function render(){
    
    //Cambia lo que el juego esta dibujando dependiendo de la etapa del juego
    switch (globals.gameState){

        case Game.LOADING:

            break;

        case Game.NEW_GAME:

            drawGame();
            renderNewGameText();
            break;

        case Game.PLAYING:

            drawGame();
            break;

        case Game.CONTROLS:

            drawGame();
            renderControlsText();
            break;

        case Game.SCORES:

            drawGame();
            renderScoresText();
            break;

        case Game.HISTORY:

            drawGame();
            renderHistoryText();
            break;

        case Game.OVER:

            drawGame()
            renderOverText()
            break;

        default:

            console.error("Error: Game State Invalid");
    }
}

function moveCamera(){

    const xTranslation = -globals.camera.x;

    globals.ctx.translate(xTranslation, 0);
}

function restoreCamera(){

    globals.ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawGame(){
    
    //Borrar la pantalla
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    
    //Borrar la pantalla
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    
    //Movemos la camara
    moveCamera();
    
    //Dibujamos el nivel
    renderMap();

    //Dibujamos la interfaz
    if (globals.gameState === Game.PLAYING){
        
        renderHUD();
    }

    //Pintar los sprites
    renderSprites();

    //Restablecer camara
    restoreCamera();

    //Pintar las particulas
    renderParticles();
}

function renderSprite(sprite){
    
    //Calculamos la posicion del tile de inicio
    const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize;
    const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;

    //Calculamos la posicion en el tilemap a dibujar
    const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset;
    const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset;

    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);
    
    //Dibujamos el nuevo fotograma del sprite
    if (sprite.hud){
        
        globals.ctxHUD.drawImage(

            globals.tileSets[Tile.SPRITES],                             
            xTile, yTile,                                   
            sprite.imageSet.xSize, sprite.imageSet.ySize,   
            xPos, yPos,                                     
            sprite.imageSet.xSize, sprite.imageSet.ySize    
        )
    }

    else{

        globals.ctx.drawImage(

            globals.tileSets[Tile.SPRITES],                             
            xTile, yTile,                                   
            sprite.imageSet.xSize, sprite.imageSet.ySize,   
            xPos, yPos,                                     
            sprite.imageSet.xSize, sprite.imageSet.ySize    
        )
    }
}

function renderParticles(){

    for (let i = 0; globals.particles.length; i++){
        
        const particle = globals.particles[i];
        renderParticle(particle);
    }
}

function renderParticle(particle){

    const type = particle.id;

    switch (type){

        //Caso del jugador
        case ParticleID.WATER:

            renderWaterParticle(particle);
            break;
        
        default:

            break;
    }
}

function renderWaterParticle(particle){

    if (particle.state != ParticleState.OFF){

        globals.ctx.fillStyle = "blue";
        globals.ctx.globalAlpha = particle.alpha;
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);
        globals.ctx.fill();
        globals.ctx.globalAlpha = 1.0;
    }
}

function renderSprites(){

    for (let i = 0; i < globals.sprites.length; ++i){

        const sprite = globals.sprites[i];
        // drawSpriteRectangle(sprite);
        // drawSpriteHitBox(sprite);
        renderSprite(sprite);
    }
}

function drawSpriteRectangle(sprite){

    //Datos del sprite
    const x1 = Math.floor(sprite.xPos);
    const y1 = Math.floor(sprite.yPos);
    const w1 = sprite.imageSet.xSize;
    const h1 = sprite.imageSet.ySize;

    globals.ctx.fillStyle = "green";
    globals.ctx.fillRect(x1, y1, w1, h1);
}

function drawSpriteHitBox(sprite){

    //Datos del sprite
    const x1 = Math.floor(sprite.xPos) + Math.floor(sprite.hitBox.xOffset);
    const y1 = Math.floor(sprite.yPos) + Math.floor(sprite.hitBox.yOffset);
    const w1 = sprite.hitBox.xSize;
    const h1 = sprite.hitBox.ySize;

    globals.ctx.fillStyle = "red";
    globals.ctx.fillRect(x1, y1, w1, h1);
}

function renderMap(){

    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;

    //Dibujamos el mapa
    const num_fil = levelData.length;
    const num_col = levelData[0].length;

    for (let i = 0; i < num_fil; i++){

        for (let j = 0; j < num_col; j++){

            const xTile = (levelData[i][j] - 1) * brickSize;
            const yTile = 0;
            const xPos = j * brickSize;
            const yPos = i * brickSize;
            
            //Dibujamos el nuevo fotograma del sprite en la posicion adecuada
            globals.ctx.drawImage(
                
                globals.tileSets[Tile.MAP],
                xTile, yTile,
                brickSize, brickSize,
                xPos, yPos,
                brickSize, brickSize
            );
        }
    }
}

function renderHUD(){

    //Datos
    const highScore = 640200;

    globals.ctxHUD.font = "12px emulogic";

    //Dibujar los FPS
    //globals.ctx.fillText("FPS: " + 1 / globals.deltaTime, 5,20);

    //Dibujar Fondo del HUD
    globals.ctxHUD.fillStyle = "black";
    globals.ctxHUD.fillRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)

    //Dibujar High Score
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText ("HIGH SCORE", 15, 30);
    globals.ctxHUD.fillStyle = "crimson";
    globals.ctxHUD.fillText (" " + highScore, 150, 30);

    //Dibujar Score
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText ("SCORE", 15, 60);
    globals.ctxHUD.fillStyle = "lightgray";
    globals.ctxHUD.fillText (" " + globals.score, 150, 60);

    //Dibujar materiales
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText ("MATERIALS", 75, 200);

    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText ("x 1", 155, 240);
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText ("x 5", 155, 280);

    //Dibujar Requisitos
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText ("REQUERIMENTS", 55, 320);

    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText ("x 1", 50, 370);
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText ("x 3", 50, 410);

    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText ("x 2", 135, 370);
    globals.ctxHUD.fillStyle = "white";
    globals.ctxHUD.fillText ("x 2", 135, 410);
}

function renderNewGameText(){

    //Dibujar Titulo
    globals.ctx.font = "19px emulogic";
    globals.ctx.fillStyle = "crimson";

    globals.ctx.fillText ("The Decrepit Throne:", 180, 100);
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("The defense of the throne", 180, 140);

    //Dibujar Opciones
    globals.ctx.font = "7px emulogic";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("New Game", 210, 200);
    globals.ctx.fillText ("History", 210, 230);
    globals.ctx.fillText ("Controls", 210, 260);
    globals.ctx.fillText ("High Scores", 210, 290);
    globals.ctx.fillText ("Exit", 210, 320);
}

function renderHistoryText(){

    //Dibujar Titulo
    globals.ctx.font = "7px emulogic";
    globals.ctx.fillStyle = "black";

    globals.ctx.fillText ("The defense of the throne", 335, 68);

    //Dibujar Historia
    globals.ctx.font = "6px emulogic";
    
    globals.ctx.fillText ("The news of Joseph's strange", 335, 120);
    globals.ctx.fillText ("chair spread rapidly throughout", 335, 130);
    globals.ctx.fillText ("the Lowlands. The villagers,", 335, 140); 
    globals.ctx.fillText ("intrigued and superstitious,", 335, 150);
    globals.ctx.fillText ("began to fear the mysterious", 335, 160);
    globals.ctx.fillText ("connection between Joseph and", 335, 170); 
    globals.ctx.fillText ("the colossal chair. Rumors of", 335, 180);
    globals.ctx.fillText ("goblins and dark magic spread", 335, 190);
    globals.ctx.fillText ("like wildfire in a dry forest.", 335, 200);
}

function renderControlsText(){

    //Dibujar Controles
    globals.ctx.font = "7px emulogic";
    
    globals.ctx.fillText ("W", 340, 120);
    globals.ctx.fillText ("-------------", 355, 120);
    globals.ctx.fillText ("move up", 455, 120);

    globals.ctx.fillText ("S", 340, 150);
    globals.ctx.fillText ("-----------", 355, 150);
    globals.ctx.fillText ("move Down", 442, 150);

    globals.ctx.fillText ("D", 340, 180);
    globals.ctx.fillText ("----------", 355, 180);
    globals.ctx.fillText ("move Right", 435, 180);

    globals.ctx.fillText ("A", 340, 210);
    globals.ctx.fillText ("-----------", 355, 210);
    globals.ctx.fillText ("move Left", 442, 210);

    globals.ctx.fillText ("SPACE", 340, 240);
    globals.ctx.fillText ("----------", 383, 240);
    globals.ctx.fillText ("Attack", 462, 240);

    globals.ctx.fillText ("1", 340, 270);
    globals.ctx.fillText ("-------", 355, 270);
    globals.ctx.fillText ("Put up a wall", 413, 270);

    globals.ctx.fillText ("2", 340, 300);
    globals.ctx.fillText ("---------", 355, 300);
    globals.ctx.fillText ("Attack with", 427, 300);
    globals.ctx.fillText ("the child", 441, 310);

    globals.ctx.fillText ("Q", 340, 330);
    globals.ctx.fillText ("------", 355, 330);
    globals.ctx.fillText ("Create a first", 407, 330);
    globals.ctx.fillText ("child", 470, 340);

    globals.ctx.fillText ("E", 340, 360);
    globals.ctx.fillText ("-----", 355, 360);
    globals.ctx.fillText ("Create a second", 400, 360);
    globals.ctx.fillText ("child", 470, 370);
}

function renderScoresText(){

    //Dibujar Controles
    globals.ctx.font = "7px emulogic";
    
    globals.ctx.fillText ("WSD", 340, 120);
    globals.ctx.fillText ("-------------", 367, 120);
    globals.ctx.fillText ("043220", 465, 120);

    globals.ctx.fillText ("GSC", 340, 150);
    globals.ctx.fillText ("-------------", 367, 150);
    globals.ctx.fillText ("928320", 465, 150);

    globals.ctx.fillText ("DSJ", 340, 180);
    globals.ctx.fillText ("-------------", 367, 180);
    globals.ctx.fillText ("023320", 465, 180);

    globals.ctx.fillText ("HFS", 340, 210);
    globals.ctx.fillText ("-------------", 367, 210);
    globals.ctx.fillText ("723900", 465, 210);

    globals.ctx.fillText ("IKY", 340, 240);
    globals.ctx.fillText ("-------------", 367, 240);
    globals.ctx.fillText ("002380", 465, 240);

    globals.ctx.fillText ("QES", 340, 270);
    globals.ctx.fillText ("-------------", 367, 270);
    globals.ctx.fillText ("055520", 465, 270);

    globals.ctx.fillText ("BAI", 340, 300);
    globals.ctx.fillText ("-------------", 367, 300);
    globals.ctx.fillText ("728130", 465, 300);
}

function renderOverText(){

    //Dibujar Controles
    globals.ctx.font = "20px emulogic";
    globals.ctx.fillStyle = "crimson";
    globals.ctx.fillText ("YOU DIED", 350, 220);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("Enter your name:", 355, 280);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "crimson";
    globals.ctx.fillText ("___", 485, 280);
}