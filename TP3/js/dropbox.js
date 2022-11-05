class DropBox{
    constructor(ctx,x,y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.drawDropBox();
    }

    drawDropBox(){
        this.ctx.beginPath();
        this.ctx.rect(this.x-15,this.y-15,35,35);
        this.ctx.stroke();
    }

    checkPos(x,y){
        return (((x > this.x - 15) && (x < this.x + 15))&&((y > this.y - 15) && (y < this.y + 15)))
    }
}