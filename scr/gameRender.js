import globals from "./globals.js";
import {Game, Tile, ParticleState, ParticleID, SpriteID, Levels, Letters} from "./constans.js";

export default function render(){
    
    //Cambia lo que el juego esta dibujando dependiendo de la etapa del juego
    switch (globals.gameState){

        case Game.LOADING:

            renderLoadindBar();
            break;

        case Game.NEW_GAME_LOAD:

            drawGame();
            renderNewGameText();
            break;

        case Game.NEW_GAME:

            drawGame();
            renderNewGameText();
            break;

        case Game.LEVEL_LOAD:

            drawGame();
            renderGameText();
            break;

        case Game.PLAYING:

            drawGame();
            break;

        case Game.CONTROLS_LOAD:

            drawGame();
            renderNewGameText();
            break;

        case Game.CONTROLS:

            drawGame();
            renderControlsText();
            break;

        case Game.SCORES_LOAD:

            drawGame();
            renderNewGameText();
            break;

        case Game.SCORES:

            drawGame();
            renderScoresText();
            break;

        case Game.HISTORY_LOAD:

            drawGame();
            renderNewGameText();
            break;

        case Game.HISTORY:

            drawGame();
            renderHistoryText();
            break;

        case Game.OVER_LOAD:

            drawGame();
            renderNewGameText();
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
    renderHUD();

    //Pintar los sprites
    renderSprites();

    //Pintar las particulas
    renderParticles();

    //Restablecer camara
    restoreCamera();
}

function renderSprite(sprite){
    
    if (sprite.hud === false){

        //Calculamos la posicion del tile de inicio
        const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize;
        const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;

        //Calculamos la posicion en el tilemap a dibujar
        const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset;
        const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset;

        const xPos = Math.floor(sprite.xPos);
        const yPos = Math.floor(sprite.yPos);
        
        if (sprite.id === SpriteID.CHAIR_MENU){
            
            globals.ctx.translate(xPos + sprite.imageSet.xSize / 2, yPos + sprite.imageSet.ySize / 2);
            globals.ctx.scale(0.5, 0.5);
            globals.ctx.translate(-(xPos + sprite.imageSet.xSize / 2), -(yPos + sprite.imageSet.ySize / 2));
        }

        //Dibujamos el nuevo fotograma del sprite
        globals.ctx.drawImage(

            globals.tileSets[Tile.SPRITES],                             
            xTile, yTile,                                   
            sprite.imageSet.xSize, sprite.imageSet.ySize,   
            xPos, yPos,                                     
            sprite.imageSet.xSize, sprite.imageSet.ySize    
        )
    }

    else if (globals.gameState === Game.PLAYING){

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
            );
        }
    }
}

function renderParticles(){

    for (let i = 0; i < globals.particles.length; i++){
        
        const particle = globals.particles[i];
        renderParticle(particle);
    }
}

function renderParticle(particle){

    const type = particle.id;

    switch (type){

        case ParticleID.WATER:

            renderWaterParticle(particle);
            break;

        case ParticleID.MAGIC:

            renderMagicParticle(particle);
            break;

        case ParticleID.OBJECT:

            renderObjectParticle(particle);
            break;

        case ParticleID.WALL:

            renderWallParticle(particle);
            break;

        case ParticleID.RAIN:

            renderRainParticle(particle);
            break;
        
        default:

            break;
    }
}

function renderWaterParticle(particle){

    if (particle.state != ParticleState.OFF){

        const randomColorParticles = Math.floor(Math.random() * 3);

        if (randomColorParticles === 1){

            globals.ctx.fillStyle = "rgb(39, 161, 185)";
        }

        else if (randomColorParticles === 2){

            globals.ctx.fillStyle = "rgb(30, 106, 136)";
        }

        else{

            globals.ctx.fillStyle = "rgb(205, 231, 255)";            
        }
        
        globals.ctx.globalAlpha = particle.alpha;
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);
        globals.ctx.fill();
        globals.ctx.globalAlpha = 1.0;
    }
}

