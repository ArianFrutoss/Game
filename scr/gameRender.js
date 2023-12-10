import globals from "./globals.js";
import {Game, Tile, GameStatesLenght} from "./constans.js";

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

            renderControlsSprites();
            renderControlsText();
            break;

        case Game.SCORES:

            renderScoresSprites();
            renderScoresText();
            break;

        case Game.HISTORY:

            renderHistorySprites();
            renderHistoryText();
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

    for (let i = 0; i < GameStatesLenght; ++i){

        for (let j = 0; j < globals.sprites.length; ++j){

            if (globals.sprites[j].gameState[i] === Game.NEW_GAME){

                const sprite = globals.sprites[j];
                renderSprite(sprite);
            }
        }
    }
}

function renderHistoryText(){

    //Dibujar Titulo
    globals.ctx.font = "7px emulogic";
    globals.ctx.fillStyle = "black";

    globals.ctx.fillText ("The defense of the throne", 205, 68);

    //Dibujar Historia
    globals.ctx.font = "7px emulogic";

    globals.ctx.fillText ("The news of Joseph's strange chair spread rapidly throughout the Lowlands. The villagers, intrigued and superstitious, began to fear the mysterious connection between Joseph and the colossal chair. Rumors of goblins and dark magic spread like wildfire in a dry forest. One day, the villagers, fearing the chair and convinced that it brought misfortune, organized to destroy it. Joseph, in his madness, believed the chair possessed a magical power that must be protected at all costs. With the help of children he had manipulated with illusory promises of greatness, he set out to defend his decaying throne. The villagers, driven by fear and superstition, advanced toward Joseph's abode with torches and improvised tools. The air was charged with tension as Joseph, in his delirium, clung to the chair with desperate ferocity. The children, still under the spell of the chair's magic, threw themselves against the villagers with blind loyalty. Their eyes gleamed with a supernatural glow as they defended the colossal chair from any perceived threat. Joseph, staring at his attackers, cast erratic spells in a desperate attempt to keep the villagers at bay. As the struggle intensified, some villagers managed to break the spell controlling the children. The truth became evident to the young ones, who, horrified by their own actions, joined the villagers in their fight against Joseph and the cursed chair. Eventually, the villagers prevailed, defeating Joseph and dangerously approaching the chair. The villagers destroyed the chair, which according to their beliefs, was the source of their woes. Despite their attempts to burn the pieces, the chair, thanks to its power, avoided the flames and could not be burned, so they took the fragments, scattered them, and hid them in different places.", 80, 200);
}

function renderHistorySprites(){

    for (let i = 0; i < GameStatesLenght; ++i){

        for (let j = 0; j < globals.sprites.length; ++j){

            if (globals.sprites[j].gameState[i] === Game.HISTORY){

                const sprite = globals.sprites[j];
                renderSprite(sprite);
            }
        }
    }
}

function renderControlsText(){

    //Dibujar Controles
    globals.ctx.font = "7px emulogic";
    
    globals.ctx.fillText ("W", 210, 120);
    globals.ctx.fillText ("-------------", 225, 120);
    globals.ctx.fillText ("move up", 325, 120);

    globals.ctx.fillText ("S", 210, 150);
    globals.ctx.fillText ("-----------", 225, 150);
    globals.ctx.fillText ("move Down", 312, 150);

    globals.ctx.fillText ("D", 210, 180);
    globals.ctx.fillText ("----------", 225, 180);
    globals.ctx.fillText ("move Right", 305, 180);

    globals.ctx.fillText ("A", 210, 210);
    globals.ctx.fillText ("-----------", 225, 210);
    globals.ctx.fillText ("move Left", 312, 210);

    globals.ctx.fillText ("SPACE", 210, 240);
    globals.ctx.fillText ("----------", 253, 240);
    globals.ctx.fillText ("Attack", 332, 240);

    globals.ctx.fillText ("1", 210, 270);
    globals.ctx.fillText ("-------", 225, 270);
    globals.ctx.fillText ("Put up a wall", 283, 270);

    globals.ctx.fillText ("2", 210, 300);
    globals.ctx.fillText ("---------", 225, 300);
    globals.ctx.fillText ("Attack with", 297, 300);
    globals.ctx.fillText ("the child", 311, 310);

    globals.ctx.fillText ("Q", 210, 330);
    globals.ctx.fillText ("------", 225, 330);
    globals.ctx.fillText ("Create a first", 277, 330);
    globals.ctx.fillText ("child", 340, 340);

    globals.ctx.fillText ("E", 210, 360);
    globals.ctx.fillText ("-----", 225, 360);
    globals.ctx.fillText ("Create a second", 270, 360);
    globals.ctx.fillText ("child", 340, 370);
}

function renderControlsSprites(){

    for (let i = 0; i < GameStatesLenght; ++i){

        for (let j = 0; j < globals.sprites.length; ++j){

            if (globals.sprites[j].gameState[i] === Game.CONTROLS){

                const sprite = globals.sprites[j];
                renderSprite(sprite);
            }
        }
    }
}

function renderScoresSprites(){

    for (let i = 0; i < GameStatesLenght; ++i){

        for (let j = 0; j < globals.sprites.length; ++j){

            if (globals.sprites[j].gameState[i] === Game.SCORES){

                const sprite = globals.sprites[j];
                renderSprite(sprite);
            }
        }
    }
}