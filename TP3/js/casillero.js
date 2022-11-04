class Casillero{
    constructor(ctx,x,y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.drawCasillero();
    }

    drawCasillero(){
        ctx.beginPath();
        ctx.rect(this.x,this.y,35,35);
        ctx.stroke();
    }

    setFicha(Ficha){
        this.ficha = Ficha;
    }
}