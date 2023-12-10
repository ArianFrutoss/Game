import globals from "./globals.js";
import {Game, Tile} from "./constans.js";

export default function render(){
    
    //Cambia lo que el juego esta dibujando dependiendo de la etapa del juego
    switch (globals.gameState){

        case Game.LOADING:

            break;

        case Game.NEW_GAME:

            renderNewGameSprites();
            renderNewGameText();
            break;

        case Game.PLAYING:

            drawGame();
            break;

        case Game.CONTROLS:

            drawGame();
            break;

        case Game.SCORES:

            drawGame();
            break;

        case Game.HISTORY:

            drawGame();
            break;

        case Game.OVER:

            drawGame();
            break;

        default:

            console.error("Error: Game State Invalid");
    }
}

function drawGame(){
    
    //Borrar la pantalla
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);

    //Dibujamos el nivel
    renderMap();
    
    //Dibujamos la interfaz
    renderHUD();

    //Pintar los sprites
    drawSprites();
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
    globals.ctx.drawImage(

        globals.tileSets[Tile.SPRITES],                             
        xTile, yTile,                                   
        sprite.imageSet.xSize, sprite.imageSet.ySize,   
        xPos, yPos,                                     
        sprite.imageSet.xSize, sprite.imageSet.ySize    
    )
}

function drawSprites(){

    for (let i = 0; i < globals.sprites.length; ++i){

        if (globals.sprites[i].gameState === Game.PLAYING){

            const sprite = globals.sprites[i];

            //drawSpriteRectangle(sprite);

            renderSprite(sprite);
        }
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
    const score = 100000;
    const highScore = 640200;

    globals.ctx.font = "12px emulogic";

    //Pintar los FPS
    globals.ctx.fillText("FPS: " + 1 / globals.deltaTime, 5,20);

    //Dibujar High Score
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("HIGH SCORE", 1040, 30);
    globals.ctx.fillStyle = "crimson";
    globals.ctx.fillText (" " + highScore, 1195, 30);

    //Dibujar Score
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("SCORE", 1040, 60);
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText (" " + score, 1195, 60);

    //Dibujar materiales
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("MATERIALS", 1110, 250);

    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("x 1", 1200, 300);
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("x 5", 1200, 350);

    //Dibujar Requisitos
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("REQUERIMENTS", 1090, 415);

    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("x 1", 1080, 480);
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("x 3", 1080, 550);

    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("x 2", 1170, 480);
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("x 2", 1170, 550);

    //Niños obtenidos
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("x 2", 1110, 620);
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText ("x 0", 1240, 620);
}

function renderNewGameText(){

    //Dibujar Titulo
    globals.ctx.font = "9px emulogic";
    globals.ctx.fillStyle = "white";

    globals.ctx.fillText ("The Decrepit Throne: The defense of the throne", 50, 140);

    //Dibujar Opciones
    globals.ctx.font = "7px emulogic";

    globals.ctx.fillText ("New Game", 80, 200);
    globals.ctx.fillText ("History", 80, 230);
    globals.ctx.fillText ("Controls", 80, 260);
    globals.ctx.fillText ("High Scores", 80, 290);
    globals.ctx.fillText ("Exit", 80, 320);
}

function renderNewGameSprites(){

    for (let i = 0; i < globals.sprites.length; ++i){

        if (globals.sprites[i].gameState === Game.NEW_GAME){

            const sprite = globals.sprites[i];

            renderSprite(sprite);
        }
    }
}