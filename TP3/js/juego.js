
let canvas = document.querySelector('#juego');
let ctx = canvas.getContext('2d');
let canvasW = canvas.width;
let canvasH = canvas.height;
let dibujar = false;

var imagenCasillero = new Image();
imagenCasillero.onload = function(){return};
imagenCasillero.src = "./images/casillero.jpg";

ctx.beginPath();
ctx.rect(0,0,canvas.width,canvas.height);
ctx.fillStyle = "#FFFFFF";
ctx.fill();
ctx.stroke();

class Juego{
    fichas = [];
    constructor(tamanio,fichaJugador1,fichaJugador2,imagenCasillero){
        this.tamanio = tamanio;
        this.tablero = new Tablero(ctx,tamanio,imagenCasillero);
        this.jugador1 = new Jugador("Jugador 1");
        this.jugador2= new Jugador("Jugador 2");
        this.fichaJugador1 = fichaJugador1;
        this.fichaJugador2 = fichaJugador2;
        this.crearFichas();
    }

    crearFichas(){
        switch (this.tamanio != null) {
            case (this.tamanio == 4):
                for (let index = 0; index < 21; index++) {
                    this.fichas.push(new Ficha(ctx,this.jugador1,Math.random() * (100-50) + 50,Math.random() * (400-50) + 50,this.fichaJugador1));
                    this.fichas.push(new Ficha(ctx,this.jugador2,Math.random() * (870-820) + 820,Math.random() * (400-50) + 50,this.fichaJugador2));
                }
                break;
            case (this.tamanio == 5):
                for (let index = 0; index < 28; index++) {
                    this.fichas.push(new Ficha(ctx,this.jugador1,Math.random() * (100-50) + 50,Math.random() * (400-50) + 50,this.fichaJugador1));
                    this.fichas.push(new Ficha(ctx,this.jugador2,Math.random() * (870-820) + 820,Math.random() * (400-50) + 50,this.fichaJugador2));
                }
                break;
            case (this.tamanio == 6):
                for (let index = 0; index < 36; index++) {
                    this.fichas.push(new Ficha(ctx,this.jugador1,Math.random() * (100-50) + 50,Math.random() * (400-50) + 50,this.fichaJugador1));
                    this.fichas.push(new Ficha(ctx,this.jugador2,Math.random() * (870-820) + 820,Math.random() * (400-50) + 50,this.fichaJugador2));
                }
                break;
            case (this.tamanio == 7):
                for (let index = 0; index < 45; index++) {
                    this.fichas.push(new Ficha(ctx,this.jugador1,Math.random() * (100-50) + 50,Math.random() * (400-50) + 50,this.fichaJugador1));
                    this.fichas.push(new Ficha(ctx,this.jugador2,Math.random() * (870-820) + 820,Math.random() * (400-50) + 50,this.fichaJugador2));
                }
                break;
            default:
                break;
        }
        
    }

    isClicked(x,y){
        for (let index = 0; index < this.fichas.length; index++) {
            let element = this.fichas[index];
            if(element.isClicked(x,y)){
                element.setClicked(true);
                return true;
            };
        }
    }

    unsetClicked(x,y){
        for (let index = 0; index < this.fichas.length; index++) {
            let element = this.fichas[index];
            if(element.clicked()){
                if(this.tablero.checkPosValida(x,y)){
                    let col = this.tablero.getCol(x,y)
                    if(!this.tablero.isFull(col)){
                        alert("colocao");
                    }
                    else{
                        element.moverOrigen();
                        this.limpiar();
                    }
                }else{
                    element.moverOrigen();
                    this.limpiar();
                }
                element.setClicked(false);
            };
        }
    }

    moveClicked(x,y){
        for (let index = 0; index < this.fichas.length; index++) {
            let element = this.fichas[index];
            if(element.clicked()){
                element.mover(x,y);
                return;
            };
        }
    }

    limpiar(){
        ctx.rect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        this.tablero.drawTablero();
        for (let index = 0; index < this.fichas.length; index++) {
            this.fichas[index].drawFicha();
        }
    }

}

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
window.onload = function() {
  modal.style.display = "block";
}

let btn = document.querySelector("#iniciar");
btn.addEventListener("click", crearjuego);

var juego;

function crearjuego(){
    event.preventDefault();
    modal.style.display = "none";
    let tamanio = document.querySelector("#tamanio").value;
    console.log(tamanio);
    
    let radiosJugador2 = document.getElementsByName('fichaJugador2');
    for (let i = 0, length = radiosJugador2.length; i < length; i++) {
        if (radiosJugador2[i].checked) {
            var fichaJugador2 = radiosJugador2[i].value;
        break;
        }
    }
    
    let imgJugador2 = new Image();
    imgJugador2.onload = function() {return};
    imgJugador2.src = fichaJugador2;
    
    let radiosJugador1 = document.getElementsByName('fichaJugador1');
    for (let i = 0, length = radiosJugador1.length; i < length; i++) {
        if (radiosJugador1[i].checked) {
            var fichaJugador1 = radiosJugador1[i].value;
        break;
        }
    }
    let imgJugador1 = new Image();
    imgJugador1.onload = function() {
        juego = new Juego(tamanio,imgJugador1,imgJugador2,imagenCasillero);
    }
    imgJugador1.src = fichaJugador1;

}

canvas.addEventListener('mousedown', function check(e){
    let x = Math.round(e.layerX - canvas.offsetLeft);
    let y = Math.round(e.layerY - canvas.offsetTop);
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

canvas.addEventListener('mouseup', function levantar(e){
    let x = Math.round(e.layerX - canvas.offsetLeft);
    let y = Math.round(e.layerY - canvas.offsetTop);
    dibujar = false;
    juego.unsetClicked(x,y);

});