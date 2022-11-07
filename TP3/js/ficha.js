class Ficha{
    constructor(element,jugador,x,y,imgSrc){
        this.ctx = element;
        this.jugador = jugador;
        this.xOrigen = x;
        this.yOrigen = y;
        this.x = x;
        this.y = y;
        this.img = imgSrc;
        this.clickeado = false;
        this.colocado = false;
        this.drawFicha();
    }

    setColocado(){
        this.colocado = true;
    }

    isColocado(){
        return this.colocado;
    }

    getJugador(){
        return this.jugador;
    }

    moverOrigen(){
        this.x = this.xOrigen;
        this.y = this.yOrigen;
    }

    drawFicha(){
        this.ctx.drawImage(this.img, this.x -15, this.y-15, 30, 30);
    }

    isClicked(x,y){
        let a = this.x - x;
        let b = this.y - y;
        return Math.sqrt(a*a + b*b) <= 15;
    }

    clicked() {
        return this.clickeado;
    }

    setClicked(boolean){
        this.clickeado = boolean;
    }

    mover(x,y){
        this.x = x;
        this.y = y;
    }

}