function renderMagicParticle(particle){

    if (particle.state != ParticleState.OFF){

        const randomColorParticles = Math.floor(Math.random() * 3);

        if (randomColorParticles === 1){

            globals.ctx.fillStyle = "rgb(193, 105, 34)";
        }

        else if (randomColorParticles === 2){

            globals.ctx.fillStyle = "rgb(193, 68, 34)";
        }

        else{

            globals.ctx.fillStyle = "rgb(229, 215, 18)";            
        }         
        
        globals.ctx.globalAlpha = particle.alpha;
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);
        globals.ctx.fill();
        globals.ctx.globalAlpha = 1.0;
    }
}

function renderObjectParticle(particle){

    if (particle.state != ParticleState.OFF){

        globals.ctx.fillStyle = "rgb(212, 168, 26)";                    
        
        globals.ctx.globalAlpha = particle.alpha;
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);
        globals.ctx.fill();
        globals.ctx.globalAlpha = 1.0;
    }
}

function renderWallParticle(particle){

    if (particle.state != ParticleState.OFF){

        const randomColorParticles = Math.floor(Math.random() * 3);

        if (randomColorParticles === 1){

            globals.ctx.fillStyle = "rgb(115, 111, 99)";
        }

        else if (randomColorParticles === 2){

            globals.ctx.fillStyle = "rgb(173, 170, 159)";
        }

        else{

            globals.ctx.fillStyle = "rgb(63, 63, 63)";            
        }         
        
        globals.ctx.globalAlpha = particle.alpha;
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);
        globals.ctx.fill();
        globals.ctx.globalAlpha = 1.0;
    }
}

