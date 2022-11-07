class Casillero{
    constructor(ctx,x,y,imagen){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.img = imagen;
        this.ficha = null;
        this.drawCasillero();
    }

    drawCasillero(){
        this.ctx.drawImage(this.img, this.x -15, this.y-15, 35, 35);//dibujo la ficha corrido 15 px para los dos lados, asi queda centrado
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setFicha(Ficha){
        this.ficha = Ficha;
        this.ficha.mover(this.x+3,this.y+3);//cuando coloco la ficha la muevo para el casillero (los +3 es para que quede centrado)
    }

    getFicha(){
        return this.ficha;
    }

    tieneFicha(){
        return this.ficha != null;//checkeo que el casillero tenga una ficha
    }
}