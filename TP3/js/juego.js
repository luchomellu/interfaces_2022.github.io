
let canvas = document.querySelector('#juego');
let ctx = canvas.getContext('2d');
let canvasW = canvas.width;
let canvasH = canvas.height;
let dibujar = false;

var imagenBackground = new Image();
imagenBackground.onload = function(){return;};
imagenBackground.src = "./images/pokemon-4-fila.jpg";


var imagenCasillero = new Image();
imagenCasillero.onload = function(){return};
imagenCasillero.src = "./images/casillero.jpg";

ctx.drawImage(imagenBackground, 0, 0, canvasW, canvasH);

class Juego{
    fichas = [];
    intervalId = null;
    constructor(tamanio,fichaJugador1,fichaJugador2,imagenCasillero){
        this.tiempo = 300;
        this.jugador1 = new Jugador("Jugador 1");
        this.jugador2= new Jugador("Jugador 2");
        this.turno = this.jugador1;
        this.intervalId = setInterval(() => {
            this.tiempo--;
            this.dibujarTimer();
            if(this.tiempo == 0){
                this.endGame();
            }
        }, 1000);
        this.dibujarInterfaz();
        this.tamanio = tamanio;
        this.tablero = new Tablero(ctx,tamanio,imagenCasillero);
        this.fichaJugador1 = fichaJugador1;
        this.fichaJugador2 = fichaJugador2;
        this.crearFichas();
    }

    endGame(){
        clearInterval(this.intervalId);
        modal.style.display = "flex";
        if(this.tiempo <= 0){
            msgTiempo.style.display = "block";
        }
        else if(this.tablero.isAllFull()){
            msgEmpate.style.display = "block";
        }
        else{
            if(this.turno.getNombre() == "Jugador 1"){
                msgGano1.style.display = "block";
            }
            else{
                msgGano2.style.display = "block";
            }
        }
        
    }

    dibujarTimer(){
        this.dibujarInterfaz();
        this.tablero.drawTablero();
        for (let index = 0; index < this.fichas.length; index++) {
            this.fichas[index].drawFicha();
        }
    }

    dibujarInterfaz(){
        ctx.drawImage(imagenBackground, 0, 0, canvasW, canvasH);
        
        ctx.beginPath();
        ctx.rect(20,30,120,410);
        ctx.rect(780,30,120,410);
        ctx.fillStyle = "rgba(0, 0, 0, 0.64)";
        ctx.fill();

        ctx.font = "22px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Jugador 1", 80, 25);
        ctx.fillText("Jugador 2", 840, 25);
        ctx.fillText("Tiempo Restante: " + this.tiempo, 460, 25);
        ctx.fillText("Turno de: " + this.turno.getNombre(), 460, 50);
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
            if(element.isClicked(x,y) && element.getJugador() == this.turno && element.isColocado() == false){
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
                    if(this.tablero.colocarFicha(col,element)){
                        element.setColocado();
                        if(this.tablero.isAllFull()){
                            this.endGame();
                        }
                        this.limpiar();
                        if(this.tablero.checkWin(this.turno.getNombre()) == true){
                            this.endGame();
                        }else{
                            this.cambiarTurno();
                        }
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
        this.dibujarInterfaz();
        this.tablero.drawTablero();
        for (let index = 0; index < this.fichas.length; index++) {
            this.fichas[index].drawFicha();
        }
    }

    cambiarTurno(){
        if(this.turno == this.jugador1){
            this.turno = this.jugador2
            this.limpiar();
        }
        else{
            this.turno = this.jugador1
            this.limpiar();
        }
    }

}

// Get modal
let modal = document.getElementById("myModal");
let msgTiempo = document.getElementById("tiempo");
let msgEmpate = document.getElementById("empate");
let msgGano1 = document.getElementById("gano1");
let msgGano2 = document.getElementById("gano2");

// Mostrar modal
window.onload = function() {
  modal.style.display = "flex";
}

let btn = document.querySelector("#iniciar");
btn.addEventListener("click", crearjuego);

var juego;

function crearjuego(){
    event.preventDefault();
    modal.style.display = "none";
    msgTiempo.style.display = "none";
    msgEmpate.style.display = "none";
    msgGano1.style.display = "none";
    msgGano2.style.display = "none";
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