//agarro canvas
let canvas = document.querySelector('#juego');
let ctx = canvas.getContext('2d');
let canvasW = canvas.width;
let canvasH = canvas.height;
let dibujar = false;

//declaro imagen de fondo para que cargue
var imagenBackground = new Image();
imagenBackground.onload = function(){return;};
imagenBackground.src = "./images/pokemon-4-fila.jpg";

//declaro imagen de casillero para que cargue
var imagenCasillero = new Image();
imagenCasillero.onload = function(){return};
imagenCasillero.src = "./images/casillero.jpg";

class Juego{
    fichas = [];
    intervalId = null;
    constructor(tamanio,fichaJugador1,fichaJugador2,imagenCasillero){
        this.tiempo = 300; //tiempo limite del juego
        this.jugador1 = new Jugador("Jugador 1");
        this.jugador2= new Jugador("Jugador 2");
        this.turno = this.jugador1; //declaro de quien es el primer turno
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
        /*
        Termino el juego y dependiendo de como termino muestro mensaje junto a el modal para volver a jugar
        */
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
        //dibujo cada segundo para que se muestre el timer correctamente
        this.dibujarInterfaz();
        this.tablero.drawTablero();
        for (let index = 0; index < this.fichas.length; index++) {
            this.fichas[index].drawFicha();
        }
    }

    dibujarInterfaz(){
        //dibujo toda la interfaz menos las fichas
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
        //creo las fichas dependiendo del tamanio del juego
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
            if(element.isClicked(x,y) && element.getJugador() == this.turno && element.isColocado() == false){ //pregunto a la ficha si esta siendo clikeada por la posicion del mouse, si corresponde al jugador de turno y si ya fue colocada en el tablero
                element.setClicked(true);//seteo que esta clickeada
                return true;
            };
        }
    }

    unsetClicked(x,y){
        for (let index = 0; index < this.fichas.length; index++) {
            let element = this.fichas[index];
            if(element.clicked()){//pregunto si esta clickeada
                if(this.tablero.checkPosValida(x,y)){//pregunto si donde quiero soltar la ficha es un lugar valido 
                    let col = this.tablero.getCol(x,y)
                    if(this.tablero.colocarFicha(col,element)){//si la ficha se coloco correctamente
                        element.setColocado();//seteo que ya fue colocada y ya no se puede mover
                        if(this.tablero.isAllFull()){//pregunto si despues de colocar la ficha el tablero esta lleno
                            this.endGame();
                        }
                        this.limpiar();//dibujo todo
                        if(this.tablero.checkWin(this.turno.getNombre()) == true){//checkeo si el jugador ha ganado
                            this.endGame();
                        }else{
                            this.cambiarTurno();//cambio de turno
                        }
                    }
                    else{
                        element.moverOrigen();//muevo la ficha a su lugar de origen
                        this.limpiar();//dibujo todo
                    }
                }else{
                    element.moverOrigen();//muevo la ficha a su lugar de origen
                    this.limpiar();//dibujo todo
                }
                element.setClicked(false);//seteo que se dejo de clickear
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
        this.dibujarInterfaz();//primero dibujo la interfaz
        this.tablero.drawTablero();//despues el tablero
        for (let index = 0; index < this.fichas.length; index++) {//despues todas las fichas
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

// agarro modal y mensajes
let modal = document.getElementById("myModal");
let msgTiempo = document.getElementById("tiempo");
let msgEmpate = document.getElementById("empate");
let msgGano1 = document.getElementById("gano1");
let msgGano2 = document.getElementById("gano2");

// Mostrar modal para configurar juego
window.onload = function() {
  modal.style.display = "flex";
}

//agarro boton para crear juego
let btn = document.querySelector("#iniciar");
btn.addEventListener("click", crearjuego);

var juego;

function crearjuego(){
    //prevengo que se actualice la pagina
    event.preventDefault();
    //dejo de mostrar el modal
    modal.style.display = "none";
    msgTiempo.style.display = "none";
    msgEmpate.style.display = "none";
    msgGano1.style.display = "none";
    msgGano2.style.display = "none";

    //agarro valor para calcular el tamanio
    let tamanio = document.querySelector("#tamanio").value;
    console.log(tamanio);
    
    //agarro la imagen de la ficha del jugador 2
    let radiosJugador2 = document.getElementsByName('fichaJugador2');
    for (let i = 0, length = radiosJugador2.length; i < length; i++) {
        if (radiosJugador2[i].checked) {
            var fichaJugador2 = radiosJugador2[i].value;
        break;
        }
    }
    
    //declaro imagen de la ficha del jugador 2
    let imgJugador2 = new Image();
    imgJugador2.onload = function() {return};
    imgJugador2.src = fichaJugador2;
    
    //agarro la imagen de la ficha del jugador 1
    let radiosJugador1 = document.getElementsByName('fichaJugador1');
    for (let i = 0, length = radiosJugador1.length; i < length; i++) {
        if (radiosJugador1[i].checked) {
            var fichaJugador1 = radiosJugador1[i].value;
        break;
        }
    }
    let imgJugador1 = new Image();
    imgJugador1.onload = function() {
        //creo juego
        juego = new Juego(tamanio,imgJugador1,imgJugador2,imagenCasillero);
    }
    imgJugador1.src = fichaJugador1;

}

canvas.addEventListener('mousedown', function check(e){
    let x = Math.round(e.layerX - canvas.offsetLeft);
    let y = Math.round(e.layerY - canvas.offsetTop);
    if(juego.isClicked(x,y)){
        dibujar = true;//si clickeo una ficha empiezo a dibujar
    };
});

canvas.addEventListener('mousemove', function mover(e){
    if(!dibujar) return;
    let x = Math.round(e.layerX - canvas.offsetLeft);
    let y = Math.round(e.layerY - canvas.offsetTop);
    juego.moveClicked(x,y); //muevo la ficha de lugar
    juego.limpiar(); //dibujo todo
});

canvas.addEventListener('mouseup', function levantar(e){
    let x = Math.round(e.layerX - canvas.offsetLeft);
    let y = Math.round(e.layerY - canvas.offsetTop);
    dibujar = false;//dejo de dibujar
    juego.unsetClicked(x,y);//suelto la ficha

});