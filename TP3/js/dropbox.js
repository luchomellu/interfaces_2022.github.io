class DropBox{
    constructor(ctx,x,y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.drawDropBox();
    }

    drawDropBox(){
        var grd = ctx.createLinearGradient(0,this.y+15, 0,this.y-15);//gradiente
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "rgba(255, 255, 255, 0)");

        this.ctx.fillStyle = grd;
        this.ctx.beginPath();
        this.ctx.rect(this.x-15,this.y-15,35,35);
        this.ctx.strokeStyle = "rgba(66, 166, 214, 0.89)";
        this.ctx.stroke();
        this.ctx.fill();
    }

    checkPos(x,y){
        return (((x > this.x - 15) && (x < this.x + 15))&&((y > this.y - 15) && (y < this.y + 15)));//checkeo que las x e y que me mandan esten dentro de el dropbox
    }
}