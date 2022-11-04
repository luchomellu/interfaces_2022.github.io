class Ficha{
    constructor(element,jugador,x,y,imgSrc){
        this.ctx = element;
        this.jugador = jugador;
        this.x = x;
        this.y = y;
        //this.img = new Image();
        //this.img.src = imgSrc;
        this.img = imgSrc;
        this.clicked = false;
        this.drawFicha();
        console.log("hola")
    }

    drawFicha(){
        this.ctx.drawImage(this.img, this.x -15, this.y-15, 30, 30);
    }

    isClicked(x,y){
        let a = this.x - x;
        let b = this.y - y;
        return Math.sqrt(a*a + b*b) <= 15;
    };

    clicked() {
        this.clicked;
    }

    setClicked(clicked) {
        this.clicked = clicked;
    }

    mover(x,y){
        this.x = x;
        this.y = y;
    }

}