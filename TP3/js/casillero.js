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
        //ctx.beginPath();
        //ctx.rect(this.x,this.y,35,35);
        //ctx.stroke();
        //console.log(this.img);
        this.ctx.drawImage(this.img, this.x -15, this.y-15, 35, 35);
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setFicha(Ficha){
        this.ficha = Ficha;
        this.ficha.mover(this.x+3,this.y+3);
    }

    tieneFicha(){
        return this.ficha != null;
    }
}