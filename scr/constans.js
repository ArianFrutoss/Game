//Estados del juego
export const Game = {

    INVALID:   -1,
    LOADING:    0,
    NEW_GAME:   1,
    PLAYING:    2,
    CONTROLS:   3,
    SCORES:     4,
    HISTORY:    5,
    OVER:       6
}

//Codigos de teclas
export const Key = {

    UP:     38,
    DOWN:   40,
    RIGHT:  39,
    LEFT:   37
}

//Velocidad del juego
export const FPS = 30;

export const Tile = {

    MAP:     1,
    SPRITES: 0
}

//Id de bloque del mapa
export const Block = {

    EMPTY    :   0,
    BLOCK_1  :   1,
    BLOCK_2  :   2,
    BLOCK_3  :   3,
    BLOCK_4  :   4,
    BLOCK_5  :   5,
    BLOCK_6  :   6,
    BLOCK_7  :   7,
    BLOCK_8  :   8,
    BLOCK_9  :   9,
    BLOCK_10 :   10,
    BLOCK_11 :   11,
    BLOCK_12 :   12,
    BLOCK_13 :   13
}

//Identificador de tipo de Sprite (ID)
export const SpriteID = {

    
    CHAIR_INTERFACE:        0,
    CHILD_1_INTERFACE_1:    1,
    CHILD_2_INTERFACE_1:    2,
    STONE_INTERFACE_1:      3,
    WOOD_INTERFACE_1:       4,
    STONE_INTERFACE_2:      5,
    WOOD_INTERFACE_2:       6,
    STONE_INTERFACE_3:      7,
    WOOD_INTERFACE_3:       8,
    CHILD_1_INTERFACE_2:    9,
    CHILD_2_INTERFACE_2:    10,
    CHAIR:                  11,
    PLAYER:                 12,
    MAGIC:                  13,
    STONE:                  14,
    WOOD:                   15,
    CHILD_1:                16,
    CHILD_2:                17,
    ENEMY_1:                18,
    WALL:                   19,
    MOON:                   20,
    SUN:                    21,
    BACK_GROUND:            22,
    NIGHT_SKY:              23,
    DAY_SKY:                24,
    NIGHT_CLOUD:            25,
    DAY_CLOUD:              26,
    PAPER:                  27,
    BLACK:                  28,
    BLACK_BORDER:           29
}

//Identificador de estado de sprite (direccion)
export const State = {

    //Estados de la silla
    INTEGERITY:             0,

    //Estados del personaje
    IDLE:                   0,
    WALK:                   1,
    STUN:                   2,
    ATTACK:                 3,

    //Estados de la magia
    MAGIC:                  0,

    //Piedra
    STONE:                  0,

    //Madera
    WOOD:                   0,

    //Niño1 interfaz
    CHILD_1_INTERFACE:      0,

    //Niño2 interfaz
    CHILD_2_INTERFACE:      0,

    //Niño1
    CHILD_1_IDLE:           0,
    CHILD_1_WALK:           1,
    CHILD_1_RUN:            2,
    CHILD_1_ATTACK:         3,

    //Niño2
    CHILD_2_IDLE:           0,
    CHILD_2_WALK:           1,
    CHILD_2_RUN:            2,
    CHILD_2_BUILD:          3,

    //Enemy1
    ENEMY_1_WALK:           0,
    ENEMY_1_RUN:            1,
    ENEMY_1_ATTACK:         2,
    ENEMY_1_DEAD:           3,

    //Wall
    WALL:                   0,

    //Moon
    MOON:                   0,

    //Sun
    SUN:                    0,

    //Background
    BACK_GROUND:            0,

    //Night sky
    NIGHT_SKY:              0,

    //Day sky
    DAY_SKY:                0,

    //Night cloud
    NIGHT_CLOUD:            0,

    //Day cloud
    DAY_CLOUD:              0,

    //Paper
    PAPER:                  0,

    //Black
    BLACK:                  0,

    //Black border
    BLACK_BORDER:           0
}