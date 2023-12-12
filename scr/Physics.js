export default class Physics{

    constructor (vLimit, aLimit, friction, jumpForce, omega, angle, xRotCenter, yRotCenter){

        this.vx         = 0;            //Velocidad X(Pixels/Second)
        this.vy         = 0;            //Velocidad Y(Pixels/Second)
        this.vLimit     = vLimit;       //Valocidad maxima del sprite
        this.ax         = 0;            //Aceleracion X
        this.ay         = 0;            //Aceleracion Y
        this.aLimit     = aLimit;       //Aceleracion limite
        this.friction   = friction;     //Fuerza de friccion (Valor entre 0 y 1. Default 1)
        this.jumpForce  = jumpForce;    //Fuerza de salto (debe ser negativa. Default -0)
        this.isOnGround = false;        //Variable que se pone a true si estamos en el suelo
        this.omega      = omega;        //Velocidad angular rad/s
        this.angle      = angle;        //Angulo actual (rad)
        this.xRotCenter = xRotCenter;   //Centro de rotacion X
        this.yRotCenter = yRotCenter;   //Centro de ratacion Y
    }
}