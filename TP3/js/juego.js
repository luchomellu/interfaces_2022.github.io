let canvas = document.querySelector('#juego');
let ctx = canvas.getContext('2d');
let canvasW = canvas.width;
let canvasH = canvas.height;
let dibujar = false;

ctx.beginPath();
ctx.rect(0,0,canvas.width,canvas.height);
ctx.fillStyle = "#FFFFFF";
ctx.fill();
ctx.stroke();

class Juego{
    fichas = [];
    constructor(columnas,filas){
        //let tablero = new Tablero(columnas,filas);
        let jugador1 = new Jugador("Jugador 1");
        for (let index = 0; index < 21; index++) {
            this.fichas.push(new Ficha(ctx,jugador1,Math.random() * ((100-50) + 50),Math.random() * ((400-50) + 50)));
            console.log(this.fichas);
        }
    }

    isClicked(x,y){
        for (let index = 0; index < this.fichas.length; index++) {
            const element = this.fichas[index];
            if(element.isClicked(x,y)){
                element.setClicked(true);
                return true;
            };
        }
    }

    unsetClicked(){
        for (let index = 0; index < this.fichas.length; index++) {
            const element = this.fichas[index];
            if(element.clicked){
                element.setClicked(false);
            };
        }
    }

    moveClicked(x,y){
        for (let index = 0; index < this.fichas.length; index++) {
            const element = this.fichas[index];
            if(element.clicked){
                element.mover(x,y);
                return;
            };
        }
    }

    limpiar(){
        ctx.rect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        console.log("hola");
        for (let index = 0; index < this.fichas.length; index++) {
            this.fichas[index].drawFicha();
        }
    }

}

const juego = new Juego();

canvas.addEventListener('mousedown', function check(e){
    let x = Math.round(e.layerX - canvas.offsetLeft);
    let y = Math.round(e.layerY - canvas.offsetTop);
    console.log(juego);
    if(juego.isClicked(x,y)){
        dibujar = true;
    };
});

canvas.addEventListener('mousemove', function mover(e){
    if(!dibujar) return;
    let x = Math.round(e.layerX - canvas.offsetLeft);
    let y = Math.round(e.layerY - canvas.offsetTop);
    juego.moveClicked(x,y);
    juego.limpiar();
});

canvas.addEventListener('mouseup', function mover(e){
    dibujar = false;
    juego.unsetClicked();
});