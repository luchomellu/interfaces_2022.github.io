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
        this.colocado = true;//seteo que la ficha fue colocada
    }

    isColocado(){
        return this.colocado;//devuelvo si esta colocada
    }

    getJugador(){
        return this.jugador;//devuelvo jugador de la ficha
    }

    moverOrigen(){
        this.x = this.xOrigen;
        this.y = this.yOrigen;
    }

    drawFicha(){
        this.ctx.drawImage(this.img, this.x -15, this.y-15, 30, 30);//dibujo la ficha(-15 px para que este centrado)
    }

    isClicked(x,y){
        let a = this.x - x;
        let b = this.y - y;
        return Math.sqrt(a*a + b*b) <= 15;//devuelvo si el click fue dentro de la ficha
    }

    clicked() {
        return this.clickeado;//devuelvo si esta clickeada
    }

    setClicked(boolean){
        this.clickeado = boolean;//seteo si esta clickeado o no
    }

    mover(x,y){
        this.x = x;
        this.y = y;
    }

}