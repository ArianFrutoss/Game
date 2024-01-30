//Estados del juego
export const Game = {

    INVALID:           -1,
    LOADING:            0,
    NEW_GAME_LOAD:      1,
    PLAYING_LOAD:       2,
    HISTORY_LOAD:       3,
    CONTROLS_LOAD:      4,
    SCORES_LOAD:        5,
    OVER_LOAD:          6,
    NEW_GAME:           7,
    PLAYING:            8,
    CONTROLS:           9,
    SCORES:            10,
    HISTORY:           11,
    OVER:              12
}

//Codigos de teclas
export const Key = {

    UP:             87,
    DOWN:           83,
    RIGHT:          68,
    LEFT:           65,
    BUILD:          69,
    ATTACK_CHILD:   81,
    ATTACK:         32,
}

export const PlayerPosition = {

    POSITION_X: 0,
    POSITION_Y: 0
}

export const Child2Position = {

    POSITION_X: 0,
    POSITION_Y: 0
}

export const Enemy1Position = {

    POSITION_X: 0,
    POSITION_Y: 0
}

export const ParticleID = {

    WATER:      0,
    MAGIC:      1,
    OBJECT:     2,
    WALL:       3,
    RAIN:        4
}

export const ParticleState = {

    ON:     0,
    FADE:   1,
    OFF:    -1
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
    
    CHAIR:                   0,
    PLAYER:                  1,
    MAGIC:                   2,
    STONE:                   3,
    WOOD:                    4,
    CHILD_1:                 5,
    CHILD_2:                 6,
    ENEMY_1:                 7,
    WALL:                    8,
    MOON:                    9,
    SUN:                    10,
    BACK_GROUND:            11,
    NIGHT_SKY:              12,
    DAY_SKY:                13,
    NIGHT_CLOUD:            14,
    DAY_CLOUD:              15,
    PAPER:                  16,
    BLACK:                  17,
    BLACK_BORDER:           18,
    CHAIR_MENU:             19,
    CHAIR_INTERFACE:        20,
    CHILD_1_INTERFACE_1:    21,
    CHILD_2_INTERFACE_1:    22,
    STONE_INTERFACE_1:      23,
    WOOD_INTERFACE_1:       24,
    STONE_INTERFACE_2:      25,
    WOOD_INTERFACE_2:       26,
    STONE_INTERFACE_3:      27,
    WOOD_INTERFACE_3:       28,
    CHILD_1_INTERFACE_2:    29,
    CHILD_2_INTERFACE_2:    30
}

//Identificador de estado de sprite (direccion)
export const State = {

    //Estados de la silla
    INTEGRITY:              0,

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

export const Sounds = {

    NO_SOUND:              -1,
    GAME_MUSIC:             0,
    GAME_MENU_MUSIC:        1,
    GAME_OVER_MUSIC:        2,
    EXPLOSION:              3,
    SELECT:                 4,
    OBJECT:                 5,
    WALK_PLAYER_AND_CHILDS: 6,
    WALK_ENEMY:             7,
    HITS:                   8,
    WATER:                  9
}