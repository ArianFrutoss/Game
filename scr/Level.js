export class Level{

    constructor(data, imageSet){

        this.data     = data;       //Array Bidimensional
        this.imageSet = imageSet;   //Datos de las imagenes del mapa
    }
}

//Datos del nivel 1
export const level1 = [

    [1,1,13,6,6,6,6,6,7,7,7,7,7,6,7,7],
    [1,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [1,4,2,2,2,2,2,2,2,2,2,2,3,2,2,2],
    [1,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [1,5,2,2,2,2,2,2,2,2,2,3,2,2,2,2],
    [1,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [1,1,11,9,9,9,9,8,8,8,8,8,8,9,9,9]
];

export const spriteLevel1 = [

    [1,1,13,6,6,6,6,6,7,7,7,7,7,6,7,7],
    [1,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [1,4,2,2,2,2,2,2,2,2,2,2,3,2,2,2],
    [1,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [1,5,2,2,2,2,2,2,2,2,2,3,2,2,2,2],
    [1,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [1,1,11,9,9,9,9,8,8,8,8,8,8,9,9,9]
];

levelPuddle(level1)

function levelPuddle(level){

    const num_fil = level.length;
    const num_col = level[0].length;
    const floor_options = [2, 2, 3, 2, 2];

    let contPuddleFloor = 0;

    for (let i = 0; i < num_fil; i++){
        
        contPuddleFloor = 0;

        for (let j = 0; j < num_col; j++){

            if (level[i][j] === 2){

                level[i][j] = floor_options[randomFloor(floor_options)];

                if (level[i][j] === 3 && level[i][j - 1] === 3 || level[i - 1][j] === 3){

                    level[i][j] = 2;
                }

                if (level[i][j] === 3){

                    contPuddleFloor++;
                }
            }

            if (contPuddleFloor >= 2){

                break;
            }
        }
    }
}

function randomFloor(floor_options){

    return Math.floor(Math.random() * floor_options.length);
}