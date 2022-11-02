class Ficha{
    constructor(element,jugador,x,y){
        this.ctx = element;
        this.jugador = jugador;
        this.x = x;
        this.y = y;
        this.drawFicha();
        console.log("hola")
    }

    drawFicha(){
        var gradient = ctx.createLinearGradient(0, 0, 170, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5" ,"blue");
        gradient.addColorStop("1.0", "red");
        this,ctx.beginPath();
        this.ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }

    isClicked(x,y){
        let a = this.x - x;
        let b = this.y - y;
        return Math.sqrt(a*a + b*b) <= 15;
    };

    mover(x,y){
        console.log("pene");
        this.x = x;
        this.y = y;
        this.drawFicha();
    }

}