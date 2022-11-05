class Casillero{
    constructor(ctx,x,y,imagen){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.img = imagen;
        this.drawCasillero();
    }

    drawCasillero(){
        //ctx.beginPath();
        //ctx.rect(this.x,this.y,35,35);
        //ctx.stroke();
        //console.log(this.img);
        this.ctx.drawImage(this.img, this.x -15, this.y-15, 35, 35);
    }

    setFicha(Ficha){
        this.ficha = Ficha;
    }
}