function renderRainParticle(particle){

    if (particle.state != ParticleState.OFF){

        globals.ctx.fillStyle = "rgb(50, 14, 14)";
       
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

    if (globals.gameState === Game.PLAYING || globals.gameState === Game.OVER || globals.gameState === Game.LEVEL_LOAD){

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
}

function renderHUD(){

    if (globals.gameState === Game.PLAYING){
    
        globals.ctxHUD.font = "12px emulogic";

        //Dibujar Fondo del HUD
        globals.ctxHUD.fillStyle = "black";
        globals.ctxHUD.fillRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height)

        //Dibujar High Score
        globals.ctxHUD.fillStyle = "white";
        globals.ctxHUD.fillText ("HIGH SCORE", 15, 30);
        globals.ctxHUD.fillStyle = "crimson";
        globals.ctxHUD.fillText (" " + globals.highScore, 150, 30);

        //Dibujar Score
        globals.ctxHUD.fillStyle = "white";
        globals.ctxHUD.fillText ("SCORE", 15, 60);
        globals.ctxHUD.fillStyle = "lightgray";
        globals.ctxHUD.fillText (" " + globals.score, 150, 60);

        //Dibujar materiales
        globals.ctxHUD.fillStyle = "white";
        globals.ctxHUD.fillText ("MATERIALS", 75, 200);

        globals.ctxHUD.fillStyle = "white";
        globals.ctxHUD.fillText ("x " + globals.stoneCont, 155, 240);
        globals.ctxHUD.fillStyle = "white";
        globals.ctxHUD.fillText ("x " + globals.woodCont, 155, 280);

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
}

function renderGameText(){

    globals.ctx.font = "30px emulogic";
    globals.ctx.fillStyle = "white";

    const level = "LEVEL " + (globals.levels + 1);

    if (globals.gameState === Game.LEVEL_LOAD){

        globals.ctx.fillText (level, (globals.canvas.width - level.length * 30) / 2, globals.canvas.height / 2 + 30 / 2);
    }      
}

function renderNewGameText(){

    //Dibujar Titulo
    globals.ctx.font = "19px emulogic";
    globals.ctx.fillStyle = "rgb(114, 47, 47)";
    globals.ctx.fillText ("The Decrepit Throne:", 180, 100);
    
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("The defense of the throne", 180, 140);

    //Dibujar Opciones
    globals.ctx.font = "10px emulogic";
    globals.ctx.fillStyle = "white";

    let moveText = 0;

    if (globals.gameStateCont === 2){

        globals.ctx.fillStyle = "rgb(222, 75, 75)";
        moveText = 10;
    }

    else{

        globals.ctx.fillStyle = "white";
        moveText = 0;
    }

    globals.ctx.fillText ("New Game", 210 + moveText, 200);

    if (globals.gameStateCont === 3){

        globals.ctx.fillStyle = "rgb(222, 75, 75)";
        moveText = 10;
    }

    else{

        globals.ctx.fillStyle = "white";
        moveText = 0;
    }

    globals.ctx.fillText ("History", 210 + moveText, 230);

    if (globals.gameStateCont === 4){

        globals.ctx.fillStyle = "rgb(222, 75, 75)";
        moveText = 10;
    }
    
    else{

        globals.ctx.fillStyle = "white";
        moveText = 0;
    }

    globals.ctx.fillText ("Controls", 210 + moveText, 260);

    if (globals.gameStateCont === 5){

        globals.ctx.fillStyle = "rgb(222, 75, 75)";
        moveText = 10;
    }

    else{

        globals.ctx.fillStyle = "white";
        moveText = 0;
    }

    globals.ctx.fillText ("High Scores", 210 + moveText, 290);
}

function renderHistoryText(){

    const height = 120;
    const width = 300;
    const letterSpace = 6;
    const wordSpace = 10;

    let spacesX = 0;
    let spacesY = 0;
    let word = 0;

    //Dibujar Historia
    globals.ctx.font = "6px emulogic";
    globals.ctx.fillStyle = "black";

    for (let i = 0; i < globals.historyTextWordCont; i++){

        if (i < globals.historyText.length){

            globals.ctx.fillText (globals.historyText[i], width + spacesX, height + spacesY);

            word = globals.historyText[i].length;

            spacesX += (word * letterSpace) + wordSpace;

            if (spacesX > 190){

                spacesX = 0;
                spacesY += 10;
            }

            if (spacesY > 250 && globals.historyPageChange === 0){

                globals.historyPageChange = 1;
            }

            if (spacesY >= 250 && globals.historyPageChangeTime.value === 0){

                spacesX = 0;
                spacesY = 0;
                globals.historyText.splice(0, i);
                globals.historyTextWordCont = 0;
                globals.historyPageChange = 0;
                globals.historyPageChangeTime.value = 20;
                i = 0;
            }
        }
    }   
}

function renderControlsText(){

    const w = "W";
    const wBars = " ------------------- ";
    const wAction = "move up";

    const wXpos = globals.canvas.width / 2 - w.length * 7 / 2 - wBars.length * 7 / 2 - wAction.length * 7 / 2;
    const wBarsXpos = globals.canvas.width / 2 - wBars.length * 7 / 2 + w.length * 7 / 2 - wAction.length * 7 / 2;
    const wActionXpos = globals.canvas.width / 2 - wAction.length * 7 / 2 + w.length * 7 / 2 + wBars.length * 7 / 2;

    const s = "S";
    const sBars = " ----------------- ";
    const sAction = "move down";

    const sXpos = globals.canvas.width / 2 - s.length * 7 / 2 - sBars.length * 7 / 2 - sAction.length * 7 / 2;
    const sBarsXpos = globals.canvas.width / 2 - sBars.length * 7 / 2 + s.length * 7 / 2 - sAction.length * 7 / 2;
    const sActionXpos = globals.canvas.width / 2 - sAction.length * 7 / 2 + s.length * 7 / 2 + sBars.length * 7 / 2;

    const d = "D";
    const dBars = " ---------------- ";
    const dAction = "move rigth";

    const dXpos = globals.canvas.width / 2 - d.length * 7 / 2 - dBars.length * 7 / 2 - dAction.length * 7 / 2;
    const dBarsXpos = globals.canvas.width / 2 - dBars.length * 7 / 2 + d.length * 7 / 2 - dAction.length * 7 / 2;
    const dActionXpos = globals.canvas.width / 2 - dAction.length * 7 / 2 + d.length * 7 / 2 + dBars.length * 7 / 2;

    const a = "A";
    const aBars = " ----------------- ";
    const aAction = "move left";

    const aXpos = globals.canvas.width / 2 - a.length * 7 / 2 - aBars.length * 7 / 2 - aAction.length * 7 / 2;
    const aBarsXpos = globals.canvas.width / 2 - aBars.length * 7 / 2 + a.length * 7 / 2 - aAction.length * 7 / 2;
    const aActionXpos = globals.canvas.width / 2 - aAction.length * 7 / 2 + a.length * 7 / 2 + aBars.length * 7 / 2;

    const space = "SPACE";
    const spaceBars = " ---------------- ";
    const spaceAction = "Attack";

    const spaceXpos = globals.canvas.width / 2 - space.length * 7 / 2 - spaceBars.length * 7 / 2 - spaceAction.length * 7 / 2;
    const spaceBarsXpos = globals.canvas.width / 2 - spaceBars.length * 7 / 2 + space.length * 7 / 2 - spaceAction.length * 7 / 2;
    const spaceActionXpos = globals.canvas.width / 2 - spaceAction.length * 7 / 2 + space.length * 7 / 2 + spaceBars.length * 7 / 2;

    const e = "E";
    const eBars = " ------------- ";
    const eAction = "Put up a wall";

    const eXpos = globals.canvas.width / 2 - e.length * 7 / 2 - eBars.length * 7 / 2 - eAction.length * 7 / 2;
    const eBarsXpos = globals.canvas.width / 2 - eBars.length * 7 / 2 + e.length * 7 / 2 - eAction.length * 7 / 2;
    const eActionXpos = globals.canvas.width / 2 - eAction.length * 7 / 2 + e.length * 7 / 2 + eBars.length * 7 / 2;

    const q = "Q";
    const qBars = " ----- ";
    const qAction = "Attack with the child";

    const qXpos = globals.canvas.width / 2 - q.length * 7 / 2 - qBars.length * 7 / 2 - qAction.length * 7 / 2;
    const qBarsXpos = globals.canvas.width / 2 - qBars.length * 7 / 2 + q.length * 7 / 2 - qAction.length * 7 / 2;
    const qActionXpos = globals.canvas.width / 2 - qAction.length * 7 / 2 + q.length * 7 / 2 + qBars.length * 7 / 2;

    globals.ctx.font = "7px emulogic";
    globals.ctx.fillStyle = "black";
    
    globals.ctx.fillText (w, wXpos, 120);
    globals.ctx.fillText (wBars, wBarsXpos, 120);
    globals.ctx.fillText (wAction, wActionXpos, 120);

    globals.ctx.fillText (s, sXpos, 150);
    globals.ctx.fillText (sBars, sBarsXpos, 150);
    globals.ctx.fillText (sAction, sActionXpos, 150);

    globals.ctx.fillText (d, dXpos, 180);
    globals.ctx.fillText (dBars, dBarsXpos, 180);
    globals.ctx.fillText (dAction, dActionXpos, 180);

    globals.ctx.fillText (a, aXpos, 210);
    globals.ctx.fillText (aBars, aBarsXpos, 210);
    globals.ctx.fillText (aAction, aActionXpos, 210);

    globals.ctx.fillText (space, spaceXpos, 240);
    globals.ctx.fillText (spaceBars, spaceBarsXpos, 240);
    globals.ctx.fillText (spaceAction, spaceActionXpos, 240);

    globals.ctx.fillText (e, eXpos, 270);
    globals.ctx.fillText (eBars, eBarsXpos, 270);
    globals.ctx.fillText (eAction, eActionXpos, 270);

    globals.ctx.fillText (q, qXpos, 300);
    globals.ctx.fillText (qBars, qBarsXpos, 300);
    globals.ctx.fillText (qAction, qActionXpos, 300);
}

function renderScoresText(){

    const height = 120;
    const widthPos = 310;
    const widthName = widthPos + 30;
    const widthScoresAndDates = widthName + 45;

    let spacesY = 0;

    globals.ctx.font = "6px emulogic";
    globals.ctx.fillStyle = "black";
    
    for (let i = globals.selectPlayers; i < globals.players.length; i++){
        
        if (spacesY >= 250){

            break;
        }
        
        globals.ctx.fillText (i + 1, widthPos, height + spacesY);
        globals.ctx.fillText (globals.players[i].name, widthName, height + spacesY);
        globals.ctx.fillText (globals.players[i].score + " " + globals.players[i].wordSeparate + " " + globals.players[i].date, widthScoresAndDates, height + spacesY);

        spacesY += 20;
    }
}

function renderOverText(){

    const youDied = "YOU DIED";
    const name = "Enter your name:";
    const lowBars = "___";
    const score = "Your score is: " + globals.score;
    
    const youDiedXpos = globals.canvas.width / 2 - youDied.length * 20 / 2;
    const nameXpos = globals.canvas.width / 2 - name.length * 8 / 2 - lowBars.length * 8 / 2;
    const lowBarsXpos = globals.canvas.width / 2 - lowBars.length * 8 / 2 + name.length * 8 / 2;
    const scoreXpos = globals.canvas.width / 2 - score.length * 12 / 2;

    globals.ctx.font = "20px emulogic";
    globals.ctx.fillStyle = "crimson";
    globals.ctx.fillText (youDied, youDiedXpos, 170);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText (name, nameXpos, 240);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "crimson";
    globals.ctx.fillText (lowBars, lowBarsXpos, 240);

    globals.ctx.font = "12px emulogic";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText (score, scoreXpos, 310);
    
    globals.ctx.font = "8px emulogic";

    if (globals.letterPos === 0){
        
        globals.ctx.fillStyle = "crimson";
    }

    else{

        globals.ctx.fillStyle = "white";
    }

    globals.ctx.fillText (globals.name[0], lowBarsXpos, 238);

    if (globals.letterPos === 1){
        
        globals.ctx.fillStyle = "crimson";
    }

    else{

        globals.ctx.fillStyle = "white";
    }
    
    globals.ctx.fillText (globals.name[1], lowBarsXpos + 8, 238);


    if (globals.letterPos === 2){
    
        globals.ctx.fillStyle = "crimson";
    }

    else{

        globals.ctx.fillStyle = "white";
    }

    globals.ctx.fillText (globals.name[2], lowBarsXpos + 8 * 2, 238);
}

function renderLoadindBar(){

    const width = 40;

    const barWidth = globals.assetsToLoad.length * width;
    const barHeight = 8;
    
    const barBorderWidth = globals.assetsToLoad.length * width + 2;
    const barBorderHeiht = 10;

    let barXpos = globals.canvas.width / 2 - barWidth / 2;
    let barBorderXpos = globals.canvas.width / 2 - barBorderWidth / 2;
    let barLoadedXpos = globals.canvas.width / 2 - barWidth / 2;

    const loading = "LOADING";
    const space = "PRESS SPACE TO CONTINUE";

    const loadingXpos = globals.canvas.width / 2 - loading.length * 6 / 2;
    const spaceXpos = globals.canvas.width / 2 - space.length * 6 / 2;

    globals.ctx.fillStyle = "white";
    
    globals.ctx.fillText (loading, loadingXpos, 300);
    globals.ctx.fillText (space, spaceXpos, 380);

    globals.ctx.fillStyle = "white";
    globals.ctx.fillRect (barBorderXpos, 320, barBorderWidth, barBorderHeiht);

    globals.ctx.fillStyle = "black";
    globals.ctx.fillRect (barXpos, 321, barWidth, barHeight);
    
    for(let i = 0; i < globals.assetsLoaded; i++){

        globals.ctx.fillStyle = "rgb(114, 47, 47)";
        globals.ctx.fillRect (barLoadedXpos, 321, width, barHeight);

        barLoadedXpos += width;
    }
}